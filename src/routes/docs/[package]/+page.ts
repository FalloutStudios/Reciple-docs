import type { PageLoad } from './$types'

export const load = (data: any) => {
    return {
        slug: data.params.package
    };
};