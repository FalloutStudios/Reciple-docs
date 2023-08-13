import { ClassMethodParser, ClassParser, ClassPropertyParser, EnumMemberParser, EnumParser, FunctionParser, InterfaceMethodParser, InterfaceParser, InterfacePropertyParser, TypeAliasParser, type ProjectParser, type SearchResult, VariableParser, SignatureParser, MethodParser } from 'typedoc-json-parser';
import type { AnyDocsElement, DocsElementType } from './types';
import { slug } from 'github-slugger';
import symbolClassIcon from '@iconify/icons-codicon/symbol-class';
import symbolEmunIcon from '@iconify/icons-codicon/symbol-enum';
import symbolEmunMemberIcon from '@iconify/icons-codicon/symbol-enum-member';
import symbolInterfaceIcon from '@iconify/icons-codicon/symbol-interface';
import symbolRulerIcon from '@iconify/icons-codicon/symbol-ruler';
import symbolPropertyIcon from '@iconify/icons-codicon/symbol-property';
import symbolMethodIcon from '@iconify/icons-codicon/symbol-method';
import symbolFieldIcon from '@iconify/icons-codicon/symbol-field';
import symbolKey from '@iconify/icons-codicon/symbol-key';

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

export function getElementDescription(element: AnyDocsElement|MethodParser|SignatureParser): string|null {
    return (element instanceof FunctionParser || element instanceof MethodParser ? element.signatures.find(s => s.comment.description)?.comment.description : element.comment?.description) || null;
}

export function isElementDeprecated(element: AnyDocsElement|MethodParser|SignatureParser): boolean {
    return element instanceof FunctionParser || element instanceof MethodParser ? element.signatures.some(s => isElementDeprecated(s)) : element.comment?.deprecated || element.comment?.blockTags.some(c => c.name === 'deprecated');
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

export function getElementIcon(element: SearchResult) {
    if (element instanceof ClassParser) {
        return symbolClassIcon;
    } else if (element instanceof ClassPropertyParser) {
        return symbolPropertyIcon;
    } else if (element instanceof ClassMethodParser) {
        return symbolMethodIcon;
    } else if (element instanceof EnumParser) {
        return symbolEmunIcon;
    } else if (element instanceof EnumMemberParser) {
        return symbolEmunMemberIcon;
    } else if (element instanceof InterfaceParser) {
        return symbolInterfaceIcon;
    } else if (element instanceof InterfacePropertyParser) {
        return symbolPropertyIcon;
    } else if (element instanceof InterfaceMethodParser) {
        return symbolMethodIcon;
    } else if (element instanceof TypeAliasParser) {
        return symbolRulerIcon;
    } else if (element instanceof FunctionParser) {
        return symbolMethodIcon;
    } else if (element instanceof VariableParser) {
        return symbolFieldIcon;
    } else {
        return symbolKey;
    }
}

export function getElementDisplayName(docs: ProjectParser, element: SearchResult): string {
    if (element instanceof InterfaceMethodParser || element instanceof ClassMethodParser || element instanceof InterfacePropertyParser || element instanceof ClassPropertyParser) {
        const parent = docs.find(element.parentId) as InterfaceParser|ClassParser|null;
        const isStatic = (element instanceof ClassMethodParser || element instanceof ClassPropertyParser) && element.static;
        const isMethod = element instanceof ClassMethodParser || element instanceof InterfaceMethodParser;

        return `${parent?.name ?? ''}${isStatic ? '#' : '.'}${element.name}${isMethod ? '()' : ''}`;
    }

    return element.name;
}