import { ClassMethodParser, ClassParser, ClassPropertyParser, EnumMemberParser, EnumParser, FunctionParser, InterfaceMethodParser, InterfaceParser, InterfacePropertyParser, TypeAliasParser, type ProjectParser, type SearchResult, VariableParser, TypeParser, MappedTypeParser, SignatureParser } from 'typedoc-json-parser';
import type { AnyDocsElement, AnyTypeParser, DocsElementType } from './types';
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
import { all } from './packages';
import { EscapedHTMLEntities, UnescapedHTMLEntities } from './config';

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

export function getElementExtensions(data: { docs: DocsParser; package: string;  }, element: ClassParser|InterfaceParser, enableLinks: boolean = true): string {
    let base = '';

    if ('extendsType' in element && element.extendsType) base += `extends ${stringifyType(data, element.extendsType, enableLinks, 1)} `;
    if ('implementsType' in element && element.implementsType.length) base += `implements ${element.implementsType.map(t => stringifyType(data, t, enableLinks, 1)).join(',' + EscapedHTMLEntities[' '])}`;

    return base;
}

export function stringifyType(data: { docs: DocsParser; package: string;  }, type: any, enableLinks?: boolean, maxDepth?: number, currentDepth?: number): string;
export function stringifyType(data: { docs: DocsParser; package: string;  }, type: AnyTypeParser, enableLinks: boolean = true, maxDepth: number = 3, currentDepth: number = 0): string {
    if (currentDepth > maxDepth) return '...';
    currentDepth++;

    function _stringify(t: TypeParser): string {
        return stringifyType(data, t, enableLinks, maxDepth, currentDepth);
    }

    function _wrap(t: TypeParser, kind: TypeParser.Kind = type.kind): string {
        return TypeParser.BindingPowers[t.kind] < TypeParser.BindingPowers[kind] ? `(${_stringify(t)})` : _stringify(t);
    }

    switch (type.kind) {
        case TypeParser.Kind.Array:
            return `${_wrap(type.type)}[]`;
        case TypeParser.Kind.Conditional:
            return `${_wrap(type.checkType)}${EscapedHTMLEntities[' ']}extends${EscapedHTMLEntities[' ']}${_stringify(type.extendsType)} ? ${_stringify(type.trueType)} : ${_stringify(type.falseType)}`;
        case TypeParser.Kind.IndexedAccess:
            return `${_stringify(type.objectType)}[${_stringify(type.indexType)}]`;
        case TypeParser.Kind.Inferred:
            return `infer ${type.type}`;
        case TypeParser.Kind.Intersection:
            return `${type.types.map(t => _wrap(t)).join(EscapedHTMLEntities[' '] + '&' + EscapedHTMLEntities[' '])}`;
        case TypeParser.Kind.Intrinsic:
            return type.type;
        case TypeParser.Kind.Literal:
            return type.value.replaceAll(' ', EscapedHTMLEntities[' ']);
        case TypeParser.Kind.Mapped:
            const mappedReadonly = type.readonly === MappedTypeParser.Modifier.Add ? 'readonly ' : type.readonly === MappedTypeParser.Modifier.Remove ? '-readonly ' : '';
            const mappedOptional = type.optional === MappedTypeParser.Modifier.Add ? '?' : type.optional === MappedTypeParser.Modifier.Remove ? '-?' : '';
            return `{${EscapedHTMLEntities[' '] + mappedReadonly}[${type.parameter + EscapedHTMLEntities[' ']}in${EscapedHTMLEntities[' '] + _stringify(type.parameterType)}]${mappedOptional}:${EscapedHTMLEntities[' '] + _stringify(type.templateType) + EscapedHTMLEntities[' ']}}`;
        case TypeParser.Kind.NamedTupleMember:
            return `${type.name}${type.optional ? '?' : ''}:${EscapedHTMLEntities[' '] + _stringify(type.type)}`;
        case TypeParser.Kind.Optional:
            return `${_wrap(type.type)}?`;
        case TypeParser.Kind.Predicate:
            return type.asserts ? `asserts${EscapedHTMLEntities[' '] + type.name}` : `${type.name + EscapedHTMLEntities[' ']}is${EscapedHTMLEntities[' '] + (type.type && _stringify(type.type) || '')}`;
        case TypeParser.Kind.Query:
            return `typeof${EscapedHTMLEntities[' '] + _stringify(type.query)}`;
        case TypeParser.Kind.Reference:
            const typeArgs = type.typeArguments.length ? `${EscapedHTMLEntities['<']}${type.typeArguments.map(a => _stringify(a)).join(',')}${EscapedHTMLEntities['>']}` : '';
            if (!enableLinks || !type.packageName || typeof type.id !== 'number' || !all.some(p => p.options.npm === type.packageName)) return type.name + typeArgs;

            let url: string = '';

            if (type.packageName === data.docs.options.npm) {
                const element = findDocsElement(data.docs.data!, type.id);
                if (element) url = getElementHref(data, element);
            } else {
                const pkg = all.find(p => p.options.npm === type.packageName);
                if (pkg) return `/docs/${pkg.options.package}?goto=${type.id}`;
            }

            return url
                ? `<a href="${url}">${`${type.name}`}</a>` + typeArgs
                : type.name + typeArgs;
        case TypeParser.Kind.Reflection:
            return '{ ' +
                (type.properties?.map(p => `${p.name}:${EscapedHTMLEntities[' '] + _stringify(p.type)};`).join(EscapedHTMLEntities[' ']) ?? '') +
                (type.signatures?.map(s => {
                    const signature = signatureStringInfo(data, s, enableLinks);

                    return `${signature.typeParameters ? (EscapedHTMLEntities['<'] + signature.typeParameters + EscapedHTMLEntities['>']) : ''}(${signature.parameters}):${EscapedHTMLEntities[' '] + signature.return};`;
                }).join(EscapedHTMLEntities[' ']) ?? '') +
                (type.methods?.map(m => m.signatures.length
                    ? m.signatures?.map(s => {
                        const signature = signatureStringInfo(data, s, enableLinks);
                        return `${signature.typeParameters ? (EscapedHTMLEntities['<'] + signature.typeParameters + EscapedHTMLEntities['>']) : ''}(${signature.parameters}):${EscapedHTMLEntities[' '] + signature.return};`;
                    }).join(EscapedHTMLEntities[' ']) ?? ''
                    : '') ?? '')
            + ' }';
        case TypeParser.Kind.Rest:
            return `...${_wrap(type.type)}`;
        case TypeParser.Kind.TemplateLiteral:
            return '`' + type.head + type.tail.map(t => '${' + _stringify(t.type) + '}' + t.text).join('') + '`';
        case TypeParser.Kind.Tuple:
            return `[${type.types.map(t => _stringify(t)).join(',')}]`;
        case TypeParser.Kind.TypeOperator:
            return type.operator + ' ' + _stringify(type.type);
        case TypeParser.Kind.Union:
            return type.types.map(u => _wrap(u)).join('|');
        case TypeParser.Kind.Unknown:
            return 'unknown';
    }
}

export function signatureStringInfo(data: { docs: DocsParser; package: string;  }, type: SignatureParser, enableLinks: boolean, depth?: number): { typeParameters: string; parameters: string; return: string } {
    let typeParameters = '';
    let parameters = '';
    let returnType = '';

    typeParameters = type.typeParameters.length
        ? type.typeParameters.map(p => `${p.name}${EscapedHTMLEntities[' ']}${p.constraint ? ('extends ' + stringifyType(data, p.constraint, enableLinks, depth)) : ''}${p.default ? (' = ' + stringifyType(data, p.default, enableLinks, depth)) : ''}`).join(', ')
        : '';

    parameters = type.parameters.length
        ? type.parameters.map(p => `${p.rest ? '...' : ''}${p.name}${p.optional ? '?' : ''}: ${stringifyType(data, p.type, enableLinks, depth)}`).join(', ')
        : '';

    returnType = stringifyType(data, type.returnType, enableLinks, depth);

    return { typeParameters, parameters, return: returnType };
}

export function unescapeHTML(html: string): string {
    for (const key of Object.values(EscapedHTMLEntities) as string[]) {
        html = html.replaceAll(key, UnescapedHTMLEntities[key as keyof typeof UnescapedHTMLEntities]);
    }

    return html;
}

export function createClassTypeSnippet(data: { docs: DocsParser; package: string;  }, element: ClassParser): string {
    let typeParameters = element.typeParameters.map(p => `${p.name}${p.constraint ? ('extends ' + stringifyType(data, p.constraint, false, 2)) : ''}${p.default ? (' = ' + stringifyType(data, p.default, false, 2)) : ''}`).join(', ');
        typeParameters = typeParameters && `<${typeParameters}>`;

    let extendsType = element.extendsType && stringifyType(data, element.extendsType, false, 2);
        extendsType = extendsType ? ` extends ${extendsType}` : '';

    let implementsType = element.implementsType.map(p => stringifyType(data, element.implementsType, false, 2)).join(', ');
        implementsType = implementsType ? ` implements ${extendsType}` : '';

    return unescapeHTML(`export ${element.abstract ? 'abstract ' : ''}class ${element.name}${typeParameters}${extendsType}`);
}

export function createInterfaceTypeSnippet(data: { docs: DocsParser; package: string;  }, element: InterfaceParser): string {
    let typeParameters = element.typeParameters.map(p => `${p.name}${p.constraint ? ('extends ' + stringifyType(data, p.constraint, false, 2)) : ''}${p.default ? (' = ' + stringifyType(data, p.default, false, 2)) : ''}`).join(', ');
        typeParameters = typeParameters && `<${typeParameters}>`;

    return unescapeHTML(`export interface ${element.name}${typeParameters}`);
}

export function createTypeAliasTypeSnippet(data: { docs: DocsParser; package: string;  }, element: TypeAliasParser): string {
    let typeParameters = element.typeParameters.map(p => `${p.name}${p.constraint ? ('extends ' + stringifyType(data, p.constraint, false, 2)) : ''}${p.default ? (' = ' + stringifyType(data, p.default, false, 2)) : ''}`).join(', ');
        typeParameters = typeParameters && `<${typeParameters}>`;

    return unescapeHTML(`export type ${element.name}${typeParameters} = ${stringifyType(data, element.type, false, 2)}`);
}

export function createFunctionTypeSnippet(data: { docs: DocsParser; package: string;  }, element: FunctionParser): string {
    let snippets = '';

    for (const signature of element.signatures) {
        const info = signatureStringInfo(data, signature, false, 2);

        snippets += `export function ${signature.name}${info.typeParameters ? ('<' + info.typeParameters + '>') : ''}(${info.parameters || ''}): ${info.return}\n`;
    }

    return unescapeHTML(snippets);
}

export function createVariableTypeSnipper(data: { docs: DocsParser; package: string;  }, element: VariableParser): string {
    return unescapeHTML(`export const ${element.name}: ${stringifyType(data, element.type, false, 2)} = ${element.value}`);
}