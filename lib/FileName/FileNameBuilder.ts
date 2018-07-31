import { TextEditor } from "atom";

export abstract class FileNameBuilder {
	private editorText: string = "";
	protected editor: TextEditor;
	protected packageName: string = "";
	constructor(editor: TextEditor, packageName: string) {
		this.packageName = packageName;
		this.editor = editor; 
	}
	private validate(): boolean {
		this.editorText = this.editor.getText().replace(/\r\n?/g, "\n");
		if (this.editorText.length < 1) {
			return false;
		}
		return true;
	}

	public build(): string {

		// validation
		if (!this.validate()) {
			return;
		}

		// lines in editor
		let lines: string[] = this.editorText.split("\n");

		// build filename
		let filename: string = this.buildFilename(lines);

		return filename;

	}

	public abstract buildFilename(lines: string[]): string;
}
