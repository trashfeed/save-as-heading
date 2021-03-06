"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirstLineFileNameBuilder_1 = require("./FileName/FirstLineFileNameBuilder");
const HeadLineFileNameBuilder_1 = require("./FileName/HeadLineFileNameBuilder");
const MetaDataFileNameBuilder_1 = require("./FileName/MetaDataFileNameBuilder");
class PathBuilder {
    constructor(packageName) {
        this.packageName = "";
        this.editorText = "";
        this.headingText = "";
        this.extension = "";
        this.packageName = packageName;
        this.extension = atom.config.get(this.packageName + '.extension');
        this.editor = atom.workspace.getActiveTextEditor();
        // this.build();
        this.buildFilename();
    }
    buildFilename() {
        // load config:filenameType
        let filenameType = atom.config.get(this.packageName + '.filenameType');
        // builder 
        let filenameBuilder;
        if (filenameType == "Headline") {
            // headline
            filenameBuilder = new HeadLineFileNameBuilder_1.HeadLineFileNameBuilder(this.editor, this.packageName);
        }
        else if (filenameType == "Metadata") {
            // metadata
            filenameBuilder = new MetaDataFileNameBuilder_1.MetaDataFileNameBuilder(this.editor, this.packageName);
        }
        else {
            // firstline
            filenameBuilder = new FirstLineFileNameBuilder_1.FirstLineFileNameBuilder(this.editor, this.packageName);
        }
        // set a filename
        this.headingText = filenameBuilder.build();
    }
    build() {
        // body
        this.editorText = this.editor.getText().replace(/\r\n?/g, "\n");
        if (this.editorText.length < 1) {
            return;
        }
        // heading
        let filenameType = atom.config.get(this.packageName + '.filenameType');
        let lines = this.editorText.split("\n");
        let heading = "";
        for (var key in lines) {
            let line = lines[key];
            if (line.length < 1) {
                continue;
            }
            if (filenameType == "Headline") {
                let headLine = line.slice(0, 1);
                if (headLine != "#") {
                    continue;
                }
                let seek = line.indexOf(" ", 1);
                if (seek < 1) {
                    continue;
                }
                line = line.substring(seek + 1, line.length);
            }
            this.headingText = line;
            break;
        }
    }
    save() {
        this.buildPath();
        if (this.path.length < 1) {
            return;
        }
        atom.workspace.getActiveTextEditor().saveAs(this.path);
        this.showComplete();
    }
    showComplete() {
        let showSuccess = atom.config.get(this.packageName + '.showSaveNotification');
        if (showSuccess) {
            this.showSuccess(this.path + " saved.");
        }
    }
    showSuccess(msg) {
        atom.notifications.addSuccess(msg);
    }
    showWraning(msg) {
        atom.notifications.addWarning(msg);
    }
    clear() {
        this.path = "";
    }
    buildPath() {
        if (this.editor.isEmpty()) {
            return;
        }
        this.clear();
        let filename = this.parseFilename();
        if (filename.length == 0) {
            this.showWraning(" Empty filename.");
            return;
        }
        let folderPath = this.buildFolderPath();
        this.path = (folderPath + filename).replace("//", "/");
    }
    buildFolderPath() {
        let paths = atom.project.getPaths();
        if (paths.length < 1) {
            return "";
        }
        let path = paths[0] + "/";
        return path;
    }
    parseFilename() {
        let filename = this.headingText;
        if (filename.length < 1) {
            return "";
        }
        // replace space with dash.hypens
        let replaceType = atom.config.get(this.packageName + '.filenameReplaceSpaceType');
        if (replaceType !== "none") {
            let targetCharLine = atom.config.get(this.packageName + '.filenameReplaceTarget');
            let targetChars = targetCharLine.split("|");
            for (var i = 0; i < targetChars.length; i++) {
                var regExp = new RegExp(targetChars[i], "g");
                filename = filename.replace(regExp, replaceType);
            }
        }
        // ignore
        let ignores = [":", "\\*", "\\?", "<", ">", "|"];
        for (var i = 0; i < ignores.length; i++) {
            let regExp = new RegExp(ignores[i], "g");
            filename = filename.replace(regExp, "");
        }
        if (filename.length < 1) {
            return "";
        }
        // dir
        filename = filename.replace("\\", "/");
        // upper/lower/capi
        let convetUpperLowerType = atom.config.get(this.packageName + '.filenameConvertUpperLower');
        if (convetUpperLowerType === "upper") {
            filename = filename.toUpperCase();
        }
        else if (convetUpperLowerType === "lower") {
            filename = filename.toLowerCase();
        }
        else if (convetUpperLowerType === "capitalize") {
            filename = filename[0].toUpperCase() + filename.substr(1).toLowerCase();
        }
        // full
        filename = filename + this.extension;
        return filename;
    }
}
exports.default = PathBuilder;
//# sourceMappingURL=PathBuilder.js.map