import { CompositeDisposable } from "atom";
import PathBuilder from './PathBuilder';
let subscriptions: CompositeDisposable;

export let config = {
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
		description: 'Use filename at `First line` or `Headline(#/markdown)` or `Metadata` ',
		type: "string",
		default: "Firstline",
    enum: [
      {value: "Firstline", description: 'First line'},
      {value: "Headline", description: "Headline(#/markdown) use first line"},
      {value: "Metadata", description: 'Metadata'},
    ]
	},
	filenameKeyInMetadata: {
		order: 3,
		title: "Key in Metadata",
		description: "use Key when Filename type at `Metadata` ",
		type: "string",
		default: "%title%",
	},
	filenameReplaceTarget: {
		order: 4,
		title: "Replace from",
		description: "replace in title when save a filename(default:`space`). if use multiple chars, separate them with `|` (ex:_| |-)",
		type: "string",
		default: " ",
	},
	filenameReplaceSpaceType: {
		order: 5,
		title: "Replace to",
		description: "replace [`Replace from`] with [`Replace to`] in filename when saved.",
		type: "string",
		default: "-",
	},
	filenameConvertUpperLower: {
		order: 6,
		title: "Conversion filename",
		description: "convert `Uppercase` `Lowercase` `Capitalize` in filename when saved.",
		type: "string",
		default: "",
		enum: [
	       {value: '', description: 'none'},
				 {value: 'upper', description: 'Uppercase'},
	       {value: 'lower', description: 'Lowercase'},
				 {value: 'capitalize', description: 'Capitalize'},
	     ]
	},
	showSaveNotification: {
		order: 7,
		title: "Show notification on saved",
		type: "boolean",
		default: true,
	},
}

export function activate(state: any) {
	subscriptions = new CompositeDisposable();
	subscriptions.add(atom.commands.add('atom-workspace',
		'save-as-heading:save', () => save()
	));
}

export function deactivate() {
	subscriptions.dispose();
}

function save() {
	let builder: PathBuilder = new PathBuilder("save-as-heading");
	builder.save();
}
