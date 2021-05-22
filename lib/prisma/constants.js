"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaDatabaseTypes = void 0;
exports.prismaDatabaseTypes = {
    datetime: 'DateTime',
    char: '@db.Char',
    varchar: '@db.VarChar',
    boolean: 'Boolean',
    uuid: 'String @id @default(uuid())',
    intAutoIncrement: 'Int @id @default (autoincrement())'
};
