
import * as vscode from 'vscode';


const fonts =[
	'Consolas',
	'Comic Sans MS',
	'Georgia',
	'Impact',
	'Times New Roman',
];

async function setRandomFont() {
	const font = fonts[Math.floor(Math.random() * fonts.length)]; //Выбор случайного шрифта
	await vscode.workspace.getConfiguration('editor').update('fontFamily', font, vscode.ConfigurationTarget.Workspace);
	vscode.window.showInformationMessage(`Установлен шрифт: ${font}`);

}

function randomChannel(): string {
    return (Math.floor(Math.random() * 256)).toString(16);
}

function randomHexColor(): string {
    return `#${randomChannel()}${randomChannel()}${randomChannel()}`;
}


async function setRandomColor() {
	const color = randomHexColor();
	const config = vscode.workspace.getConfiguration('editor');
	const old = config.get<object>('tokenColorCustomizations') ?? {};
	const updated = {...old, comments: color, strings: color, keywords: color, 
		numbers: color, functions: color, variables: color, types: color};
	await config.update('tokenColorCustomizations', updated, vscode.ConfigurationTarget.Workspace);
	vscode.window.showInformationMessage(`Установлен цвет: ${color}`);

}

async function setRandomAll() {
    await setRandomFont();
    await setRandomColor();
}

async function setNextColor() {
	const color = randomHexColor();
	const config = vscode.workspace.getConfiguration('editor');
	const old = config.get<object>('tokenColorCustomizations') ?? {};
	const updated = {...old, comments: color, strings: color, keywords: color, 
		numbers: color, functions: color, variables: color, types: color};
	await config.update('tokenColorCustomizations', updated, vscode.ConfigurationTarget.Workspace);

}

let timer: NodeJS.Timeout | undefined;

function Rainbow() {
    if (timer) {
        clearInterval(timer);
        timer = undefined;
        vscode.window.showInformationMessage('Rainbow выключен');
    } else {
        timer = setInterval(setNextColor, 200);
        vscode.window.showInformationMessage('Rainbow включён');
    }
}


export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('RandomFont.apply', setRandomAll));
	context.subscriptions.push(vscode.commands.registerCommand('RandomColor.apply', setRandomColor));
	context.subscriptions.push(vscode.commands.registerCommand('Rainbow.apply', Rainbow));
	
}

export function deactivate() {}
