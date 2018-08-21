const fs = require('fs');

/**
 * Fixme is there a better way to handdle optional types in tsconfig.json ?
 */
let tsConfigJson = 'src/client/tsconfig.json';  // only copied in the prod image
if (fs.existsSync(tsConfigJson)) {
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigJson));
  tsConfig['compilerOptions']['types'] = tsConfig['compilerOptions']['types'].filter(t => t !== 'jasmine');
  fs.writeFileSync(tsConfigJson, JSON.stringify(tsConfig, null, 2));
}
