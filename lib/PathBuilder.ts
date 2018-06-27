
export default class PathBuilder {

	public path: string;
	private editor: atom.workspace.TextEditor;
	private packageName: string = "";
	private editorText: string = "";
	private headingText: string = "";
	private extension: string = "";

	constructor(packageName: string) {
		this.packageName = packageName;
		this.extension = atom.config.get(this.packageName + '.extension');
		this.editor = atom.workspace.getActiveTextEditor();
		this.build();
	}

	private build(): void {

		// body
		this.editorText = this.editor.getText().replace(/\r\n?/g, "\n");
		if (this.editorText.length < 1) {
			return;
		}

		// heading
		let useMarkdownHeader: boolean = atom.config.get(this.packageName + '.filenameType');
		let lines: string[] = this.editorText.split("\n");
		let heading: string = "";
		for (var key in lines) {
			let line: string = lines[key];
			if (line.length < 1) {
				continue;
			}

			if (useMarkdownHeader) {
				let headLine: string = line.slice(0, 1);
				if (headLine != "#") {
					continue;
				}
				let seek: number = line.indexOf(" ", 1);
				if (seek < 1) {
					continue;
				}
				line = line.substring(seek + 1, line.length);
			}

			this.headingText = line;
			break;
		}

	}

	public save(): void {

		this.buildPath();
		if (this.path.length < 1) {
			return;
		}

		atom.workspace.getActiveTextEditor().saveAs(this.path);
		this.showComplete();

	}

	private showComplete():void{
		let showSuccess: boolean = atom.config.get(this.packageName + '.showSaveNotification');
		if (showSuccess) {
			this.showSuccess(this.path + " saved.");
		}
	}

	private showSuccess(msg: string): void {
		atom.notifications.addSuccess(msg);
	}

	private showWraning(msg: string): void {
		atom.notifications.addWarning(msg);
	}

	private clear(): void {
		this.path = "";
	}

	private buildPath(): void {

		if (this.editor.isEmpty()) {
			return;
		}

		this.clear();
		let filename: string = this.buildFilename();
		if (filename.length == 0) {
			this.showWraning(" Empty filename.");
			return;
		}
		let folderPath: string = this.buildFolderPath();
		this.path = folderPath + filename;
	}

	private buildFolderPath(): string {
		let paths: string[] = atom.project.getPaths();
		if (paths.length < 1) {
			return "";
		}
		let path = paths[0] + "/";
		return path;
	}

	private buildFilename(): string {

		let filename: string = this.headingText;
		if (filename.length < 1) {
			return "";
		}

		// replace space with dash.hypens
		let replaceType: string = atom.config.get(this.packageName + '.filenameReplaceSpaceType');
		if(replaceType !== "none"){
			let targetCharLine : string  = atom.config.get(this.packageName + '.filenameReplaceTarget');
			let targetChars : string = targetCharLine.split("|");
			for(var i=0;i < targetChars.length;i++){
				var regExp = new RegExp( targetChars[i], "g" ) ;
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
		let convetUpperLowerType: string = atom.config.get(this.packageName + '.filenameConvertUpperLower');
		if(convetUpperLowerType === "upper"){
			filename = filename.toUpperCase();
		} else if(convetUpperLowerType === "lower"){
			filename = filename.toLowerCase();
		} else if(convetUpperLowerType === "capitalize"){
			 filename = filename[0].toUpperCase() + filename.substr(1).toLowerCase();
		}

		// full
		filename = filename + this.extension;
		return filename;
	}
}
