import { error } from '@sveltejs/kit';
import all, { packages } from '$lib/scripts/packages';
import type { DocsParser } from '$lib/scripts/classes/DocsParser';
import type { PageLoad } from './$types';

export interface PackageLoadData {
    package: (typeof packages)[0];
    docs: DocsParser;
    goto?: string;
    tags: string[];
}

export const load = (async (data) => {
    const pkg = data.params.package as (typeof packages)[0];
    const docs = all[pkg];

    if (!docs) throw error(404);

    const goto = data.url.searchParams.get('goto') ?? undefined;

    const tags = await docs.resolveTags();

    return { package: pkg, docs, goto, tags };
}) satisfies PageLoad;