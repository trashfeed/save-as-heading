"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileNameBuilder_1 = require("./FileNameBuilder");
class MetaDataFileNameBuilder extends FileNameBuilder_1.FileNameBuilder {
    buildFilename(lines) {
        // parse key-values
        let filename = "";
        let keyValues = this.parseKeyValues(lines);
        if (Object.keys(keyValues).length < 1) {
            return filename;
        }
        // convert Metadata to filename
        filename = this.convertMetadataToFilename(keyValues);
        return filename;
    }
    convertMetadataToFilename(keyValues) {
        let filename;
        let filenameKeyInMetadata = atom.config.get(this.packageName + '.filenameKeyInMetadata');
        filename = filenameKeyInMetadata;
        for (let key in keyValues) {
            let value = keyValues[key];
            let replaceKey = "%" + key + "%";
            filename = filename.replace(replaceKey, value);
        }
        return filename;
    }
    parseKeyValues(lines) {
        let keyValues = {};
        for (var index in lines) {
            let line = lines[index];
            let keyPairs = line.split(":");
            if (keyPairs.length === 2) {
                let k = keyPairs[0].trim();
                let v = keyPairs[1].trim();
                keyValues[k] = v;
            }
            if (this.isLineEnd(line, keyValues)) {
                break;
            }
        }
        return keyValues;
    }
    isLineEnd(line, keyValues) {
        if (Object.keys(keyValues).length === 0) {
            return false;
        }
        if (line.length === 0 || line === "---") {
            return true;
        }
        return false;
    }
}
exports.MetaDataFileNameBuilder = MetaDataFileNameBuilder;
//# sourceMappingURL=MetaDataFileNameBuilder.js.map