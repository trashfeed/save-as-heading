"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileNameBuilder_1 = require("./FileNameBuilder");
class HeadLineFileNameBuilder extends FileNameBuilder_1.FileNameBuilder {
    buildFilename(lines) {
        // use headline(markdown)
        let filename = "";
        for (var index in lines) {
            let line = lines[index];
            if (line.length < 1) {
                continue;
            }
            // find sharp
            let headLine = line.slice(0, 1);
            if (headLine != "#") {
                continue;
            }
            // find space
            let seek = line.indexOf(" ", 1);
            if (seek < 1) {
                continue;
            }
            filename = line.substring(seek + 1, line.length);
            break;
        }
        return filename;
    }
}
exports.HeadLineFileNameBuilder = HeadLineFileNameBuilder;
//# sourceMappingURL=HeadLineFileNameBuilder.js.map