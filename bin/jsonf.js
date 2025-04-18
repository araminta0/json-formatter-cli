#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');

program
  .version('1.0.0')
  .description('JSON formatter and validator CLI tool');

program
  .argument('[file]', 'JSON file to format')
  .option('-c, --compact', 'compress JSON (remove whitespace)')
  .option('-i, --indent <number>', 'indentation spaces (default: 2)', '2')
  .option('-o, --output <file>', 'output file (default: stdout)')
  .option('-v, --validate', 'only validate JSON syntax without formatting')
  .action((file, options) => {
    try {
      let jsonData;
      
      if (file) {
        if (!fs.existsSync(file)) {
          console.error(`Error: File '${file}' not found`);
          process.exit(1);
        }
        jsonData = fs.readFileSync(file, 'utf8');
      } else {
        // Read from stdin
        jsonData = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (chunk) => {
          jsonData += chunk;
        });
        process.stdin.on('end', () => {
          processJson(jsonData, options);
        });
        return;
      }
      
      processJson(jsonData, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

function processJson(jsonData, options) {
  if (!jsonData.trim()) {
    console.error('Error: Empty input');
    process.exit(1);
  }

  try {
    const parsed = JSON.parse(jsonData);
    
    // Validate mode
    if (options.validate) {
      console.log('✅ Valid JSON');
      return;
    }
    
    let result;
    const indent = parseInt(options.indent);
    
    if (isNaN(indent) || indent < 0) {
      console.error('Error: Indent must be a non-negative number');
      process.exit(1);
    }
    
    if (options.compact) {
      result = JSON.stringify(parsed);
    } else {
      result = JSON.stringify(parsed, null, indent);
    }
    
    if (options.output) {
      try {
        fs.writeFileSync(options.output, result);
        console.log(`✅ Formatted JSON saved to ${options.output}`);
      } catch (writeError) {
        console.error(`Error writing to file: ${writeError.message}`);
        process.exit(1);
      }
    } else {
      console.log(result);
    }
  } catch (error) {
    console.error('❌ Invalid JSON syntax:', error.message);
    process.exit(1);
  }
}

program.parse();