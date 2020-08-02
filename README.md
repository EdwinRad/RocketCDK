
# RocketCDK
[![Version](https://img.shields.io/npm/v/rocketcdk.svg)](https://npmjs.org/package/rocketcdk)

[![Downloads/week](https://img.shields.io/npm/dw/rocketcdk.svg)](https://npmjs.org/package/rocketcdk)

[![License](https://img.shields.io/npm/l/rocketcdk.svg)](https://github.com/EdwinRad/rocketcdk/blob/master/package.json)

## Update all your packages and CDK version in one step.
### Works for Typescript and Python
Update to latest:
```sh-session
$ npx rocketcdk up
```
Update to specific version:
```sh-session
$ npx rocketcdk up -v 1.55.0
```

## What it does:

### Typescript
Reads **'package.json'**, filters for the **AWS-CDK** packages and installs them with the specified version.

Also updates these packages locally to minimize the chance of a dependency error:
- @types/jest
- aws-cdk@'version'
- @aws-cdk/assert

Installs no packages globally.

### Python
Python follows the example from the AWS-CDK documentation on how to work with Python modules.
[AWS-CDK docs](https://docs.aws.amazon.com/cdk/latest/guide/work-with-cdk-python.html#python-managemodules)

Steps:
- **$ pip freeze > requirements.txt**
- Reads requirements.txt and filters for **AWS-CDK** packages
- Change the version number on these packages
- And updates with **$ pip install -r requirements.txt -U**


## Contributing
If you have any wishes/tipps, best practices, whatever, just reach out.

You can reach me on Twitter or Github:
[Twitter](https://twitter.com/win_bv)
[Github](https://github.com/EdwinRad/RocketCDK)


# Commands

<!-- commands -->
* [`rocketcdk help [COMMAND]`](#rocketcdk-help-command)
* [`rocketcdk up`](#rocketcdk-up)
* [`rocketcdk update`](#rocketcdk-update)

## `rocketcdk help [COMMAND]`

display help for rocketcdk

```
USAGE
  $ rocketcdk help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `rocketcdk up`

Updates your CDK packages to your favourite version.

```
USAGE
  $ rocketcdk up

OPTIONS
  -v, --version=version  [default: latest] input a version: RocketCDK up -v 1.50.0
```

_See code: [src/commands/up.ts](https://github.com/EdwinRad/rocketcdk/blob/v0.1.2/src/commands/up.ts)_

## `rocketcdk update`

Updates your CDK packages to your favourite version.

```
USAGE
  $ rocketcdk update

OPTIONS
  -v, --version=version  [default: latest] input a version: RocketCDK up -v 1.50.0
```

_See code: [src/commands/update.ts](https://github.com/EdwinRad/rocketcdk/blob/v0.1.2/src/commands/update.ts)_
<!-- commandsstop -->
