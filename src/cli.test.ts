import { parseLucidChart, LucidChart } from './prisma'

const lucidChartERD = [
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
        'Text Area 3': 'Int',
        'Text Area 4': 'time',
        'Text Area 5': 'DateTime',
        'Text Area 6': 'location',
        'Text Area 7': 'String',
        'Text Area 8': 'accepted',
        'Text Area 9': 'Boolean',
        'Text Area 10': 'notes',
        'Text Area 11': 'String',
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
        'Text Area 3': 'Int',
        'Text Area 4': 'position',
        'Text Area 5': 'Int',
        'Text Area 6': '',
        'Text Area 7': '',
        'Text Area 8': '',
        'Text Area 9': '',
        'Text Area 10': '',
        'Text Area 11': '',
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
        'Text Area 5': 'String',
        'Text Area 6': 'lastName',
        'Text Area 7': 'String',
        'Text Area 8': 'nickname',
        'Text Area 9': 'String',
        'Text Area 10': '',
        'Text Area 11': '',
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
        'Text Area 6': 'members',
        'Text Area 7': 'Member[]',
        'Text Area 8': '',
        'Text Area 9': '',
        'Text Area 10': '',
        'Text Area 11': '',
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
    },
]

const invalidData: LucidChart[] = []

const outputSchema = `model Challenge {\n\tid\tInt\t@id @default (autoincrement())\n\ttime\tDateTime\t\n\tlocation\tString\t\n\taccepted\tBoolean\t\n\tnotes\tString\t\n}\n\nmodel Rank {\n\tid\tInt\t@id @default (autoincrement())\n\tposition\tInt\t\n}\n\nmodel Member {\n\tid\tInt\t@id @default (autoincrement())\n\tfirstName\tString\t\n\tlastName\tString\t\n\tnickname\tString\t\n}\n\nmodel Group {\n\tid\tInt\t@id @default (autoincrement())\n\tname\tString\t\n\tmembers\tMember[]\t\n}\n\nmodel Leaderboard {\n\tid\tInt\t@id @default (autoincrement())\n\tranks\tRank[]\t\n}`

describe('Parse Lucidcart to prisma schema', () => {
    const schema = parseLucidChart(lucidChartERD)

    it('Should parse Lucidchart ERD correctly', () => {
        expect(schema).toEqual(outputSchema)
    })

    it(`The schema should include the keyword 'model'`, () => {
        expect(schema).toContain('model')
    })

    it(`Should handle incorrect CSV input file`, () => {
        const invalidSchema = parseLucidChart(invalidData)
        expect(invalidSchema).toBeFalsy()
    })
})
