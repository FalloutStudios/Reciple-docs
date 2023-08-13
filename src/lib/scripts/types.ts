import type { ClassParser, EnumParser, FunctionParser, InterfaceParser, ProjectParser, TypeAliasParser } from 'typedoc-json-parser';

export type DocsElementType = 'classes'|'enums'|'functions'|'interfaces'|'namespaces'|'typeAliases';
export type AnyDocsElement = ClassParser|EnumParser|FunctionParser|InterfaceParser|TypeAliasParser;

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