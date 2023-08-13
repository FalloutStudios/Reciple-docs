import { error } from '@sveltejs/kit';
import all, { packages } from '$lib/scripts/packages';
import type { PackageTagLoadData } from '../../+page';
import type { PageLoad } from './$types';

export interface PackagePagesLoadData extends Omit<PackageTagLoadData, 'page'> {
    page: { category: string; id: string; content: string; };
}

export const load = (async data => {
    const pkg = data.params.package as (typeof packages)[0];
    const tag = data.params.tag;
    const query = data.params.query;
    const docs = all[pkg];

    if (!docs) throw error(404);

    await docs.resolveDocs(tag);
    if (!docs.data) throw error(404);

    const [categoryId, id] = query.split(':');
    if (!categoryId || !id) throw error(404);

    const pages = docs.customPages.get(categoryId);
    if (!pages) throw error(404);

    const page = pages.get(id);
    if (!pages) throw error(404);

    return {
        package: pkg,
        tag: docs.currentTag,
        docs,
        page: {
            category: categoryId,
            id: page!.id,
            content: page!.content ?? ''
        }
    };
}) satisfies PageLoad;