import path from 'path';
import { parseGuideId } from '$lib/scripts/guideHelpers';
import { json } from '@sveltejs/kit';

export type Guides = { category: string; pages: { id: string; category: string; metadata: Record<string, any> }[]; }[];

export async function GET() {
    const entries = Object.entries(import.meta.glob('/src/guides/*/*.svx'));
    const files = await Promise.all(entries.map(async ([file, resolver]) => {
        return {
            id: parseGuideId(path.basename(file)),
            category: path.basename(path.dirname(file)),
            metadata: (await resolver() as { metadata: Record<string, any> }).metadata
        }
    }));

    const guides: Guides = [];

    for (const file of files) {
        let category = guides.find(g => g.category === file.category);

        if (!category) {
            category = { category: file.category, pages: [] }
            guides.push(category);
        }

        category.pages.push(file);
    }

    return json(guides);
}