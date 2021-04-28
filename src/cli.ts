#!/usr/bin/env node

import arg from 'arg'
import { lucidToPrisma } from './prisma'

type Options = {
    prismaInputFile: string | null
}

const helpText =
    'Ooof. Please specify a path to your Lucidchart CSV file like this: \n\n\tlucid-dreams --prisma ~/path/to/data.csv\n\nThe --prisma (or -p) flag means we will convert the Entity Relationship Diagram to a schema.prisma file\n\n\tlucid-dreams -p ~/path/to/data.csv'

const parseArgumentsIntoOptions = (rawArgs: string[]): Options => {
    const args = arg(
        {
            '--prisma': String,
            '-p': '--prisma',
        },
        // {
        // 	'--outputFilePath': String,
        // 	'-o': '--prisma',
        // },
        {
            argv: rawArgs.slice(1),
        }
    )

    return {
        prismaInputFile: args['--prisma'] || null,
    }
}

export const cli = (args: string[]) => {
    const options = parseArgumentsIntoOptions(args)
    if (options?.prismaInputFile) {
        lucidToPrisma(options.prismaInputFile)
    } else {
        console.log(helpText)
    }
}
