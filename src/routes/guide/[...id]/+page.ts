export async function load(data) {
    const [category, id] = data.params.id.split('/');

    const markdown = await import(`../../../guides/${category}/${id}.svx`);

    return {
        category,
        id,
        file: category + '/' + id + '.svx',
        metadata: markdown.metadata ?? { title: id },
        content: markdown.default
    };
}