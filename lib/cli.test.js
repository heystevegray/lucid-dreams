"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = require("./prisma");
var fs_1 = require("fs");
var lucidChartERD = [
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
];
var invalidData = [];
var outputSchema = "datasource db {\n      provider = \"postgresql\"\n      url      = env(\"DATABASE_URL\")\n    }\n\n    generator client {\n      provider = \"prisma-client-js\"\n    }\n\nmodel Challenge {\n\tid\tString @id @default(uuid())\t\n\ttime\tDateTime\t\n\tlocation\tString @db.VarChar(50)\t\n\taccepted\tBoolean?\t\n\tnotes\tString\t\n\tdescription\tString\t\n\tstartTime\tDateTime\t\n\tendDate\tDateTime\t\n\tcreatedDate\tDateTime\t\n}\n\nmodel Challenge {\n\tid\tString @id @default(uuid())\t\n\ttime\tDateTime\t\n\tlocation\tString @db.VarChar(50)\t\n\taccepted\tBoolean?\t\n\tnotes\tString\t\n\tdescription\tString\t\n\tstartTime\tDateTime\t\n\tendDate\tDateTime\t\n\tcreatedDate\tDateTime\t\n}\n\nmodel Rank {\n\tid\tString @id @default(uuid())\t\n\tposition\tInt\t\n\tdescription\tString? @db.VarChar(100)\t\n\tnotes\tString? @db.Char(100)\t\n}\n\nmodel Rank {\n\tid\tString @id @default(uuid())\t\n\tposition\tInt\t\n\tdescription\tString? @db.VarChar(100)\t\n\tnotes\tString? @db.Char(100)\t\n}\n\nmodel Member {\n\tid\tInt @id @default (autoincrement())\t\n\tfirstName\tString @db.VarChar(100)\t\n\tlastName\tString? @db.Char(245)\t\n\tnickname\tString? @db.VarChar(50)\t\n\tage\tInt?\t\n\tcode\tInt?\t\n}\n\nmodel Member {\n\tid\tInt @id @default (autoincrement())\t\n\tfirstName\tString @db.VarChar(100)\t\n\tlastName\tString? @db.Char(245)\t\n\tnickname\tString? @db.VarChar(50)\t\n\tage\tInt?\t\n\tcode\tInt?\t\n}\n\nmodel Group {\n\tid\tInt @id @default (autoincrement())\t\n\tname\tString\t\n\tdescription\tString\t\n\tbirthday\tDateTime?\t\n\thalfBirthday\tDateTime?\t\n\taccepted\tBoolean?\t\n}\n\nmodel Group {\n\tid\tInt @id @default (autoincrement())\t\n\tname\tString\t\n\tdescription\tString\t\n\tbirthday\tDateTime?\t\n\thalfBirthday\tDateTime?\t\n\taccepted\tBoolean?\t\n}\n\nmodel Leaderboard {\n\tid\tInt @id @default (autoincrement())\t\n\tranks\tRank[]\t\n}\n\nmodel Leaderboard {\n\tid\tInt @id @default (autoincrement())\t\n\tranks\tRank[]\t\n}";
var schema = prisma_1.parseLucidChart(lucidChartERD);
var createSchema = function () { return __awaiter(void 0, void 0, void 0, function () {
    var writeFileSpy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                writeFileSpy = jest.spyOn(fs_1.promises, 'writeFile');
                return [4 /*yield*/, prisma_1.generatePrismaSchema(schema)];
            case 1:
                _a.sent();
                expect(writeFileSpy).toHaveBeenCalledTimes(1);
                writeFileSpy.mockClear();
                return [2 /*return*/];
        }
    });
}); };
var schemaFileExists = function () {
    var exists = fs_1.existsSync(prisma_1.outputFile);
    expect(exists).toBe(true);
};
var schemaFileDoesNotExist = function () {
    var exists = fs_1.existsSync(prisma_1.outputFile);
    expect(exists).toBe(false);
};
describe('Parse Lucidcart to prisma schema', function () {
    it('Should parse Lucidchart ERD correctly', function () {
        expect(schema).toEqual(outputSchema);
    });
    it("The schema should include the keyword 'model'", function () {
        expect(schema).toContain('model');
    });
    it("Should handle incorrect CSV input file", function () {
        var invalidSchema = prisma_1.parseLucidChart(invalidData);
        expect(invalidSchema).not.toContain('model');
    });
    it("Should contain schema headers", function () {
        var invalidSchema = prisma_1.parseLucidChart(invalidData);
        expect(invalidSchema).toContain(prisma_1.schemaHeaders);
        expect(schema).toContain(prisma_1.schemaHeaders);
    });
    it("Generates a " + prisma_1.outputFile + " file", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createSchema()];
                case 1:
                    _a.sent();
                    schemaFileExists();
                    // Cleanup
                    return [4 /*yield*/, prisma_1.cleanup()];
                case 2:
                    // Cleanup
                    _a.sent();
                    schemaFileDoesNotExist();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Can delete the " + prisma_1.outputFile + " file", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma_1.cleanup()];
                case 1:
                    _a.sent();
                    schemaFileDoesNotExist();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Can delete the " + prisma_1.outputFile + " file as an argument", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createSchema()];
                case 1:
                    _a.sent();
                    schemaFileExists();
                    return [4 /*yield*/, prisma_1.cleanup(prisma_1.outputFile)];
                case 2:
                    _a.sent();
                    schemaFileDoesNotExist();
                    return [2 /*return*/];
            }
        });
    }); });
});
