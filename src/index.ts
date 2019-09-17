import { Command, flags } from '@oclif/command';
import chalk from 'chalk';
import * as fs from 'fs';
import { prompt } from 'inquirer';
import * as path from 'path';

import { generateProject, ICliOptions } from './generate-project';

interface IOption {
  title: string;
  description: string;
  value: any;
}

function buildOptions(options: IOption[]): string[] {
  const choices: string[] = []; // strictNullChecks is not working! 😡

  options.forEach((option) => {
    const choice = `${chalk.red.bold(option.title + ':')} ${chalk.bold(option.description)}`;
    choices.push(choice);
  });

  return choices;
}

function findOption(options: IOption[], optionStr: string): IOption | undefined {
  return options.find((option) => {
    const choice = `${chalk.red.bold(option.title + ':')} ${chalk.bold(option.description)}`;
    return choice === optionStr;
  });
}

function validateFolderName(name: string): boolean {
  return /^([A-Za-z\-\_\d])+$/.test(name);
}

class GreetMe extends Command {
  public static description = 'generate project from predefined list of starters';

  public static examples = [`starters`, `starters -p=my-awesome-project -t=node-ts-bare`];

  public static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-t, --template=VALUE)
    template: flags.string({ char: 't', description: 'tamplate name' }),
    // flag with a value (-p, --project=VALUE)
    project: flags.string({ char: 'p', description: 'project name' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  };

  public static args = [{ name: 'file' }];

  public async run() {
    const { flags: flagValues } = this.parse(GreetMe);

    const options: IOption[] = fs
      .readdirSync(path.join(__dirname, '../templates'))
      .map((name) => ({ title: name, description: name, value: name }));

    const choices = [
      {
        type: 'list',
        name: 'temeplate',
        message: 'Choose your starter 🎰',
        when: () => !options.find((o) => o.value === flagValues.template),
        choices: () => buildOptions(options),
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter your project name',
        when: () => !flagValues.project || !validateFolderName(flagValues.project),
        validate: (input: string) => {
          if (validateFolderName(input)) {
            return true;
          } else {
            return 'Project name may only include letters, numbers, underscores and hashes.';
          }
        },
      },
    ];

    const answers = await prompt(choices);
    const optionStr: string = answers.temeplate as any;
    const projectName: string = answers.projectName ? (answers.projectName as any) : flagValues.project;
    let option = findOption(options, optionStr);
    if (!option) {
      option = options.find((o) => o.value === flagValues.template);
    }
    const templateName = option ? option.value : null;
    if (templateName && validateFolderName(projectName)) {
      this.log(chalk.bold(`\nDownloading ${templateName} under ${projectName}...\n`));
      this.log(chalk.bold('\nYour Starter was downloaded successfully ✨'));
      this.log(chalk.bold('Happy coding! 😄'));

      const CURR_DIR = process.cwd();
      const templatePath = path.join(__dirname, '../templates', templateName);
      const targetPath = path.join(CURR_DIR, projectName);

      const generateOptions: ICliOptions = {
        projectName,
        templatePath,
        targetPath,
      };
      return generateProject(generateOptions);
    } else {
      this.warn(chalk.bold('templateName:') + templateName);
      this.warn(chalk.bold('projectName:') + projectName);
      this.log(chalk.red.bold('\n🚨 Error! ') + chalk.bold('The project name should be at least 1 character long!'));
    }
  }
}

export = GreetMe;
