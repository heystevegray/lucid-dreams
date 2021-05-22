import { parseLucidChart, LucidChart, schemaHeaders, generatePrismaSchema, cleanup, outputFile } from './prisma'
import { existsSync, promises as fsPromise } from 'fs'

const lucidChartERD: LucidChart[] = [
    {
        Id: 2,
        Name: 'Entity',
        'Shape Library': 'Entity Relationship',
        'Page ID': '1',
        'Contained By': '',
        Group: '',
        'Line Source': '',
        'Line Destination': '',
        'Source Arrow': '',
        'Destination Arrow': '',
        'Text Area 1': 'Challenge',
        'Text Area 2': 'id',
        'Text Area 3': 'id',
        'Text Area 4': 'time',
        'Text Area 5': 'datetime',
        'Text Area 6': 'location',
        'Text Area 7': 'varchar(50)',
        'Text Area 8': 'accepted',
        'Text Area 9': 'Boolean(null)',
        'Text Area 10': 'notes',
        'Text Area 11': 'String(null)',
        'Text Area 12': 'description',
        'Text Area 13': 'String?',
        'Text Area 14': 'startTime',
        'Text Area 15': 'Time',
        'Text Area 16': 'endDate',
        'Text Area 17': 'Date',
        'Text Area 18': 'createdDate',
        'Text Area 19': 'DateTime'
    },
    {
        Id: 2,
        Name: 'Entity',
        'Shape Library': 'Entity Relationship',
        'Page ID': '1',
        'Contained By': '',
        Group: '',
        'Line Source': '',
        'Line Destination': '',
        'Source Arrow': '',
        'Destination Arrow': '',
        'Text Area 1': 'Challenge',
        'Text Area 2': 'id',
        'Text Area 3': 'id',
        'Text Area 4': 'time',
        'Text Area 5': 'datetime',
        'Text Area 6': 'location',
        'Text Area 7': 'varchar(50)',
        'Text Area 8': 'accepted',
        'Text Area 9': 'Boolean(null)',
        'Text Area 10': 'notes',
        'Text Area 11': 'String(null)',
        'Text Area 12': 'description',
        'Text Area 13': 'String?',
        'Text Area 14': 'startTime',
        'Text Area 15': 'Time',
        'Text Area 16': 'endDate',
        'Text Area 17': 'Date',
        'Text Area 18': 'createdDate',
        'Text Area 19': 'DateTime'
    },
    {
        Id: 3,
        Name: 'Entity',
        'Shape Library': 'Entity Relationship',
        'Page ID': '1',
        'Contained By': '',
        Group: '',
        'Line Source': '',
        'Line Destination': '',
        'Source Arrow': '',
        'Destination Arrow': '',
        'Text Area 1': 'Rank',
        'Text Area 2': 'id',
        'Text Area 3': 'uuid',
        'Text Area 4': 'position',
        'Text Area 5': 'Int',
        'Text Area 6': 'description',
        'Text Area 7': 'varChar(100)(null)',
        'Text Area 8': 'notes',
        'Text Area 9': 'char(100)(null)',
        'Text Area 10': '',
        'Text Area 11': '',
        'Text Area 12': '',
        'Text Area 13': '',
        'Text Area 14': '',
        'Text Area 15': '',
        'Text Area 16': '',
        'Text Area 17': '',
        'Text Area 18': '',
        'Text Area 19': ''
    },
    {
        Id: 3,
        Name: 'Entity',
        'Shape Library': 'Entity Relationship',
        'Page ID': '1',
        'Contained By': '',
        Group: '',
        'Line Source': '',
        'Line Destination': '',
        'Source Arrow': '',
        'Destination Arrow': '',
        'Text Area 1': 'Rank',
        'Text Area 2': 'id',
        'Text Area 3': 'uuid',
        'Text Area 4': 'position',
        'Text Area 5': 'Int',
        'Text Area 6': 'description',
        'Text Area 7': 'varChar(100)(null)',
        'Text Area 8': 'notes',
        'Text Area 9': 'char(100)(null)',
        'Text Area 10': '',
        'Text Area 11': '',
        'Text Area 12': '',
        'Text Area 13': '',
        'Text Area 14': '',
        'Text Area 15': '',
        'Text Area 16': '',
        'Text Area 17': '',
        'Text Area 18': '',
        'Text Area 19': ''
    },
    {
        Id: 4,
        Name: 'Entity',
        'Shape Library': 'Entity Relationship',
        'Page ID': '1',
        'Contained By': '',
        Group: '',
        'Line Source': '',
        'Line Destination': '',
        'Source Arrow': '',
        'Destination Arrow': '',
        'Text Area 1': 'Member',
        'Text Area 2': 'id',
        'Text Area 3': 'Int',
        'Text Area 4': 'firstName',
        'Text Area 5': 'varChar(100)',
        'Text Area 6': 'lastName',
        'Text Area 7': 'char(245)?',
        'Text Area 8': 'nickname',
        'Text Area 9': 'varchar(50)?',
        'Text Area 10': 'age',
        'Text Area 11': 'Int(null)',
        'Text Area 12': 'code',
        'Text Area 13': 'Int?',
        'Text Area 14': '',
        'Text Area 15': '',
        'Text Area 16': '',
        'Text Area 17': '',
        'Text Area 18': '',
        'Text Area 19': ''
    },
    {
        Id: 4,
        Name: 'Entity',
        'Shape Library': 'Entity Relationship',
        'Page ID': '1',
        'Contained By': '',
        Group: '',
        'Line Source': '',
        'Line Destination': '',
        'Source Arrow': '',
        'Destination Arrow': '',
        'Text Area 1': 'Member',
        'Text Area 2': 'id',
        'Text Area 3': 'Int',
        'Text Area 4': 'firstName',
        'Text Area 5': 'varChar(100)',
        'Text Area 6': 'lastName',
        'Text Area 7': 'char(245)?',
        'Text Area 8': 'nickname',
        'Text Area 9': 'varchar(50)?',
        'Text Area 10': 'age',
        'Text Area 11': 'Int(null)',
        'Text Area 12': 'code',
        'Text Area 13': 'Int?',
        'Text Area 14': '',
        'Text Area 15': '',
        'Text Area 16': '',
        'Text Area 17': '',
        'Text Area 18': '',
        'Text Area 19': ''
    },
    {
        Id: 5,
        Name: 'Entity',
        'Shape Library': 'Entity Relationship',
        'Page ID': '1',
        'Contained By': '',
        Group: '',
        'Line Source': '',
        'Line Destination': '',
        'Source Arrow': '',
        'Destination Arrow': '',
        'Text Area 1': 'Group',
        'Text Area 2': 'id',
        'Text Area 3': 'Int',
        'Text Area 4': 'name',
        'Text Area 5': 'String',
        'Text Area 6': 'description',
        'Text Area 7': 'String?',
        'Text Area 8': 'birthday',
        'Text Area 9': 'timestamp?',
        'Text Area 10': 'halfBirthday',
        'Text Area 11': 'datetime(null)',
        'Text Area 12': 'accepted',
        'Text Area 13': 'bool?',
        'Text Area 14': '',
        'Text Area 15': '',
        'Text Area 16': '',
        'Text Area 17': '',
        'Text Area 18': '',
        'Text Area 19': ''
    },
    {
        Id: 5,
        Name: 'Entity',
        'Shape Library': 'Entity Relationship',
        'Page ID': '1',
        'Contained By': '',
        Group: '',
        'Line Source': '',
        'Line Destination': '',
        'Source Arrow': '',
        'Destination Arrow': '',
        'Text Area 1': 'Group',
        'Text Area 2': 'id',
        'Text Area 3': 'Int',
        'Text Area 4': 'name',
        'Text Area 5': 'String',
        'Text Area 6': 'description',
        'Text Area 7': 'String?',
        'Text Area 8': 'birthday',
        'Text Area 9': 'timestamp?',
        'Text Area 10': 'halfBirthday',
        'Text Area 11': 'datetime(null)',
        'Text Area 12': 'accepted',
        'Text Area 13': 'bool?',
        'Text Area 14': '',
        'Text Area 15': '',
        'Text Area 16': '',
        'Text Area 17': '',
        'Text Area 18': '',
        'Text Area 19': ''
    },
    {
        Id: 6,
        Name: 'Entity',
        'Shape Library': 'Entity Relationship',
        'Page ID': '1',
        'Contained By': '',
        Group: '',
        'Line Source': '',
        'Line Destination': '',
        'Source Arrow': '',
        'Destination Arrow': '',
        'Text Area 1': 'Leaderboard',
        'Text Area 2': 'id',
        'Text Area 3': 'Int',
        'Text Area 4': 'ranks',
        'Text Area 5': 'Rank[]',
        'Text Area 6': '',
        'Text Area 7': '',
        'Text Area 8': '',
        'Text Area 9': '',
        'Text Area 10': '',
        'Text Area 11': '',
        'Text Area 12': '',
        'Text Area 13': '',
        'Text Area 14': '',
        'Text Area 15': '',
        'Text Area 16': '',
        'Text Area 17': '',
        'Text Area 18': '',
        'Text Area 19': ''
    },
    {
        Id: 6,
        Name: 'Entity',
        'Shape Library': 'Entity Relationship',
        'Page ID': '1',
        'Contained By': '',
        Group: '',
        'Line Source': '',
        'Line Destination': '',
        'Source Arrow': '',
        'Destination Arrow': '',
        'Text Area 1': 'Leaderboard',
        'Text Area 2': 'id',
        'Text Area 3': 'Int',
        'Text Area 4': 'ranks',
        'Text Area 5': 'Rank[]',
        'Text Area 6': '',
        'Text Area 7': '',
        'Text Area 8': '',
        'Text Area 9': '',
        'Text Area 10': '',
        'Text Area 11': '',
        'Text Area 12': '',
        'Text Area 13': '',
        'Text Area 14': '',
        'Text Area 15': '',
        'Text Area 16': '',
        'Text Area 17': '',
        'Text Area 18': '',
        'Text Area 19': ''
    }
]

const invalidData: LucidChart[] = []

const outputSchema = `datasource db {\n      provider = \"postgresql\"\n      url      = env(\"DATABASE_URL\")\n    }\n\n    generator client {\n      provider = \"prisma-client-js\"\n    }\n\nmodel Challenge {\n\tid\tString @id @default(uuid())\t\n\ttime\tDateTime\t\n\tlocation\tString @db.VarChar(50)\t\n\taccepted\tBoolean?\t\n\tnotes\tString\t\n\tdescription\tString\t\n\tstartTime\tDateTime\t\n\tendDate\tDateTime\t\n\tcreatedDate\tDateTime\t\n}\n\nmodel Challenge {\n\tid\tString @id @default(uuid())\t\n\ttime\tDateTime\t\n\tlocation\tString @db.VarChar(50)\t\n\taccepted\tBoolean?\t\n\tnotes\tString\t\n\tdescription\tString\t\n\tstartTime\tDateTime\t\n\tendDate\tDateTime\t\n\tcreatedDate\tDateTime\t\n}\n\nmodel Rank {\n\tid\tString @id @default(uuid())\t\n\tposition\tInt\t\n\tdescription\tString? @db.VarChar(100)\t\n\tnotes\tString? @db.Char(100)\t\n}\n\nmodel Rank {\n\tid\tString @id @default(uuid())\t\n\tposition\tInt\t\n\tdescription\tString? @db.VarChar(100)\t\n\tnotes\tString? @db.Char(100)\t\n}\n\nmodel Member {\n\tid\tInt @id @default (autoincrement())\t\n\tfirstName\tString @db.VarChar(100)\t\n\tlastName\tString? @db.Char(245)\t\n\tnickname\tString? @db.VarChar(50)\t\n\tage\tInt?\t\n\tcode\tInt?\t\n}\n\nmodel Member {\n\tid\tInt @id @default (autoincrement())\t\n\tfirstName\tString @db.VarChar(100)\t\n\tlastName\tString? @db.Char(245)\t\n\tnickname\tString? @db.VarChar(50)\t\n\tage\tInt?\t\n\tcode\tInt?\t\n}\n\nmodel Group {\n\tid\tInt @id @default (autoincrement())\t\n\tname\tString\t\n\tdescription\tString\t\n\tbirthday\tDateTime?\t\n\thalfBirthday\tDateTime?\t\n\taccepted\tBoolean?\t\n}\n\nmodel Group {\n\tid\tInt @id @default (autoincrement())\t\n\tname\tString\t\n\tdescription\tString\t\n\tbirthday\tDateTime?\t\n\thalfBirthday\tDateTime?\t\n\taccepted\tBoolean?\t\n}\n\nmodel Leaderboard {\n\tid\tInt @id @default (autoincrement())\t\n\tranks\tRank[]\t\n}\n\nmodel Leaderboard {\n\tid\tInt @id @default (autoincrement())\t\n\tranks\tRank[]\t\n}`

const schema = parseLucidChart(lucidChartERD)

const createSchema = async () => {
    const writeFileSpy = jest.spyOn(fsPromise, 'writeFile')
    await generatePrismaSchema(schema)

    expect(writeFileSpy).toHaveBeenCalledTimes(1)
    writeFileSpy.mockClear()
}

const schemaFileExists = () => {
    const exists = existsSync(outputFile)
    expect(exists).toBe(true)
}

const schemaFileDoesNotExist = () => {
    const exists = existsSync(outputFile)
    expect(exists).toBe(false)
}

describe('Parse Lucidcart to prisma schema', () => {


    it('Should parse Lucidchart ERD correctly', () => {
        expect(schema).toEqual(outputSchema)
    })

    it(`The schema should include the keyword 'model'`, () => {
        expect(schema).toContain('model')
    })

    it(`Should handle incorrect CSV input file`, () => {
        const invalidSchema = parseLucidChart(invalidData)
        expect(invalidSchema).not.toContain('model')
    })

    it(`Should contain schema headers`, () => {
        const invalidSchema = parseLucidChart(invalidData)
        expect(invalidSchema).toContain(schemaHeaders)
        expect(schema).toContain(schemaHeaders)
    })

    it(`Generates a ${outputFile} file`, async () => {
        await createSchema()
        schemaFileExists()

        // Cleanup
        await cleanup()
        schemaFileDoesNotExist()
    })

    it(`Can delete the ${outputFile} file`, async () => {
        await cleanup()
        schemaFileDoesNotExist()
    })

    it(`Can delete the ${outputFile} file as an argument`, async () => {
        await createSchema()
        schemaFileExists()

        await cleanup(outputFile)
        schemaFileDoesNotExist()
    })
})
