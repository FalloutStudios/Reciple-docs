import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (data => {
    throw redirect(303, `../functions:${data.params.function}`);
}) satisfies PageServerLoad;