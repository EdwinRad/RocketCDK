import { Command } from '@oclif/command'
import cli from 'cli-ux'
import { exec } from 'child_process'
import * as inquirer from 'inquirer'
import * as fuzzy from 'fuzzy'
import * as path from 'path'
import * as chalk from 'chalk'

inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));
var prepend = require('prepend');
var packages = ['s3', 'ec2', 'dynamodb', 'iam', 'lambda', 'accessanalyzer', 'accessanalyzer', 'amazonmq', 'amplify', 'apigateway', 'apigatewayv2', 'appconfig', 'applicationautoscaling', 'appmesh', 'appstream', 'appsync', 'athena', 'autoscaling', 'autoscaling-common', 'autoscaling-hooktargets', 'autoscalingplans', 'backup', 'batch', 'budgets', 'cassandra', 'ce', 'certificatemanager', 'chatbot', 'cloud9', 'cloudformation', 'cloudfront', 'cloudtrail', 'cloudwatch', 'cloudwatch-actions', 'codebuild', 'codecommit', 'codedeploy', 'codeguruprofiler', 'codepipeline', 'codepipeline-actions', 'codestar', 'codestarconnections', 'codestarnotifications', 'cognito', 'config', 'datapipeline', 'dax', 'detective', 'directoryservice', 'dlm', 'dms', 'docdb', 'dynamodb-global', 'ecr', 'ecr-assets', 'ecs', 'ecs-patterns', 'efs', 'eks', 'eks-legacy', 'elasticache', 'elasticbeanstalk', 'elasticloadbalancing', 'elasticloadbalancingv2', 'elasticloadbalancingv2-actions', 'elasticloadbalancingv2-targets', 'elasticsearch', 'emr', 'events', 'events-targets', 'eventschemas', 'fms', 'fsx', 'gamelift', 'globalaccelerator', 'glue', 'greengrass', 'guardduty', 'imagebuilder', 'inspector', 'iot', 'iot1click', 'iotanalytics', 'iotevents', 'iotthingsgraph', 'kinesis', 'kinesisanalytics', 'kinesisfirehose', 'kms', 'lakeformation', 'lambda-destinations', 'lambda-event-sources', 'lambda-nodejs', 'logs', 'logs-destinations', 'macie', 'managedblockchain', 'mediaconvert', 'medialive', 'mediastore', 'msk', 'neptune', 'networkmanager', 'opsworks', 'opsworkscm', 'pinpoint', 'pinpointemail', 'qldb', 'ram', 'rds', 'redshift', 'resourcegroups', 'robomaker', 'route53', 'route53-patterns', 'route53-targets', 'route53resolver', 's3-assets', 's3-deployment', 's3-notifications', 'sagemaker', 'sam', 'sdb', 'secretsmanager', 'securityhub', 'servicecatalog', 'servicediscovery', 'ses', 'ses-actions', 'sns', 'sns-subscriptions', 'sqs', 'ssm', 'stepfunctions', 'stepfunctions-tasks', 'synthetics', 'transfer', 'waf', 'wafregional', 'wafv2', 'workspaces',];

export default class Init extends Command {
  static description = 'Initializes your CDK-project, installs CDK-packages and imports them into your Stack.ts file.'
  //Questions
  async run() {
    console.log('\nWelcome to' + chalk.red.bold(' RocketCDK!') + '\n\nInitialize your CDK-project, install CDK-packages and autoimport them into your Stack.ts file.\n')
    inquirer
      .prompt([
        {
          name: 'language',
          message: 'Select a' + chalk.cyan(' language:'),
          type: 'list',
          choices: [{ name: 'typescript' }],
        },
        {
          name: 'version',
          message: 'Type a CDK version' + chalk.cyan(' (eg: 1.45.0)') + ', (latest default):',
          type: 'input',
        },
        {
          type: 'checkbox-plus',
          name: 'packages',
          message: 'Press ' + chalk.cyan('Space') + ' to select packages, type to search and' + chalk.cyan(' Enter ') + 'to install:',
          pageSize: 7,
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
        else {
          answers.version = "@" + answers.version
        }
        let packages = answers.packages;
        var packages1: any = []
        var importpack: any = []

        function installpackages() {
          for (var i of packages) {
            packages1.push("@aws-cdk/aws-" + i + answers.version);
          }
        }

        function importpackages() {
          for (var i of packages) {
            var b = i.replace('-', '').replace('-', '');
            importpack.push("\nimport * as " + b + " from '@aws-cdk/aws-" + i + "'");
          }
        }
        installpackages()
        importpackages()
        var packages2 = packages1.join(" ")
        var importpack2 = importpack.join(" ")
        cli.action.start('Initializing your CDK project in ' + answers.language)
        exec('cdk init -l ' + answers.language, function (error, stdout, stderr) {
          if (error) {
            throw new Error(error.message);
          }
          console.log(stdout);
          console.log(stderr);
          cli.action.stop()
          cli.action.start('Installing CDK packages')
          exec('npm install aws-cdk' + answers.version + ' @aws-cdk/core' + answers.version + ' @aws-cdk/assert' + answers.version, function (error, stdout, stderr) {
            if (error) {
              throw new Error(error.message);
            }
            console.log(stdout);
            console.log(stderr);
            exec('npm install ' + packages2, function (error, stdout, stderr) {
              if (error) {
                throw new Error(error.message);
              }
              // console.log(stdout);
              // console.log(stderr);
              cli.action.stop('Installed these packages:' + stdout)
            })
            var folder = path.basename(path.resolve(process.cwd()))
            prepend('./lib/' + folder + '-stack.ts', importpack2, function (err: any) {
              if (err) return console.log(err);
            });
          });
        })
      });
  }
}
