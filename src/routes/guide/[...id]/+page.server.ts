import { error } from '@sveltejs/kit';
import { readdir, readFile } from 'fs/promises';
import { compile } from 'mdsvex';
import path from 'path';

export const ssr = true;

export async function load(data) {
    const [category, id] = data.params.id.split('/');
    const basename = './src/guides';

    const folders = await readdir(basename);
    const folder = folders.find(f => f === category);
    if (!folder) return error(404);

    const files = await readdir(path.join(basename, folder));
    const file = files.find((f, i) => id ? (parseId(f) === id || f === id)  : i === 0);
    if (!file) return error(404);

    return {
        category: folder,
        id:  path.parse(file).name,
        file: path.join(folder, file),
        content: await compile(await readFile(path.join(basename, folder, file), 'utf-8')),
        pages: await Promise.all(folders.map(async f => ({
            category: f,
            pages: (await readdir(path.join(basename, f))).map(i => parseId(i))
        })))
    };
}

function parseId(file: string): string {
    const name = path.parse(file).name.split('.');
    return (isNaN(parseInt(name[0])) ? name : name.splice(1)).join('.');
}