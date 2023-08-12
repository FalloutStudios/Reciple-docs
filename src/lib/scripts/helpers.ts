import type { ProjectParser } from 'typedoc-json-parser';
import type { DocsElementType } from './types';

export function addToCache(id: string, value: string|any[]|{}): void {
    if (typeof window == 'undefined') return;

    value = typeof value === 'string'
        ? `string:${value}`
        : typeof value === 'object'
            ? `object:${JSON.stringify(value)}`
            : `string:${String(value)}`;

    localStorage?.setItem(id, value as string);
}

export function getFromCache<T = unknown>(id: string): T|null {
    if (typeof window == 'undefined') return null;

    const data = localStorage?.getItem(id);
    if (!data) return null;

    if (data.startsWith('string:')) {
        return data.substring(7) as T;
    } else if (data.startsWith('object:')) {
        return JSON.parse(data.substring(7)) as T;
    } else {
        return data as T;
    }
}

export function findDocsElement(project: ProjectParser, find: string) {
    const [type, name] = find.split(':') as [DocsElementType, string];
    if (!type || !name) throw new Error('Invalid find query');
    if (!(type in project)) throw new Error('Unknown query type');

    const parser = project[type];

    return parser.find(e => e.name === name || e.id.toString() === name);
}