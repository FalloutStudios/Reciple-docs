import { redirect } from '@sveltejs/kit';
import type { Guides } from '../api/guides/+server.js';

export async function load({ fetch }) {
    const guides = await (await fetch('/api/guides')).json() as Guides;

    return redirect(303, `/guide/${guides[0].category}/${guides[0].pages[0].id}`);
}