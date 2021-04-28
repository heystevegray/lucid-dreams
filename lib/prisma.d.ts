declare const TABLE_NAME = 'Text Area 1'
export declare type LucidChart = {
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
export declare const parseLucidChart: (results: LucidChart[]) => string
declare const lucidToPrisma: (inputFile: string) => Promise<void>
export { lucidToPrisma }
