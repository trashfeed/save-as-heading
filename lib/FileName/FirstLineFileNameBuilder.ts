import { FileNameBuilder } from "./FileNameBuilder";
export class FirstLineFileNameBuilder extends FileNameBuilder {
	public buildFilename(lines: string[]): string {
		// use firstline
		let filename: string = "";
		for (var index in lines) {
			let line: string = lines[index];
			if (line.length < 1) {
				continue;
			}
			filename = line;
			break;
		}
		return filename;
	}
}
