import { error } from '@sveltejs/kit';
import all, { packages } from '../../../lib/scripts/packages';
import type { DocsParser } from '../../../lib/scripts/classes/DocsParser';

export interface PackageLoadData {
    package: (typeof packages)[0];
    docs: DocsParser;
}

export const load = (data: any) => {
    const pkg = data.params.package as (typeof packages)[0];
    const docs = all[pkg];

    if (!docs) throw error(404);

    return { package: pkg, docs };
};