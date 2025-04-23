# JSON Formatter CLI

A simple command-line tool for formatting, validating and compressing JSON files.

## Installation

```bash
npm install -g json-formatter-cli
```

Or clone and use locally:
```bash
git clone https://github.com/araminta0/json-formatter-cli.git
cd json-formatter-cli
npm install
```

## Usage

```bash
# Format a JSON file
jsonf input.json

# Format with custom indentation
jsonf input.json -i 4

# Compress JSON (remove whitespace)
jsonf input.json -c

# Save to output file
jsonf input.json -o formatted.json

# Read from stdin
cat data.json | jsonf

# Show help
jsonf --help
```

## Options

- `-c, --compact`: Compress JSON (remove whitespace)
- `-i, --indent <number>`: Set indentation spaces (default: 2)
- `-o, --output <file>`: Save to output file instead of stdout
- `-v, --validate`: Only validate JSON syntax without formatting
- `-s, --sort`: Sort object keys alphabetically
- `-h, --help`: Show help information
- `-V, --version`: Show version

## Examples

Format a JSON file with 4-space indentation:
```bash
jsonf data.json -i 4
```

Compress and save to new file:
```bash
jsonf data.json -c -o compressed.json
```

Validate JSON syntax:
```bash
jsonf data.json -v
```

Sort object keys alphabetically:
```bash
jsonf data.json -s
```