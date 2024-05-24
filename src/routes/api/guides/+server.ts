import path from 'path';
import { parseGuideId } from '$lib/scripts/guideHelpers';
import { json } from '@sveltejs/kit';

export type Guides = { category: string; pages: { id: string; category: string; file: string; metadata: Record<string, any> }[]; }[];

let cache: Guides = [];

export async function GET() {
    if (cache.length) return json(cache);

    const entries = Object.entries(import.meta.glob('/src/guides/*/*.svx'));
    const files = await Promise.all(entries.map(async ([file, resolver]) => {
        const basename = parseGuideId(path.basename(file), false);
        const category = path.basename(path.dirname(file));
        const id = parseGuideId(file);

        return {
            id,
            category,
            file: basename,
            metadata: (await resolver() as { metadata: Record<string, any> }).metadata
        }
    }));

    const guides: Guides = [];

    for (const file of files) {
        let category = guides.find(g => g.category === file.category);

        if (!category) {
            category = { category: file.category, pages: [] };
            guides.push(category);
        }

        category.pages.push(file);
    }

    cache = guides;

    return json(guides);
}