import { FileNameBuilder } from "./FileNameBuilder";
export class MetaDataFileNameBuilder extends FileNameBuilder {
	public buildFilename(lines: string[]): string {

		// parse key-values
		let filename: string = "";
		let keyValues: { [key: string]: string; } = this.parseKeyValues(lines);
		if (Object.keys(keyValues).length < 1) {
			return filename;
		}

		// convert Metadata to filename
		filename = this.convertMetadataToFilename(keyValues);
		return filename;
	}

	private convertMetadataToFilename(keyValues: { [key: string]: string; }): string {

		let filename: string;
		let filenameKeyInMetadata: string = atom.config.get(this.packageName + '.filenameKeyInMetadata');
		filename = filenameKeyInMetadata;
		for (let key in keyValues) {
			let value: string = keyValues[key];
			let replaceKey = "%" + key + "%";
			filename = filename.replace(replaceKey, value);
		}
		return filename;
	}

	private parseKeyValues(lines: string[]): { [key: string]: string } {

		let keyValues: { [key: string]: string; } = {};

		for (var index in lines) {
			let line: string = lines[index];
			let keyPairs: string[] = line.split(":");
			if (keyPairs.length === 2) {
				let k: string = keyPairs[0].trim();
				let v: string = keyPairs[1].trim();
				keyValues[k] = v;
			}
			if (this.isLineEnd(line, keyValues)) {
				break;
			}
		}
		return keyValues;
	}

	private isLineEnd(line: string, keyValues: { [key: string]: string; }): boolean {

		if (Object.keys(keyValues).length === 0) {
			return false;
		}

		if (line.length === 0 || line === "---") {
			return true;
		}

		return false;
	}
}
