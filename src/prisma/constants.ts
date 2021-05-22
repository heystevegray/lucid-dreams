type PrismaDatabaseType = {
    datetime: string
    char: string
    varchar: string
    boolean: string
    uuid: string
    intAutoIncrement: string
}

export const prismaDatabaseTypes: PrismaDatabaseType = {
    datetime: 'DateTime',
    char: '@db.Char',
    varchar: '@db.VarChar',
    boolean: 'Boolean',
    uuid: 'String @id @default(uuid())',
    intAutoIncrement: 'Int @id @default (autoincrement())'
}
