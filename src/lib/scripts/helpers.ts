import { FunctionParser, type ProjectParser } from 'typedoc-json-parser';
import type { AnyDocsElement, DocsElementType } from './types';
import { slug } from 'github-slugger';

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

export function getElementDescription(element: AnyDocsElement): string|null {
    return element.comment.description;
}

export function isElementDeprecated(element: AnyDocsElement): boolean {
    return element.comment.deprecated
        || element.comment.blockTags.some(c => c.name === 'deprecated')
        || (
            element instanceof FunctionParser
            && element.signatures.some(s => s.comment.deprecated || s.comment.blockTags.some(c => c.name === 'deprecated'))
        );
}

export function deprecatedElementSorter(a: AnyDocsElement, b: AnyDocsElement): number;
export function deprecatedElementSorter(a: boolean, b: boolean): number;
export function deprecatedElementSorter(a: AnyDocsElement|boolean, b: AnyDocsElement|boolean): number {
    const aDeprecated = typeof a === 'boolean' ? a : isElementDeprecated(a);
    const bDeprecated = typeof b === 'boolean' ? b : isElementDeprecated(b);

    return (aDeprecated && bDeprecated) || (!aDeprecated && !bDeprecated)
        ? 0
        : aDeprecated && !bDeprecated
            ? 1
            : -1
}

export function getMarkdownHeaderIds(markdown: string): { id: string; name: string; }[] {
    const ids: { id: string; name: string; }[] = [];

    const lines = markdown.split('\n');
    const regex = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;

    for (const line of lines) {
        const raw = regex.exec(line);
        if (!raw) continue;

        ids.push({
            id: slug(raw[2].toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, '')),
            name: raw[2].trim()
        });
    }

    return ids;
}

export function getElementTypeDisplayName(element: AnyDocsElement) {
    return element.constructor.name.replace('Parser', '').replace('_', '');
}