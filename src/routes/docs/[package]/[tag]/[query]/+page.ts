import { error } from '@sveltejs/kit';
import all, { packages } from '$lib/scripts/packages';
import type { PackageTagLoadData } from '../+page';
import { findDocsElement } from '$lib/scripts/helpers';
import type { PageLoad } from './$types';

export interface PackageQueryLoadData extends Omit<PackageTagLoadData, 'pages'> {
    tag: string;
    selected: number;
}

export const load = (async data => {
    const pkg = data.params.package as (typeof packages)[0];
    const tag = data.params.tag;
    const query = data.params.query;
    const docs = all[pkg];

    if (!docs) throw error(404);

    await docs.resolveTags();
    if (!docs.tags.includes(tag)) throw error(404);

    await docs.resolveDocs(tag);
    if (!docs.data) throw error(404);

    let selected: number|undefined;

    if (query) selected = findDocsElement(docs.data!, query)?.id;
    if (!selected) throw error(404);

    return { package: pkg, tag: docs.currentTag, docs, selected };
}) satisfies PageLoad;