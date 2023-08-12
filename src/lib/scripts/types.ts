import type { ProjectParser } from 'typedoc-json-parser';
import type { findDocsElement } from './helpers';

export type DocsElementType = 'classes'|'enums'|'functions'|'interfaces'|'namespaces'|'typeAliases';
export type AnyDocsElement = Exclude<ReturnType<typeof findDocsElement>, undefined>;

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