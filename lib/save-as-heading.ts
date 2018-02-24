import { CompositeDisposable } from "atom";
import PathBuilder from './PathBuilder';
let subscriptions: CompositeDisposable;

export let config = {
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
      {value: false, description: 'First line'},
      {value: true, description: "Headline(#/markdown) use first line"}
    ]
	},
	showSaveNotification: {
		title: "Show save success notification",
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
