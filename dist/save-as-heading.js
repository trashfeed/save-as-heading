"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const PathBuilder_1 = require("./PathBuilder");
let subscriptions;
exports.config = {
    extension: {
        order: 1,
        title: 'Extention',
        description: 'On save, a filename default extension',
        type: "string",
        default: ".md",
    },
    filenameType: {
        order: 2,
        title: "Filename type",
        description: 'Use filename at `First line` or `Headline(#/markdown)``',
        type: "boolean",
        default: false,
        enum: [
            { value: false, description: 'First line' },
            { value: true, description: "Headline(#/markdown) use first line" },
        ]
    },
    filenameReplaceTarget: {
        order: 3,
        title: "Replace from",
        description: "replace in title when save a filename(default:`space`). if use multiple chars, separate them with `|` (ex:_| |-)",
        type: "string",
        default: " ",
    },
    filenameReplaceSpaceType: {
        order: 4,
        title: "Replace to",
        description: "replace [`Replace from`] with [`Replace to`] in filename when saved.",
        type: "string",
        default: "-",
    },
    filenameConvertUpperLower: {
        order: 5,
        title: "Conversion filename",
        description: "convert `Uppercase` `Lowercase` `Capitalize` in filename when saved.",
        type: "string",
        default: "",
        enum: [
            { value: '', description: 'none' },
            { value: 'upper', description: 'Uppercase' },
            { value: 'lower', description: 'Lowercase' },
            { value: 'capitalize', description: 'Capitalize' },
        ]
    },
    showSaveNotification: {
        order: 6,
        title: "Show notification on saved",
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