<div align="center">
<br />
<br />
<h1>lucid-dreams</h1>
<p>A CLI to convert a Lucidchart ERD to a Prisma schema file</p>
<a href="https://www.npmjs.com/package/lucid-dreams">
<img src="https://img.shields.io/npm/v/lucid-dreams" alt="npm package" />
</a>
<a href="https://www.npmjs.com/package/lucid-dreams">
<img src="https://img.shields.io/npm/dt/lucid-dreams" alt="npm downloads" />
</a>
</div>

- [Overview](#overview)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Supported fields](#supported-fields)
    - [Required or mandatory fields](#required-or-mandatory-fields)
    - [Optional fields](#optional-fields)
  - [Supported Lucidchart Shapes](#supported-lucidchart-shapes)
    - [Entity Relationship (2 columns)](#entity-relationship-2-columns)
      - [Shape Structure](#shape-structure)
  - [Example](#example)

# Overview

[Lucidchart](https://lucid.co/product/lucidchart) allows you to create an [Entity Relationship Diagram (ERD)](https://www.lucidchart.com/pages/er-diagrams), which is a great way to visualize and mange your [database schema](https://www.lucidchart.com/pages/database-diagram/database-schema). It also allows you to export your ERD as a "CSV of Shape Data" `.csv` file.

[Prisma](https://www.prisma.io/) is an [ORM](https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/is-prisma-an-orm#what-are-orms) for [Node.js](https://nodejs.org/en/) and [TypeScript](https://www.typescriptlang.org/), and it's been an awesome developer experience for me personally.

This command line interface (CLI) will take a Lucidchart "CSV of Shape Data" file as input, and output a [Prisma Schema file](https://www.prisma.io/docs/concepts/components/prisma-schema) 😎. Before the `schema.prisma` file is generated, [prisma format](https://www.prisma.io/docs/reference/api-reference/command-reference#format) is run against the file which will:

> Format the Prisma schema file, which includes validating, formatting, and persisting the schema. | [Source](https://www.prisma.io/docs/reference/api-reference/command-reference#format)

Much love to the Prisma team 💙

## Installation

```shell
npm install lucid-dreams
```

## Usage

```shell
npx lucid-dreams --prisma ~/path/to/lucidchart/data.csv
```
```shell
npx lucid-dreams -p ~/path/to/data.csv
```

The `--prisma` (or `-p`) flag means we will convert the Entity Relationship Diagram to a `schema.prisma` file.


## Supported fields
> **Note**: If you have a Lucidchart field called `id` the "`@id @default(autoincrement())`" attribute will automatically be included 😎 | [More info on autoincrement()](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#autoincrement)  

### Required or mandatory fields

By default, your field will be a [mandatory field](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#optional-and-mandatory-fields) in the generated `schema.prisma` file. Lucidchart fields are converted to the following Prisma [model field scalar types](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference/#model-field-scalar-types):

| Lucidchart field | Prisma model field scalar types | Resources                                                                                                   |
| ---------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| uuid / id        | String  @id @default(uuid())    | [uuid()](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#uuid)                   |
| int              | Int                             | [autoIncrement()](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#autoincrement) |
| varchar(100)     | String @db.VarChar(100)         | [varChar(x)](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#postgresql)         |
| char(245)        | String @db.Char(245)            | [char(x)](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#postgresql)            |
| datetime         | DateTime                        |                                                                                                             |
| date             | DateTime                        |                                                                                                             |
| time             | DateTime                        |                                                                                                             |
| timestamp        | DateTime                        |                                                                                                             |
| bool             | Boolean                         |                                                                                                             |
| boolean          | Boolean                         |                                                                                                             |

### Optional fields
Optional Lucidchart fields can be represented with the `?` or `(null)` modifiers. If either of those modifiers exist in the Lucidchart field, the field will be modified with the `?` [Prisma Type modifier](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#type-modifiers) making it optional:

| Lucidchart field                   | Prisma model field scalar types |
| ---------------------------------- | ------------------------------- |
| int? / int(null)                   | Int?                            |
| varchar(100)? / varchar(100)(null) | String? @db.VarChar(100)        |
| char(245)? / char(245)(null)       | String? @db.Char(245)           |
| datetime? /  datetime(null)        | DateTime?                       |
| date? / date(null)                 | DateTime?                       |
| time? / time(null)                 | DateTime?                       |
| timestamp? / timestamp(null)       | DateTime?                       |
| bool? / bool(null)                 | Boolean?                        |
| boolean? / boolean(null)           | Boolean?                        |

## Supported Lucidchart Shapes

### Entity Relationship (2 columns)

Create a 2 column Shape in your Lucidchart ERD.

#### Shape Structure

The label in the header section of the Lucidchart Shape will be the **table name**, or the name of the resulting [Prisma model](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model). The first column should be the database **column name** ([prisma field](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference/#model-fields)), and the second column should be it's [field](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference/#model-field-scalar-types).

## Example

Here is an example Lucidchart Entity Relationship Diagram with a two column structure. The first column is the database **column name** ([prisma field](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference/#model-fields)), and the second column is the [field](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference/#model-field-scalar-types). The [field](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference/#model-field-scalar-types) column is case insensitive, and can contain the modifiers `?` or `(null)` to make it [optional](#Optional-fields). The image below includes various examples of [fields](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference/#model-field-scalar-types) using both `?` and `(null)` modifiers:

![Lucid chart entity relationship diagram with various examples of fields using both ? and null modifiers](assets/lucid-chart-demo.png)

1. This chart would then be exported from Lucidchart like this: `File > Export > CSV of Shape Data`. Let's say we saved it as `/Downloads/data.csv` for example.
2. We can now run the `lucid-dreams` CLI with the [-p flag](#usage) and specify the path to the file we just exported: 
   ```bash
   npx lucid-dreams -p /Downloads/data.csv
   ```
3. The `lucid-dreams` CLI will take the models from Lucidchart and convert them to [Prisma models](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model). The generated `schema.prisma` file will contain the following:

    ```ts
    datasource db {
      url      = env("DATABASE_URL")
      provider = "postgresql"
    }

    generator client {
      provider = "prisma-client-js"
    }

    model Challenge {
      id          String   @id @default(uuid())
      time        DateTime
      location    String   @db.VarChar(50)
      accepted    Boolean?
      notes       String
      description String
      startTime   DateTime
      endDate     DateTime
      createdDate DateTime
    }

    model Rank {
      id            String       @id @default(uuid())
      position      Int
      description   String?      @db.VarChar(100)
      notes         String?      @db.Char(100)
      Leaderboard   Leaderboard? @relation(fields: [leaderboardId], references: [id])
      leaderboardId Int?
    }

    model Member {
      id        Int     @id @default(autoincrement())
      firstName String  @db.VarChar(100)
      lastName  String? @db.Char(245)
      nickname  String? @db.VarChar(50)
      age       Int?
      code      Int?
    }

    model Group {
      id           Int       @id @default(autoincrement())
      name         String
      description  String
      birthday     DateTime?
      halfBirthday DateTime?
      accepted     Boolean?
    }

    model Leaderboard {
      id    Int    @id @default(autoincrement())
      ranks Rank[]
    }
    ```
