export async function load({ fetch }) {
    const guides = await fetch('/api/guides');

    return { guides: await guides.json() };
}