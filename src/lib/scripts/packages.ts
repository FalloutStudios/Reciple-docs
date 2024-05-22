import { DocsParser, type DocsParserOptions } from './classes/DocsParser';

export const defaultDocsParserOptions: Omit<DocsParserOptions, 'package'|'npm'> = {
    repository: 'thenorthsolution/reciple',
    branch: 'tags',
    defaultTag: 'main'
};

export const parsers = {
    'core': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'core',
        npm: '@reciple/core'
    }),
    'reciple': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'reciple',
        npm: 'reciple',
    }),
    'utils': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'utils',
        npm: '@reciple/utils',
    }),
    'create-reciple': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'create-reciple',
        npm: 'create-reciple'
    }),
    'update-checker': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'update-checker',
        npm: '@reciple/update-checker',
    }),
    'docgen': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'docgen',
        npm: '@reciple/docgen',
    })
};


export const packages = Object.keys(parsers) as (keyof typeof parsers)[];
export const all = Object.values(parsers);
export default parsers;