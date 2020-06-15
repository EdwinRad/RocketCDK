
# RocketCDK
[![Version](https://img.shields.io/npm/v/rocketcdk.svg)](https://npmjs.org/package/rocketcdk)

[![Downloads/week](https://img.shields.io/npm/dw/rocketcdk.svg)](https://npmjs.org/package/rocketcdk)

[![License](https://img.shields.io/npm/l/rocketcdk.svg)](https://github.com/EdwinRad/rocketcdk/blob/master/package.json)


  ## Initializes your CDK-project, installs packages and auto-imports them into your Stack.ts.  All in one Command.
Try me:
```sh-session
$ npx rocketcdk init
```
## Why?
I find installing packages and writing the import statement into my stack a time-consuming, error-prone process that often enough results in version mismatch.

## What it does:
Initialize a new CDK project
```sh-session
$ cdk init -l typescript
```
Install the AWS-CDK locally in your specified version plus core and assert to minimize the chance of version mismatch.
```sh-session
$ npm install aws-cdk@1.45.0 @aws-cdk/core@1.45.0 @aws-cdk/assert@1.45.0
```
Install all chosen packages in your specified version.
```sh-session
$ npm install  @aws-cdk/aws-s3@1.45.0 @aws-cdk/aws-iam@1.45.0
```
Writes all your dependencies into your 'stack.ts' file.

```typescript
import * as s3 from '@aws-cdk/aws-s3'
import * as accessanalyzer from '@aws-cdk/aws-accessanalyzer'
import * as amplify from '@aws-cdk/aws-amplify'
import * as appconfig from '@aws-cdk/aws-appconfig'
...
```
And you're ready to go!

## What it doesn't do...yet

 - Supports only Typescript at the moment.
 - Gives you a command to install more packages after initalizing.

# Commands

<!-- commands -->

*  [`rocketcdk help [COMMAND]`](#rocketcdk-help-command)

*  [`rocketcdk init`](#rocketcdk-init)

  

## `rocketcdk help [COMMAND]`

  

display help for rocketcdk

  

```

USAGE

$ rocketcdk help [COMMAND]

  

ARGUMENTS

COMMAND command to show help for

  

OPTIONS

--all see all commands in CLI

```

## `rocketcdk init`

  

Initializes your CDK-project, installs CDK-packages and imports them into your Stack.ts file.

  

```

USAGE

$ rocketcdk init

```

  

_See code: [src/commands/init.ts](https://github.com/EdwinRad/rocketcdk/blob/v0.0.16/src/commands/init.ts)_

<!-- commandsstop -->