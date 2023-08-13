import { ClassMethodParser, ClassParser, ClassPropertyParser, EnumMemberParser, EnumParser, FunctionParser, InterfaceMethodParser, InterfaceParser, InterfacePropertyParser, TypeAliasParser, type ProjectParser, type SearchResult, VariableParser } from 'typedoc-json-parser';
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
import type { DocsParser } from './classes/DocsParser';

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

export function findDocsElement(project: ProjectParser, find: string|number) {
    if (typeof find === 'number' || !isNaN(Number(find))) {
        const element = project.find(Number(find));
        if (!isDocsElement(element)) return;
        return element;
    }

    const [type, name] = find.split(':') as [DocsElementType, string];
    if (!type || !name) return;
    if (!(type in project)) return;

    const parser = project[type];

    return parser.find(e => e.name === name || e.id.toString() === name);
}

export function getElementDescription(element: SearchResult): string|null {
    return ('signatures' in element ? element.signatures.find(s => s.comment.description)?.comment.description : ('comment' in element && element.comment?.description)) || null;
}

export function isElementDeprecated(element: SearchResult): boolean {
    return 'signatures' in element
        ? element.signatures.some(s => isElementDeprecated(s))
        : 'comment' in element && (element.comment?.deprecated || element.comment?.blockTags.some(c => c.name === 'deprecated'));
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

export function getElementSlugType(element: AnyDocsElement) {
    if (element instanceof ClassParser) {
        return 'classes';
    } else if (element instanceof EnumParser) {
        return 'enums';
    } else if (element instanceof InterfaceParser) {
        return 'interfaces';
    } else if (element instanceof TypeAliasParser) {
        return 'typeAliases';
    } else if (element instanceof FunctionParser) {
        return 'functions';
    } else if (element instanceof VariableParser) {
        return 'variables';
    }

    throw new Error('Unknown document type');
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

export function isDocsElement(element: unknown): element is AnyDocsElement {
    return element instanceof ClassParser || element instanceof  EnumParser || element instanceof  FunctionParser || element instanceof  InterfaceParser || element instanceof  TypeAliasParser || element instanceof VariableParser;
}

export function getElementDisplayName(docs: ProjectParser, element: SearchResult): { name: string; search: string; } {
    if ('parentId' in element) {
        const parent = docs.find(element.parentId) as InterfaceParser|ClassParser|null;
        const isStatic = (element instanceof ClassMethodParser || element instanceof ClassPropertyParser) && element.static;
        const isMethod = element instanceof ClassMethodParser || element instanceof InterfaceMethodParser;

        const name = `${parent?.name ?? ''}${isStatic ? '#' : '.'}${element.name}`;

        return { name, search: name + (isMethod ? '()' : '') };
    }

    return { name: element.name, search: element.name };
}

export function getElementHref(data: { docs: DocsParser; package: string;  }, element: SearchResult): string {
    let base = `/docs/${data.package}/${data.docs.currentTag ?? data.docs.options.defaultTag}`;

    if (isDocsElement(element)) return base + `/${getElementSlugType(element)}:${element.name}`;

    if ('parentId' in element) {
        const parent = data.docs.data?.find(element.parentId) as InterfaceParser|ClassParser|EnumParser|null;
        const isStatic = (element instanceof ClassMethodParser || element instanceof ClassPropertyParser) && element.static;
        if (!parent) return base + `/${element.parentId}#${(isStatic ? 'static-' : '') + slug(element.name)}`;

        return base + `/${getElementSlugType(parent)}:${parent.name}#${(isStatic ? 'static-' : '') + slug(element.name)}`;
    }

    return base + `/${element.id}`;
}