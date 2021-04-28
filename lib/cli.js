#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
var arg_1 = __importDefault(require("arg"));
var prisma_1 = require("./prisma");
var helpText = 'Ooof. Please specify a path to your Lucidchart CSV file like this: \n\n\tlucid-dreams --prisma ~/path/to/data.csv\n\nThe --prisma (or -p) flag means we will convert the Entity Relationship Diagram to a schema.prisma file\n\n\tlucid-dreams -p ~/path/to/data.csv';
var parseArgumentsIntoOptions = function (rawArgs) {
    var args = arg_1.default({
        '--prisma': String,
        '-p': '--prisma',
    }, 
    // {
    // 	'--outputFilePath': String,
    // 	'-o': '--prisma',
    // },
    {
        argv: rawArgs.slice(1),
    });
    return {
        prismaInputFile: args['--prisma'] || null,
    };
};
var cli = function (args) {
    var options = parseArgumentsIntoOptions(args);
    if (options === null || options === void 0 ? void 0 : options.prismaInputFile) {
        prisma_1.lucidToPrisma(options.prismaInputFile);
    }
    else {
        console.log(helpText);
    }
};
exports.cli = cli;
