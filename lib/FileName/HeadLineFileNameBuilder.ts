import { FileNameBuilder } from "./FileNameBuilder";
export class HeadLineFileNameBuilder extends FileNameBuilder {
	public buildFilename(lines: string[]): string {
		// use headline(markdown)
		let filename: string = "";
		for (var index in lines) {
			let line: string = lines[index];
			if (line.length < 1) {
				continue;
			}
			// find sharp
			let headLine: string = line.slice(0, 1);
			if (headLine != "#") {
				continue;
			}
			// find space
			let seek: number = line.indexOf(" ", 1);
			if (seek < 1) {
				continue;
			}

			filename = line.substring(seek + 1, line.length);
			break;
		}
		return filename;
	}
}
