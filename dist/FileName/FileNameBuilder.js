"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileNameBuilder {
    constructor(editor, packageName) {
        this.editorText = "";
        this.packageName = "";
        this.packageName = packageName;
        this.editor = editor;
    }
    validate() {
        this.editorText = this.editor.getText().replace(/\r\n?/g, "\n");
        if (this.editorText.length < 1) {
            return false;
        }
        return true;
    }
    build() {
        // validation
        if (!this.validate()) {
            return;
        }
        // lines in editor
        let lines = this.editorText.split("\n");
        // build filename
        let filename = this.buildFilename(lines);
        return filename;
    }
}
exports.FileNameBuilder = FileNameBuilder;
//# sourceMappingURL=FileNameBuilder.js.map