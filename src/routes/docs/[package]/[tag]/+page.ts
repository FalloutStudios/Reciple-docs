import { error } from '@sveltejs/kit';
import all, { packages } from '../../../../lib/scripts/packages';
import type { PackageLoadData } from '../+page';

export interface PackageTagLoadData extends PackageLoadData {
    tag: string;
    selected?: number;
}

export const load = async (data: any) => {
    const pkg = data.params.package as (typeof packages)[0];
    const tag = data.params.tag;
    const docs = all[pkg];

    if (!docs) throw error(404);

    await docs.resolveDocs(tag);
    if (!docs.data) throw error(404);

    return { package: pkg, tag: docs.currentTag, docs };
};