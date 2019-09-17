"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const ejs_1 = require("ejs");
const fs = require("fs");
const path = require("path");
function render(content, data) {
    return ejs_1.render(content, data);
}
function generateProject(options) {
    if (!createProject(options.targetPath)) {
        return;
    }
    createDirectoryContents(options.templatePath, options.targetPath, {
        projectName: options.projectName,
    });
    console.log('');
    console.log(chalk_1.default.green('Done.'));
    console.log(chalk_1.default.green(`Go into the project: cd ${options.projectName}`));
}
exports.generateProject = generateProject;
const SKIP_FILES = ['node_modules', '.template.json'];
const RENDER_FILES = ['js', 'ts', 'tsx', 'jsx', 'md', 'txt', 'json'];
function createProject(projectPath) {
    if (fs.existsSync(projectPath)) {
        console.log(chalk_1.default.red(`Folder ${projectPath} exists. Delete or use another name.`));
        return false;
    }
    fs.mkdirSync(projectPath);
    return true;
}
function createDirectoryContents(templatePath, targetPath, data) {
    const filesToCreate = fs.readdirSync(templatePath);
    filesToCreate.forEach((file) => {
        const origFilePath = path.join(templatePath, file);
        // get stats about the current file
        const stats = fs.statSync(origFilePath);
        if (SKIP_FILES.indexOf(file) > -1) {
            return;
        }
        if (stats.isFile()) {
            let contents = fs.readFileSync(origFilePath, 'utf8');
            if (RENDER_FILES.indexOf(path.extname(origFilePath)) > -1) {
                try {
                    contents = render(contents, data);
                }
                catch (e) {
                    console.error(e, origFilePath);
                    throw e;
                }
            }
            const writePath = path.join(targetPath, file);
            fs.writeFileSync(writePath, contents, 'utf8');
        }
        else if (stats.isDirectory()) {
            fs.mkdirSync(path.join(targetPath, file));
            // recursive call
            createDirectoryContents(path.join(templatePath, file), path.join(targetPath, file), data);
        }
    });
}
