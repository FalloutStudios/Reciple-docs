import { error, redirect } from '@sveltejs/kit';
import all, { type packages } from '$lib/scripts/packages';
import type { PageServerLoad } from './$types';
import { EnumParser, InterfaceParser, TypeAliasParser } from 'typedoc-json-parser';

export const load = (async data => {
    const pkg = data.params.package as (typeof packages)[0];
    const tag = data.params.tag;
    const docs = all[pkg];
    if (!docs) throw error(404);

    await docs.resolveDocs(tag).catch(() => null);
    if (!docs.data) throw error(404);

    const type = docs.data.search(data.params.type)[0];

    if (type instanceof EnumParser) {
        throw redirect(303, `../enums:${type.name}`);
    } else if (type instanceof InterfaceParser) {
        throw redirect(303, `../interfaces:${type.name}`);
    } else if (type instanceof TypeAliasParser) {
        throw redirect(303, `../typeAlias:${type.name}`);
    }

    throw error(404);
}) satisfies PageServerLoad;