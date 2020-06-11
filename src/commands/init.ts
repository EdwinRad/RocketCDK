import { Command } from '@oclif/command'
import cli from 'cli-ux'
import { exec } from 'child_process'
import * as inquirer from 'inquirer'
import * as fuzzy from 'fuzzy'
import * as path from 'path'
import * as chalk from 'chalk'




inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));
var prepend = require('prepend');
var figlet = require('figlet');
var packages = ['iam', 's3', 'lambda', 'elasticloadbalancing', 'elasticloadbalancingv2', 'ec2', 'cloudwatch', 'amplify', 'appconfig'];

export default class Init extends Command {
  static description = 'Initializes your CDK-app, installs CDK-packages and imports them into your Stack.ts file.'
//Questions
  async run() {
    console.log('\nWelcome to' + chalk.red.bold(' RocketCDK!') +'\n\nInitialize your CDK-app, install CDK-packages and autoimport them into your Stack.ts file.\n')
    inquirer
      .prompt([
        {
          name: 'language',
          message: 'Select a' + chalk.cyan(' language:') ,
          type: 'list',
          choices: [{ name: 'typescript' }],
        },
        {
          name: 'version',
          message: 'Type a CDK version'+ chalk.cyan(' (eg: 1.45.0)')+', (latest default):',
          type: 'input',
        },
        {
          type: 'checkbox-plus',
          name: 'packages',
          message: 'Press ' + chalk.cyan('Space') + ' to select packages, type to search and' + chalk.cyan(' Enter ') + 'to install:',
          pageSize: 5,
          highlight: true,
          searchable: true,
          source: function (answersSoFar: any, input: any) {
            input = input || '';
            return new Promise(function (resolve) {
              var fuzzyResult = fuzzy.filter(input, packages);
              var data = fuzzyResult.map(function (element) {
                return element.original;
              });
              resolve(data);
            });
          }
        }
      ])
//Answers
      .then(answers => {
        if (answers.version === "") {
        }
        else{
          answers.version = "@" + answers.version
        }
        let packages = answers.packages;
        var packages1: any = []
        var importpack:any = []

        function installpackages() {
          for (var i of packages) {
            packages1.push("@aws-cdk/aws-" + i + answers.version);
          }
        }
        
        function importpackages() {
          for (var i of packages) {
            importpack.push("\nimport * as " + i + " from '@aws-cdk/aws-" + i + "'");
          }
        }
        installpackages()
        importpackages()
        var packages2 = packages1.join(" ")
        var importpack2 = importpack.join(" ")
        cli.action.start('Initializing your CDK project in ' + answers.language)
        exec('cdk init -l ' + answers.language, function (error, stdout, stderr) {
          if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
          }
          console.log(stdout);
          console.log(stderr);
          cli.action.stop()
          cli.action.start('Installing aws-cdk packages')
          exec('npm install aws-cdk' + answers.version + ' @aws-cdk/core' + answers.version + ' @aws-cdk/assert' + answers.version , function (error, stdout, stderr) {
            if (error) {
              console.log(error.stack);
              console.log('Error code: ' + error.code);
              console.log('Signal received: ' + error.signal);
            }
            console.log(stdout);
            console.log(stderr);
            exec('npm install ' + packages2, function (error, stdout, stderr) {
              if (error) {
                console.log(error.stack);
                console.log('Error code: ' + error.code);
                console.log('Signal received: ' + error.signal);
              }
              // console.log(stdout);
              // console.log(stderr);
              cli.action.stop('Installed these packages:' + stdout)
            }
            )
            var folder = path.basename(path.resolve(process.cwd()))
            prepend('./lib/' + folder + '-stack.ts', importpack2, function (err:any) {
              if (err) return console.log(err);
            });
          });
        })
      });
  }
}
