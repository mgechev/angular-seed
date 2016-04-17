import {DEV_DEST} from '../../config';
import {clean} from '../../utils';
import {readdirSync} from 'fs';
import {join} from 'path';

export = clean(getSubPaths(DEV_DEST))

function getSubPaths(path: string) {
    let files = readdirSync(path);
    return files.map((file:string) => join(path, file));
}
