import { escape } from 'svelte/internal';
import type { DocsData } from '../data/DocsData';

export function typeKey(type: string[][], docs?: DocsData, ignoreType: string[] = []) {
	const result = type.map(e => e
		.map(s => {
			if (!docs || ignoreType.includes(s)) return escape(s);

			const dataType = docs.findType(s);
			if (!dataType) return escape(s);

			const routeType = dataType.type === 'class'
				? 'classes'
				: dataType.type === 'function'
					? 'functions'
					: 'typedefs'

			return `<a href="/docs/${docs.options.package}/${docs.currentTag}/${routeType}/${dataType.name}">${dataType.name}</a>`;
		}).join('')
	).join('');

	return result;
}