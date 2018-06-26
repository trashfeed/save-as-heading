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
		description: 'Use filename at `First line` or `Headline(#/markdown)``',
		type: "boolean",
		default: false,
    enum: [
      {value: false, description: 'First line'},
      {value: true, description: "Headline(#/markdown) use first line"},
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
		// enum: [
	  //      {value: '–', description: 'En dashes(–)'},
		// 		 {value: '―', description: 'Em dashes(―)'},
	  //      {value: '-', description: 'Hyphens(-)'},
		// 		 {value: '_', description: 'Underscore(_)'},
		// 		 {value: '', description: 'Erace'},
	  //    ]
	},
	filenameConvertUpperLower: {
		order: 5,
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
		order: 6,
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
