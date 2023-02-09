import { escape } from 'svelte/internal';
import type { DocsData } from '../data/DocsData';

export function typeKey(type: string[][], docs?: DocsData, escapeHtml: boolean = true, ignoreTypesOrDisable: string[]|boolean = true) {
	const result = type.map(e => e
		.map(s => {
			if (!docs || ignoreTypesOrDisable === true || (Array.isArray(ignoreTypesOrDisable) && ignoreTypesOrDisable.includes(s))) return escapeHtml ? escape(s) : s;

			const dataType = docs.findType(s);
			if (!dataType) return escapeHtml ? escape(s) : s;

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