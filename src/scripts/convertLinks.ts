import type { DocsData } from '../data/DocsData';

export function convertLinks(text: string, docs: DocsData) {
	const regex = /\{@link\s+(.+?)(?:\s+(.+?))?\s*\}/gmi;
	const matches = text.match(regex) || [];

    for (const link of matches) {
        const [jsdoc, key] = regex.exec(link) ?? [];
        if(!key) continue;

        const type = docs.findType(key);
        const dataType = type?.type === 'class' ? 'classes' : type?.type === 'function' ? 'functions' : 'typedefs';

        text = text.replaceAll(link, type ? `<a href="/docs/${docs.options.package}/${docs.currentTag}/${dataType}/${type.name}">${type.name}</a>` : `<a href="${key}">${key}</a>`)
    }

    for (const word of new Set(text.split(/(\s+)|\./gim).filter(e => e))) {
        const split = word.split(':').map(e => e.replace('(', '').replace(')', ''));
        if (!word.startsWith('(') || !word.endsWith(')') || split.length > 2 || split.length < 2) continue;

        let [name, dataType_] = split;

        const type = docs.findType(name);
        if (!type) continue;

        const dataType = type?.type === 'class' ? 'classes' : type?.type === 'function' ? 'functions' : 'typedefs';
        if (dataType_ !== type.type) continue;

        text = text.replaceAll(word, `<a href="/docs/${docs.options.package}/${docs.currentTag}/${dataType}/${type.name}">${type.name}</a>`)
    }

	return text;
}