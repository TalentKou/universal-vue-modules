/*
 * <!-- prettier-ignore -->
 * File Path: \command.js
 * Project Path: c:\Users\admin\projects\fontend-knowledge-repository\universal-vue-modules
 * -----
 * File Created: Wednesday, 8th September 2021 1:56:00 pm
 * Author: koucaihua (koucaihua@fkhwl.com)
 * -----
 * Last Modified: Wednesday, 8th September 2021 4:46:32 pm
 * Modified By: koucaihua (koucaihua@fkhwl.com>)
 * -----
 * Description: 首先把该js文件放置在和package.json同级的目录下，
 *              然后在package.json的"scripts"字段添加"add": "node command.js"，
 *              最后用npm run add <module-name>添加模块，用npm run add <module-name> <component-name>添加组件到模块
 */

const fs = require('fs');
const moduleName = process.argv[2];
const compoName = process.argv[3];
const dirname = __dirname + '/src/modules/' + moduleName + '/';

//判断modules目录是否存在
let isModulesExist = fs.existsSync(__dirname + '/src/modules/');
if (!isModulesExist) {
	fs.mkdirSync(__dirname + '/src/modules/');
}

if (compoName) {
	//创建组件文件
	makeFile(
		dirname + 'components/',
		compoName + '.vue',
		getTemplateStr(compoName)
	)
		.then(() => {
			return writeCompoInModule();
		})
		.catch((err) => console.error(err));
} else {
	//创建模块路径及文件
	makeDir(dirname)
		.then((dirName) => {
			return makeFile(
				dirName,
				'index.ts',
				'import ' +
					moduleName +
					" from './components/" +
					moduleName +
					".vue';\nexport { " +
					moduleName +
					' };'
			);
		})
		.then((dirName) => {
			return makeDir(dirName + 'components/');
		})
		.then((dirName) => {
			return makeFile(dirName, moduleName + '.vue', getTemplateStr(moduleName));
		})
		.catch((err) => console.error(err));
}

function makeDir(dirName) {
	return new Promise((resolve, reject) => {
		fs.mkdir(dirName, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(dirName);
			}
		});
	});
}

function makeFile(dirName, fileName, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(dirName + fileName, data, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(dirName);
			}
		});
	});
}

function readModuleFile() {
	return new Promise((resolve, reject) => {
		fs.readFile(dirname + 'index.ts', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data.toString());
			}
		});
	});
}

function writeCompoInModule() {
	return readModuleFile().then((data) => {
		data =
			'import ' +
			compoName +
			" from './components/" +
			compoName +
			".vue';\n" +
			data;

		data = data.replace(/export.*{/, (val) => {
			return val + ' ' + compoName + ',';
		});

		return new Promise((resolve, reject) => {
			fs.writeFile(dirname + 'index.ts', data, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve(dirname);
				}
			});
		});
	});
}

function getTemplateStr(templateName) {
	return (
		'<template>\n\
\n\
</template>\n\
\n\
<script lang="ts">\n\
import { Component, Vue } from \'vue-property-decorator\';\n\
\n\
@Component\n\
export default class ' +
		templateName +
		' extends Vue {\n\
\n\
}\n\
</script>\n\
\n\
<style scoped lang="less">\n\
\n\
</style>'
	);
}
