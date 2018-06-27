# save-as-heading
`save-as-heading` is use the first line as the file name to quickly create or overwrite the file.

## Installation

Atom Package: https://atom.io/packages/save-as-heading

```bash
apm install save-as-heading
```

## Feature
- this package is use filename at first line to override or create file.
- or, this package is  use file name of heading line (e.g. #) of markdown, override or create file.
- Using markdown and txt, can quickly create a document for each file.

## Usage
### Example1
1. input the following text.
``` txt
title
foo bar fuga.
...
...
```
2. `ctrl` + `shift` + `h`
3. A file name `title.md` is created or overrided.
> to change `.md` to `Setting` - `Extension`

### Example2
1. input the following text.
```txt
/directory/directory/title
foo bar fuga.
...
...
```
2. `ctrl` + `shift` + `h`
3. A file path `/directory/directory/title.md` is created or overrided. a root of the path is the project folder.


### Example3
1. input the following text.
``` markdown
...
title
# head1
foo bar fuga.
...
...
```
2. `ctrl` + `shift` + `h`
3. A file name `head1.md` is created or overrided.
> to change to `Setting` - `Filename type`


## Options
- `Extension`
  - save a file name of extension.
  - default `.md`.
- `Filename type`
  - use filename at first line or heading line (e.g. #) of markdown.
  - default `first line`.
- `Show save success notification`
  - show/hide notification when saved file.
- `Replace from` / `Replace to`
  - `Replace from`
    - replace in title when save a filename(default:`space`). if use multiple chars, separate them with `|` (ex:_| |-)
  - `Replace to`
    - replace [`Replace from`] with [`Replace to`] in filename when saved.   
  - example 1
    - `Replace from` = ` (spaces)` , `Replace to` = `-`
      ```txt
      /directory/first line code
      ```
      saved file path in `/directory/first-line-code.md`
  - example 2
    - `Replace from` = ` (spaces)|,` , `Replace to` = `-`
      ```txt
      /directory/first line code,to file name
      ```
      saved file path in `/directory/first-line-code-to-file-name.md`
- `Conversion filename`
  - convert `Uppercase` `Lowercase` `Capitalize` in filename when saved.
  - example
    - `Conversion filename` = `Capitalize`
      ```txt
      /directory/first-line-ccode
      ```
      saved file path in `/directory/First-line-code.md`

## Licence
[MIT](https://raw.githubusercontent.com/trashfeed/save-as-heading/master/LICENSE.md)

## Author
[trashfeed](https://github.com/trashfeed)
