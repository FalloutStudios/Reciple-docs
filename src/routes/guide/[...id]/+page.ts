import { error } from '@sveltejs/kit';
import type { Guides } from '../../api/guides/+server.js';

export async function load(data) {
    let [category, id] = data.params.id.split('/') as (string|undefined)[];

    if (!category || !id) {
        const guides = await (await data.fetch('/api/guides')).json() as Guides;

        category ??= guides[0].category;
        id ??= guides.find(c => c.category === category)?.pages[0].id;
    }

    if (!category || !id) return error(404);

    const markdown = await import(`../../../guides/${category}/${id}.svx`);

    return {
        category,
        id,
        file: category + '/' + id + '.svx',
        metadata: markdown.metadata ?? { title: id },
        content: markdown.default
    };
}