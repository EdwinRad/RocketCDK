import { Command, flags } from '@oclif/command'
import * as fs from 'fs'
import * as _ from "lodash";
import { exec } from 'child_process'
import * as inquirer from 'inquirer'
import * as chalk from 'chalk'


export default class Update extends Command {
  static description = 'Update your AWS-CDK version and your CDK-packages versions.'

  async run() {
    console.log(chalk.cyan('\nUpdates your CDK packages in package.json to your favourite version.\n '))

    inquirer
      .prompt([
        {
          name: 'version',
          message: 'Type a CDK version that you want your CDK packages + version to be updated' + chalk.cyan(' (eg: 1.50.0)') + ', (latest default):',
          type: 'input',
          default: 'latest'
        },
      ])
      .then(answers => {
        var packages1: any = []
        fs.readFile('package.json', (err, data: any) => {
          if (err) throw err;
          let packages = JSON.parse(data);
          let pack = packages.dependencies
          for (var key in pack) {
            packages1.push(key);
          }
          filtercdkpackages(packages1)
        });
        function filtercdkpackages(packages1: any) {
          const filterBy = (str: string) => packages1.filter(
            (item: string) => new RegExp('^' + str.replace(/\*/g, '.*') + '$').test(item)
          );
          var installpackages1: any = []
          var filtered = filterBy('@aws-cdk*')
          function installpackages() {
            for (var i of filtered) {
              installpackages1.push(i + '@' + answers.version);
            }
          }
          installpackages()
          var installpackages2 = installpackages1.join(" ")
          exec('npm install aws-cdk@' + answers.version + ' @aws-cdk/assert@' + answers.version, function (error, stdout, stderr) {
            if (error) {
              throw new Error(error.message);
            }
            console.log(stdout);
            exec('npm install ' + installpackages2, function (error, stdout, stderr) {
              if (error) {
                throw new Error(error.message);
              }
              console.log(stdout);
              console.log(stderr);
            }
            )
          }
          );

        };
      });
  }
}
