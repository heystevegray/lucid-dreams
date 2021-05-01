type PrismaDatabaseType = {
    datetime: string
    char: string
    varchar: string
}

export const prismaDatabaseTypes: PrismaDatabaseType = {
    datetime: 'DateTime',
    char: '@db.Char',
    varchar: '@db.VarChar',
}
