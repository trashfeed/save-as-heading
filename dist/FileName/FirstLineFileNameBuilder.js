"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileNameBuilder_1 = require("./FileNameBuilder");
class FirstLineFileNameBuilder extends FileNameBuilder_1.FileNameBuilder {
    buildFilename(lines) {
        // use firstline
        let filename = "";
        for (var index in lines) {
            let line = lines[index];
            if (line.length < 1) {
                continue;
            }
            filename = line;
            break;
        }
        return filename;
    }
}
exports.FirstLineFileNameBuilder = FirstLineFileNameBuilder;
//# sourceMappingURL=FirstLineFileNameBuilder.js.map