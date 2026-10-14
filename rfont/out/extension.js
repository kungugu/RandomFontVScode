"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fonts = [
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
function randomChannel() {
    return (Math.floor(Math.random() * 256)).toString(16);
}
function randomHexColor() {
    return `#${randomChannel()}${randomChannel()}${randomChannel()}`;
}
async function setRandomColor() {
    const color = randomHexColor();
    const config = vscode.workspace.getConfiguration('editor');
    const old = config.get('tokenColorCustomizations') ?? {};
    const updated = { ...old, comments: color, strings: color, keywords: color,
        numbers: color, functions: color, variables: color, types: color };
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
    const old = config.get('tokenColorCustomizations') ?? {};
    const updated = { ...old, comments: color, strings: color, keywords: color,
        numbers: color, functions: color, variables: color, types: color };
    await config.update('tokenColorCustomizations', updated, vscode.ConfigurationTarget.Workspace);
}
let timer;
function Rainbow() {
    if (timer) {
        clearInterval(timer);
        timer = undefined;
        vscode.window.showInformationMessage('Rainbow выключен');
    }
    else {
        timer = setInterval(setNextColor, 200);
        vscode.window.showInformationMessage('Rainbow включён');
    }
}
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('RandomFont.apply', setRandomAll));
    context.subscriptions.push(vscode.commands.registerCommand('RandomColor.apply', setRandomColor));
    context.subscriptions.push(vscode.commands.registerCommand('Rainbow.apply', Rainbow));
}
function deactivate() { }
//# sourceMappingURL=extension.js.map