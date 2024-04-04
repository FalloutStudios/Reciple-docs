import { DocsParser, type DocsParserOptions } from './classes/DocsParser';

export const defaultDocsParserOptions: Omit<DocsParserOptions, 'package'|'npm'> = {
    repository: 'thenorthsolution/reciple',
    branch: 'tags',
    defaultTag: 'main'
};

export const parsers = {
    'reciple': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'reciple',
        npm: 'reciple',
    }),
    'core': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'core',
        npm: '@reciple/core'
    }),
    'utils': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'utils',
        npm: '@reciple/utils',
    }),
    'npm-loader': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'npm-loader',
        npm: '@reciple/npm-loader',
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
    }),
    'create-reciple': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'create-reciple',
        npm: 'create-reciple'
    })
};


export const packages = Object.keys(parsers) as (keyof typeof parsers)[];
export const all = Object.values(parsers);
export default parsers;