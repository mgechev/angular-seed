import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';
import * as walk from 'walk';
import {APP_DEST, MANIFEST_FILE} from '../../config';

interface Manifest {
  [key: string]: string;
}

class DiffingSWManifest {
  constructor(private basePath: string) {}

  build(files: string[]) {
    var manifest: Manifest = {};
    files.filter((file: string) => !file.endsWith(MANIFEST_FILE))
      .forEach((file) => manifest[file] = this.computeFileHash(file));
    var manifestPath = path.join(this.basePath, MANIFEST_FILE);
    fs.writeFileSync(manifestPath, this.generateManifest(manifest));
  }

  // Compute the hash of the given relative file.
  computeFileHash(file: string) {
    var contents = fs.readFileSync(file);
    return crypto
      .createHash('sha1')
      .update(contents)
      .digest('hex');
  }

  // Compute the hash of the bundle from the names and hashes of all included files.
  computeBundleHash(files: string[], manifest: Manifest) {
    var hash = crypto.createHash('sha1');
    files.forEach((file: string) => hash.update(manifest[file] + ':' + file));
    return hash.digest('hex');
  }

  // Generate the string contents of the manifest.
  generateManifest(manifest: Manifest) {
    var files = Object.keys(manifest).sort();
    var bundleHash = this.computeBundleHash(files, manifest);
    var contents = files
      .map((file) => `# sw.file.hash: ${this.computeFileHash(file)}\n${file.replace(this.basePath, '.')}`)
      .join('\n');
    return `CACHE MANIFEST
# sw.bundle: angular2-seed
# sw.version: ${bundleHash}
${contents}
`;
  }
}

export = () => {
  var files: string[] = [];

  var walker  = walk.walk(APP_DEST, { followLinks: false });

  walker.on('file', function(root: string, stat: any, next: Function) {
    files.push(path.join(root, stat.name));
    next();
  });

  walker.on('end', function() {
    let diffingSWManifest = new DiffingSWManifest(APP_DEST);
    diffingSWManifest.build(files);
  });
};
