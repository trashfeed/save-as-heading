"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PathBuilder {
    constructor(packageName) {
        this.packageName = "";
        this.editorText = "";
        this.headingText = "";
        this.extension = "";
        this.packageName = packageName;
        this.extension = atom.config.get(this.packageName + '.extension');
        this.editor = atom.workspace.getActiveTextEditor();
        this.build();
    }
    build() {
        // body
        this.editorText = this.editor.getText().replace(/\r\n?/g, "\n");
        if (this.editorText.length < 1) {
            return;
        }
        // heading
        let useMarkdownHeader = atom.config.get(this.packageName + '.filenameType');
        let lines = this.editorText.split("\n");
        let heading = "";
        for (var key in lines) {
            let line = lines[key];
            if (line.length < 1) {
                continue;
            }
            if (useMarkdownHeader) {
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
        let filename = this.buildFilename();
        if (filename.length == 0) {
            this.showWraning(" Empty filename.");
            return;
        }
        let folderPath = this.buildFolderPath();
        this.path = (folderPath + filename).replace(/\\/g, "/").replace(/\/\//g, "/");
    }
    buildFolderPath() {
        let paths = atom.project.getPaths();
        if (paths.length < 1) {
            return "";
        }
        let path = paths[0] + "/";
        return path;
    }
    buildFilename() {
        let filename = this.headingText;
        if (filename.length < 1) {
            return "";
        }
        // ignore
        let ignores = [":", "\\*", "\\?", "<", ">", "|", " "];
        for (var i = 0; i < ignores.length; i++) {
            let regExp = new RegExp(ignores[i], "g");
            filename = filename.replace(regExp, "");
        }
        if (filename.length < 1) {
            return "";
        }
        // full
        filename = filename + this.extension;
        return filename;
    }
}
exports.default = PathBuilder;
//# sourceMappingURL=PathBuilder.js.map