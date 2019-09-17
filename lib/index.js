"use strict";
const command_1 = require("@oclif/command");
const chalk_1 = require("chalk");
const fs = require("fs");
const inquirer_1 = require("inquirer");
const path = require("path");
const generate_project_1 = require("./generate-project");
function buildOptions(options) {
    const choices = []; // strictNullChecks is not working! 😡
    options.forEach((option) => {
        const choice = `${chalk_1.default.red.bold(option.title + ':')} ${chalk_1.default.bold(option.description)}`;
        choices.push(choice);
    });
    return choices;
}
function findOption(options, optionStr) {
    return options.find((option) => {
        const choice = `${chalk_1.default.red.bold(option.title + ':')} ${chalk_1.default.bold(option.description)}`;
        return choice === optionStr;
    });
}
function validateFolderName(name) {
    return /^([A-Za-z\-\_\d])+$/.test(name);
}
class GreetMe extends command_1.Command {
    async run() {
        const { flags: flagValues } = this.parse(GreetMe);
        const options = fs
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
                validate: (input) => {
                    if (validateFolderName(input)) {
                        return true;
                    }
                    else {
                        return 'Project name may only include letters, numbers, underscores and hashes.';
                    }
                },
            },
        ];
        const answers = await inquirer_1.prompt(choices);
        const optionStr = answers.temeplate;
        const projectName = answers.projectName ? answers.projectName : flagValues.project;
        let option = findOption(options, optionStr);
        if (!option) {
            option = options.find((o) => o.value === flagValues.template);
        }
        const templateName = option ? option.value : null;
        if (templateName && validateFolderName(projectName)) {
            this.log(chalk_1.default.bold(`\nDownloading ${templateName} under ${projectName}...\n`));
            this.log(chalk_1.default.bold('\nYour Starter was downloaded successfully ✨'));
            this.log(chalk_1.default.bold('Happy coding! 😄'));
            const CURR_DIR = process.cwd();
            const templatePath = path.join(__dirname, '../templates', templateName);
            const targetPath = path.join(CURR_DIR, projectName);
            const generateOptions = {
                projectName,
                templatePath,
                targetPath,
            };
            return generate_project_1.generateProject(generateOptions);
        }
        else {
            this.warn(chalk_1.default.bold('templateName:') + templateName);
            this.warn(chalk_1.default.bold('projectName:') + projectName);
            this.log(chalk_1.default.red.bold('\n🚨 Error! ') + chalk_1.default.bold('The project name should be at least 1 character long!'));
        }
    }
}
GreetMe.description = 'generate project from predefined list of starters';
GreetMe.examples = [`starters`, `starters -p=my-awesome-project -t=node-ts-bare`];
GreetMe.flags = {
    // add --version flag to show CLI version
    version: command_1.flags.version({ char: 'v' }),
    help: command_1.flags.help({ char: 'h' }),
    // flag with a value (-t, --template=VALUE)
    template: command_1.flags.string({ char: 't', description: 'tamplate name' }),
    // flag with a value (-p, --project=VALUE)
    project: command_1.flags.string({ char: 'p', description: 'project name' }),
    // flag with no value (-f, --force)
    force: command_1.flags.boolean({ char: 'f' }),
};
GreetMe.args = [{ name: 'file' }];
module.exports = GreetMe;
