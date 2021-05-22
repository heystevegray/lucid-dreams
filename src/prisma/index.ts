import csv from 'csv-parser'
import { createReadStream, promises as fs, unlinkSync, existsSync } from 'fs'
import { exec } from 'child_process'
import path from 'path'
import Lister from 'listr'
import { prismaDatabaseTypes } from './constants'

const SHAPE_LIBRARY = 'Shape Library'
const ENTITY_RELATIONSHIP = 'Entity Relationship'
const TABLE_NAME = 'Text Area 1'
const TEXT_AREA = 'Text Area'

const outputFile = './schema.prisma'

const schemaHeaders = `datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

    generator client {
      provider = "prisma-client-js"
    }`

type LucidChart = {
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
    'Text Area 2': string
    'Text Area 3': string
    'Text Area 4': string
    'Text Area 5': string
    'Text Area 6': string
    'Text Area 7': string
    'Text Area 8': string
    'Text Area 9': string
    'Text Area 10': string
    'Text Area 11': string
    'Text Area 12': string
    'Text Area 13': string
    'Text Area 14': string
    'Text Area 15': string
    'Text Area 16': string
    'Text Area 17': string
    'Text Area 18': string
    'Text Area 19': string
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

const parseCharacterCount = (
    chars: string,
    subStringLength: number
): string => {
    return chars.replace('(', '').replace(')', '').substring(subStringLength)
}

const convertToPascalCase = (name: string): string => {
    return name.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase()
    })
}

const handleType = (fieldName: string, type: string): string => {
    const typeLowercase = type.toLowerCase()
    let resultType = typeLowercase
    const optionalCheck = /\?/
    const nullCheck = /\(null\)/i
    const isOptional = resultType.match(optionalCheck) || resultType.match(nullCheck)
    const optionalSuffix = isOptional ? '?' : ''
    const isDate = resultType.includes('datetime') || resultType.includes('time') || resultType.includes('date') || resultType.includes('timestamp')
    // String? or String
    const stringPrefix = `String${optionalSuffix}`

    // If the type contains '(null)'
    if (resultType.match(nullCheck)) {
        // Replace with ?
        resultType = resultType.replace(nullCheck, '?')
    }

    if (isOptional && !resultType.includes('int') && !isDate) {
        /*
        * Remove ? from 'varchar' and 'char' types
        * ? is added after String not @db.VarChar(50) 
        * Example: String? @db.VarChar(50)
        */
        resultType = resultType.replace(optionalCheck, '')
    }

    // Check for the Lucidchart field name of 'id'
    if (fieldName === 'id') {

        if (resultType === 'uuid' || resultType === 'id') {
            // Don't think this can have an "?" optional modifier
            return prismaDatabaseTypes.uuid
        }

        // Auto increment
        return prismaDatabaseTypes.intAutoIncrement
    }

    if (resultType.includes('varchar')) {
        const charLength = parseCharacterCount(resultType, 'varchar'.length)
        return `${stringPrefix} ${prismaDatabaseTypes.varchar}(${charLength})`
    }

    if (resultType.includes('char')) {
        const charLength = parseCharacterCount(resultType, 'char'.length)
        return `${stringPrefix} ${prismaDatabaseTypes.char}(${charLength})`
    }

    if (resultType.includes('bool') || resultType.includes('Boolean')) {
        return `${prismaDatabaseTypes.boolean}${optionalSuffix}`
    }

    if (isDate) {
        return `${prismaDatabaseTypes.datetime}${optionalSuffix}`
    }

    return convertToPascalCase(resultType)
}

const convertLucidToPrisma = (lucidRow: LucidChartCSVRow): string => {
    const { tableName, columns } = lucidRow

    const fields = columns.map(({ name, type: originalType }) => {
        const type = handleType(name, originalType)

        return `${name}\t${type}\t\n`
    })

    const model = `model ${tableName} {\n\t${fields.join('\t')}}`
    return model
}

const generatePrismaSchema = async (schema: string): Promise<void> => {
    await fs.writeFile(outputFile, schema)
}

const parseLucidChart = (results: LucidChart[]): string => {
    const schema = []

    // schema headers
    schema.push(schemaHeaders)

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

const cleanup = async (inputFile: string = ""): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            if (existsSync(inputFile)) {
                unlinkSync(inputFile)
                // console.log(`Deleted ${inputFile}`)
            }

            if (existsSync(outputFile)) {
                unlinkSync(outputFile)
                // console.log(`Deleted ${outputFile}`)
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
        .finally(() => process.exit())
}

export { lucidToPrisma, parseLucidChart, cleanup, outputFile, generatePrismaSchema, schemaHeaders, LucidChart }
