import csvToJson from 'convert-csv-to-json';

const input = './crime.csv';
const output = './crime.json';

csvToJson.fieldDelimiter(',').formatValueByType().generateJsonFileFromCsv(input, output);