'use strict'
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1]
                    return t[1]
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function () {
                    return this
                }),
            g
        )
        function verb(n) {
            return function (v) {
                return step([n, v])
            }
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.')
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y['return']
                                    : op[0]
                                    ? y['throw'] ||
                                      ((t = y['return']) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t
                    if (((y = 0), t)) op = [op[0] & 2, t.value]
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op
                            break
                        case 4:
                            _.label++
                            return { value: op[1], done: false }
                        case 5:
                            _.label++
                            y = op[1]
                            op = [0]
                            continue
                        case 7:
                            op = _.ops.pop()
                            _.trys.pop()
                            continue
                        default:
                            if (
                                !((t = _.trys),
                                (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0
                                continue
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
                                _.label = op[1]
                                break
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1]
                                t = op
                                break
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2]
                                _.ops.push(op)
                                break
                            }
                            if (t[2]) _.ops.pop()
                            _.trys.pop()
                            continue
                    }
                    op = body.call(thisArg, _)
                } catch (e) {
                    op = [6, e]
                    y = 0
                } finally {
                    f = t = 0
                }
            if (op[0] & 5) throw op[1]
            return { value: op[0] ? op[1] : void 0, done: true }
        }
    }
var __rest =
    (this && this.__rest) ||
    function (s, e) {
        var t = {}
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p]
        if (s != null && typeof Object.getOwnPropertySymbols === 'function')
            for (
                var i = 0, p = Object.getOwnPropertySymbols(s);
                i < p.length;
                i++
            ) {
                if (
                    e.indexOf(p[i]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(s, p[i])
                )
                    t[p[i]] = s[p[i]]
            }
        return t
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.lucidToPrisma = exports.parseLucidChart = void 0
var csv_parser_1 = __importDefault(require('csv-parser'))
var fs_1 = require('fs')
var child_process_1 = require('child_process')
var path_1 = __importDefault(require('path'))
var listr_1 = __importDefault(require('listr'))
var constants_1 = require('./constants')
var outputFile = './schema.prisma'
var SHAPE_LIBRARY = 'Shape Library'
var ENTITY_RELATIONSHIP = 'Entity Relationship'
var TABLE_NAME = 'Text Area 1'
var TEXT_AREA = 'Text Area'
var ID = 'id'
var parseCharacterCount = function (chars, subStringLength) {
    return chars.replace('(', '').replace(')', '').substring(subStringLength)
}
var convertToPascalCase = function (name) {
    return name.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase()
    })
}
var handleType = function (type) {
    var typeLowercase = type.toLowerCase()
    var result = typeLowercase
    if (typeLowercase.includes('varchar')) {
        var charLength = parseCharacterCount(type, 'varchar'.length)
        return (
            'String ' +
            constants_1.prismaDatabaseTypes.varchar +
            '(' +
            charLength +
            ')'
        )
    }
    if (typeLowercase.includes('char')) {
        var charLength = parseCharacterCount(type, 'char'.length)
        return (
            'String ' +
            constants_1.prismaDatabaseTypes.char +
            '(' +
            charLength +
            ')'
        )
    }
    if (
        typeLowercase.includes('datetime') ||
        typeLowercase.includes('time') ||
        typeLowercase.includes('date')
    ) {
        return '' + constants_1.prismaDatabaseTypes.datetime
    }
    return convertToPascalCase(result)
}
var convertLucidToPrisma = function (lucidRow) {
    var tableName = lucidRow.tableName,
        columns = lucidRow.columns
    var fields = columns.map(function (_a) {
        var name = _a.name,
            originalType = _a.type
        var type = handleType(originalType)
        if (name === ID) {
            // Auto increment
            return (
                name +
                '\t' +
                type +
                '\t' +
                '@id @default (autoincrement())' +
                '\n'
            )
        }
        return name + '\t' + type + '\t\n'
    })
    var model = 'model ' + tableName + ' {\n\t' + fields.join('\t') + '}'
    return model
}
var generatePrismaSchema = function (schema) {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        fs_1.promises.writeFile(outputFile, schema),
                    ]
                case 1:
                    _a.sent()
                    return [2 /*return*/]
            }
        })
    })
}
var parseLucidChart = function (results) {
    var schema = []
    for (var index = 0; index < results.length; index++) {
        var row = results[index]
        var _a = row,
            Id = _a.Id,
            Name = _a.Name,
            _b = SHAPE_LIBRARY,
            relationShipType = _a[_b],
            _c = TABLE_NAME,
            tableName = _a[_c],
            rest = __rest(_a, [
                'Id',
                'Name',
                typeof _b === 'symbol' ? _b : _b + '',
                typeof _c === 'symbol' ? _c : _c + '',
            ])
        var entries = Object.entries(rest)
        var columns = []
        if (relationShipType === ENTITY_RELATIONSHIP) {
            var onlyColumns = entries.filter(function (_a) {
                var key = _a[0]
                return key.includes(TEXT_AREA)
            })
            for (
                var columnIndex = 0;
                columnIndex < onlyColumns.length;
                columnIndex += 2
            ) {
                var nextIndex = columnIndex + 1
                if (columnIndex !== onlyColumns.length - 1) {
                    var _d = onlyColumns[columnIndex],
                        columnName = _d[1]
                    var _e = onlyColumns[nextIndex],
                        dataType = _e[1]
                    var name_1 = columnName
                    var type = dataType
                    if (name_1 && type) {
                        columns.push({ name: name_1, type: type })
                    }
                }
            }
            var lucidRow = {
                tableName: tableName,
                columns: columns,
                relationShipType: relationShipType,
            }
            var model = convertLucidToPrisma(lucidRow)
            schema.push(model)
        }
    }
    return schema.join('\n\n')
}
exports.parseLucidChart = parseLucidChart
var format = function () {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [
                2 /*return*/,
                new Promise(function (resolve, reject) {
                    try {
                        child_process_1.exec(
                            'npx prisma format',
                            function (error, stdout, stderr) {
                                if (error) {
                                    console.log('' + error.message)
                                    reject(error.message)
                                    return
                                }
                                if (stderr) {
                                    console.log(' hi')
                                    console.log('' + stderr)
                                    reject(stderr)
                                    return
                                }
                                resolve()
                            }
                        )
                    } catch (error) {
                        reject(error)
                    }
                }),
            ]
        })
    })
}
var cleanup = function (inputFile) {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [
                2 /*return*/,
                new Promise(function (resolve, reject) {
                    try {
                        if (fs_1.existsSync(inputFile)) {
                            fs_1.unlinkSync(inputFile)
                            console.log('Deleted ' + inputFile)
                        }
                        if (fs_1.existsSync(outputFile)) {
                            fs_1.unlinkSync(outputFile)
                            console.log('Deleted ' + outputFile)
                        }
                        resolve()
                    } catch (error) {
                        console.log(error)
                        reject(error)
                    }
                }),
            ]
        })
    })
}
var lucidToPrisma = function (inputFile) {
    return __awaiter(void 0, void 0, void 0, function () {
        var results, absolutePath, tasks
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    results = []
                    absolutePath = path_1.default.resolve(outputFile)
                    tasks = new listr_1.default([
                        {
                            title: 'Parsing ' + inputFile,
                            task: function (ctx) {
                                return __awaiter(
                                    void 0,
                                    void 0,
                                    void 0,
                                    function () {
                                        return __generator(this, function (_a) {
                                            return [
                                                2 /*return*/,
                                                new Promise(function (
                                                    resolve,
                                                    reject
                                                ) {
                                                    fs_1.createReadStream(
                                                        '' + inputFile
                                                    )
                                                        .pipe(
                                                            csv_parser_1.default()
                                                        )
                                                        .on(
                                                            'data',
                                                            function (data) {
                                                                var isERD = Object.values(
                                                                    data
                                                                ).includes(
                                                                    ENTITY_RELATIONSHIP
                                                                )
                                                                if (isERD) {
                                                                    results.push(
                                                                        data
                                                                    )
                                                                }
                                                            }
                                                        )
                                                        .on(
                                                            'error',
                                                            function (error) {
                                                                return reject(
                                                                    error
                                                                )
                                                            }
                                                        )
                                                        .on('end', function () {
                                                            return __awaiter(
                                                                void 0,
                                                                void 0,
                                                                void 0,
                                                                function () {
                                                                    return __generator(
                                                                        this,
                                                                        function (
                                                                            _a
                                                                        ) {
                                                                            if (
                                                                                results.length ===
                                                                                0
                                                                            ) {
                                                                                return [
                                                                                    2 /*return*/,
                                                                                    reject(
                                                                                        new Error(
                                                                                            'Boo. The provided file is not formatted correctly. Are you sure this is a Lucidchart CSV file of an Entity Relationship Diagram? 🤔'
                                                                                        )
                                                                                    ),
                                                                                ]
                                                                            } else {
                                                                                ctx.results = results
                                                                                return [
                                                                                    2 /*return*/,
                                                                                    resolve(),
                                                                                ]
                                                                            }
                                                                            return [
                                                                                2 /*return*/,
                                                                            ]
                                                                        }
                                                                    )
                                                                }
                                                            )
                                                        })
                                                }),
                                            ]
                                        })
                                    }
                                )
                            },
                        },
                        {
                            title: 'Generating ' + absolutePath,
                            task: function (ctx) {
                                return __awaiter(
                                    void 0,
                                    void 0,
                                    void 0,
                                    function () {
                                        var schema
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    schema = exports.parseLucidChart(
                                                        ctx.results
                                                    )
                                                    return [
                                                        4 /*yield*/,
                                                        generatePrismaSchema(
                                                            schema
                                                        ),
                                                    ]
                                                case 1:
                                                    _a.sent()
                                                    return [2 /*return*/]
                                            }
                                        })
                                    }
                                )
                            },
                        },
                        {
                            title: 'Running Prisma format 😎',
                            task: function () {
                                return __awaiter(
                                    void 0,
                                    void 0,
                                    void 0,
                                    function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    return [
                                                        4 /*yield*/,
                                                        format(),
                                                    ]
                                                case 1:
                                                    _a.sent()
                                                    return [2 /*return*/]
                                            }
                                        })
                                    }
                                )
                            },
                        },
                    ])
                    return [
                        4 /*yield*/,
                        tasks
                            .run()
                            .then(function () {
                                console.log(
                                    '\n\u2705 Successfully created ' +
                                        absolutePath
                                )
                            })
                            .finally(function () {
                                return [process.exit(1)]
                            }),
                    ]
                case 1:
                    _a.sent()
                    return [2 /*return*/]
            }
        })
    })
}
exports.lucidToPrisma = lucidToPrisma
