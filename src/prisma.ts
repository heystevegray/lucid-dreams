import csv from 'csv-parser'
import { createReadStream, promises as fs, unlinkSync, existsSync } from 'fs'
import { exec } from 'child_process'
import path from 'path'
import Lister from 'listr'

const SHAPE_LIBRARY = 'Shape Library'
const ENTITY_RELATIONSHIP = 'Entity Relationship'
const TABLE_NAME = 'Text Area 1'
const TEXT_AREA = 'Text Area'
const ID = 'id'
const outputFile = './schema.prisma'

export type LucidChart = {
    Id: number
    Name: string
    'Line Source': string
    'Line Destination'?: string
    'Shape Library'?: string
    'Source Arrow'?: string
    'Destination Arrow'?: string
    'Page ID': string
    'Contained By': string
    Group: string
    [TABLE_NAME]: string
}

type LucidChartCSVRow = {
    tableName: string
    relationShipType: string
    columns: Column[]
}

type Column = {
    name: string
    type: string
}

const convertLucidToPrisma = (lucidRow: LucidChartCSVRow): string => {
    const { tableName, columns } = lucidRow

    const fields = columns.map(({ name, type }) => {
        if (name === ID) {
            // Auto increment
            return `${name}\t${type}\t${`@id @default (autoincrement())`}\n`
        }
        return `${name}\t${type}\t\n`
    })

    const model = `model ${tableName} {\n\t${fields.join('\t')}}`
    return model
}

const generatePrismaSchema = async (schema: string): Promise<void> => {
    await fs.writeFile(outputFile, schema)
}

export const parseLucidChart = (results: LucidChart[]): string => {
    const schema = []
    for (let index = 0; index < results.length; index++) {
        const row = results[index] as LucidChart
        const {
            Id,
            Name,
            [SHAPE_LIBRARY]: relationShipType,
            [TABLE_NAME]: tableName,
            ...rest
        } = row
        const entries = Object.entries(rest)
        const columns: Column[] = []

        if (relationShipType === ENTITY_RELATIONSHIP) {
            const onlyColumns = entries.filter(([key]) =>
                key.includes(TEXT_AREA)
            )

            for (
                let columnIndex = 0;
                columnIndex < onlyColumns.length;
                columnIndex += 2
            ) {
                const nextIndex = columnIndex + 1
                if (columnIndex !== onlyColumns.length - 1) {
                    const [, columnName] = onlyColumns[columnIndex]
                    const [, dataType] = onlyColumns[nextIndex]
                    const name = columnName as string
                    const type = dataType as string
                    if (name && type) {
                        columns.push({ name, type })
                    }
                }
            }

            const lucidRow: LucidChartCSVRow = {
                tableName,
                columns,
                relationShipType,
            }
            const model = convertLucidToPrisma(lucidRow)
            schema.push(model)
        }
    }

    return schema.join('\n\n')
}

const format = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            exec('npm run prisma:format', (error, stdout, stderr) => {
                if (error) {
                    console.log(`${error.message}`)
                    reject(error.message)
                    return
                }
                if (stderr) {
                    console.log(' hi')

                    console.log(`${stderr}`)
                    reject(stderr)
                    return
                }
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}

const cleanup = async (inputFile: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            if (existsSync(inputFile)) {
                unlinkSync(inputFile)
                console.log(`Deleted ${inputFile}`)
            }

            if (existsSync(outputFile)) {
                unlinkSync(outputFile)
                console.log(`Deleted ${outputFile}`)
            }
            resolve()
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const lucidToPrisma = async (inputFile: string): Promise<void> => {
    const results: LucidChart[] = []
    const absolutePath = path.resolve(outputFile)

    const tasks = new Lister([
        {
            title: `Parsing ${inputFile}`,
            task: async (ctx): Promise<void> => {
                return new Promise((resolve, reject) => {
                    createReadStream(`${inputFile}`)
                        .pipe(csv())
                        .on('data', (data) => {
                            const isERD = Object.values(data).includes(
                                ENTITY_RELATIONSHIP
                            )
                            if (isERD) {
                                results.push(data)
                            }
                        })
                        .on('error', (error) => reject(error))
                        .on(
                            'end',
                            async (): Promise<void> => {
                                if (results.length === 0) {
                                    return reject(
                                        new Error(
                                            'Boo. The provided file is not formatted correctly. Are you sure this is a Lucidchart CSV file of an Entity Relationship Diagram? 🤔'
                                        )
                                    )
                                } else {
                                    ctx.results = results
                                    return resolve()
                                }
                            }
                        )
                })
            },
        },
        {
            title: `Generating ${absolutePath}`,
            task: async (ctx): Promise<void> => {
                const schema = parseLucidChart(ctx.results)
                await generatePrismaSchema(schema)
            },
        },
        {
            title: 'Running Prisma format 😎',
            task: async () => {
                await format()
            },
        },
    ])

    await tasks
        .run()
        .then(() => {
            console.log(`\n✅ Successfully created ${absolutePath}`)
        })
        .finally(() => [process.exit(1)])
}

export { lucidToPrisma }
