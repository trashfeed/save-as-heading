"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const PathBuilder_1 = require("./PathBuilder");
let subscriptions;
exports.config = {
    extension: {
        title: 'Extention',
        description: 'save default extension',
        type: "string",
        default: ".md"
    },
    filenameType: {
        title: "Filename type",
        type: "boolean",
        default: false,
        enum: [
            { value: false, description: 'First line' },
            { value: true, description: "Headline(#/markdown) use first line" }
        ]
    },
    showSaveNotification: {
        title: "Show save success notification",
        type: "boolean",
        default: true,
    },
};
function activate(state) {
    subscriptions = new atom_1.CompositeDisposable();
    subscriptions.add(atom.commands.add('atom-workspace', 'save-as-heading:save', () => save()));
}
exports.activate = activate;
function deactivate() {
    subscriptions.dispose();
}
exports.deactivate = deactivate;
function save() {
    let builder = new PathBuilder_1.default("save-as-heading");
    builder.save();
}
//# sourceMappingURL=save-as-heading.js.map