import path from 'path';
import { parseGuideId } from '$lib/scripts/guideHelpers';
import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { slug } from 'github-slugger';

export type Guides = { category: string; folder: string; id: string; pages: { id: string; category: string; folder: string; file: string; metadata: Record<string, any> }[]; }[];

let cache: Guides = [];

export async function GET() {
    if (cache.length && !dev) return json(cache);

    const entries = Object.entries(import.meta.glob('/src/guides/*/*.svx'));
    const files = await Promise.all(entries.map(async ([file, resolver]) => {
        const basename = parseGuideId(path.basename(file), { removeInt: false });
        const folder = path.basename(path.dirname(file));
        const category = parseGuideId(folder, { parse: false, removeInt: true });
        const id = parseGuideId(file);

        return {
            id,
            category,
            folder: folder,
            file: basename,
            metadata: (await resolver() as { metadata: Record<string, any> }).metadata
        }
    }));

    const guides: Guides = [];

    for (const file of files) {
        let category = guides.find(g => g.category === file.category);

        if (!category) {
            category = {
                category: file.category,
                folder: file.folder,
                id: slug(file.category),
                pages: []
            };
            guides.push(category);
        }

        category.pages.push(file);
    }

    cache = guides;

    console.log(guides);

    return json(guides);
}