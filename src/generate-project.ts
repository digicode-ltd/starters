import chalk from 'chalk';
import { render as ejsRender } from 'ejs';
import * as fs from 'fs';
import * as path from 'path';

interface ITemplateData {
  projectName: string;
}

function render(content: string, data: ITemplateData) {
  return ejsRender(content, data);
}

export interface ICliOptions {
  projectName: string;
  templatePath: string;
  targetPath: string;
}

export function generateProject(options: ICliOptions) {
  if (!createProject(options.targetPath)) {
    return;
  }

  createDirectoryContents(options.templatePath, options.targetPath, {
    projectName: options.projectName,
  });

  console.log('');
  console.log(chalk.green('Done.'));
  console.log(chalk.green(`Go into the project: cd ${options.projectName}`));
}

const SKIP_FILES = ['node_modules', '.template.json'];
const RENDER_FILES = ['js', 'ts', 'tsx', 'jsx', 'md', 'txt', 'json'];

function createProject(projectPath: string) {
  if (fs.existsSync(projectPath)) {
    console.log(
      chalk.red(`Folder ${projectPath} exists. Delete or use another name.`),
    );
    return false;
  }

  fs.mkdirSync(projectPath);
  return true;
}

function createDirectoryContents(
  templatePath: string,
  targetPath: string,
  data: ITemplateData,
) {
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
        } catch (e) {
          console.error(e, origFilePath);
          throw e;
        }
      }
      const writePath = path.join(targetPath, file);
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(targetPath, file));

      // recursive call
      createDirectoryContents(
        path.join(templatePath, file),
        path.join(targetPath, file),
        data,
      );
    }
  });
}
