import type { IconifyIcon } from '@iconify/svelte';
import type { ArrayTypeParser, ClassParser, ConditionalTypeParser, EnumParser, FunctionParser, IndexedAccessTypeParser, InferredTypeParser, InterfaceParser, IntersectionTypeParser, IntrinsicTypeParser, LiteralTypeParser, MappedTypeParser, NamedTupleMemberTypeParser, OptionalTypeParser, PredicateTypeParser, ProjectParser, QueryTypeParser, ReferenceTypeParser, ReflectionTypeParser, RestTypeParser, TemplateLiteralTypeParser, TupleTypeParser, TypeAliasParser, TypeOperatorTypeParser, UnionTypeParser, UnknownTypeParser, VariableParser } from 'typedoc-json-parser';

export type DocsElementType = 'classes'|'enums'|'functions'|'interfaces'|'namespaces'|'typeAliases';
export type AnyDocsElement = ClassParser|EnumParser|FunctionParser|InterfaceParser|TypeAliasParser|VariableParser;
export type AnyTypeParser = ArrayTypeParser|ConditionalTypeParser|IndexedAccessTypeParser|InferredTypeParser|IntersectionTypeParser|IntrinsicTypeParser|LiteralTypeParser|MappedTypeParser|NamedTupleMemberTypeParser|OptionalTypeParser|PredicateTypeParser|QueryTypeParser|ReferenceTypeParser|ReflectionTypeParser|RestTypeParser|TemplateLiteralTypeParser|TupleTypeParser|TypeOperatorTypeParser|UnionTypeParser|UnknownTypeParser;

export interface Docs extends ProjectParser.Json {
    parsedAt: number;
    customPages: {
        category: string;
        files: {
            id: string;
            name: string;
            content: string;
        }[];
    }[];
}

export interface SearchData {
    name: string;
    displayName?: string;
    href: string;
    icon?: string|IconifyIcon;
    deprecated?: boolean;
}