import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import config from '../postcss.config.lite';

// Parse command line arguments: bun script.ts input.css -o output.css
const args = process.argv.slice(2);
const inputIndex = args.findIndex((arg) => !arg.startsWith('-'));
const outputIndex = args.indexOf('-o');
const inputFile = inputIndex >= 0 ? path.resolve(args[inputIndex]) : path.join(__dirname, '../src/styles/index.css');
const outputFile =
  outputIndex >= 0 && args[outputIndex + 1]
    ? path.resolve(args[outputIndex + 1])
    : path.join(__dirname, '../styles.lite.css');

const css = fs.readFileSync(inputFile, 'utf8');

postcss(config.plugins)
  .process(css, { from: inputFile, to: outputFile })
  .then((result) => {
    fs.writeFileSync(outputFile, result.css);
    if (result.map) {
      fs.writeFileSync(outputFile + '.map', result.map.toString());
    }
  })
  .catch((error) => {
    console.error('Error building lite CSS:', error);
    process.exit(1);
  });
