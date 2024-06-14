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
    'message-command-utils': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'message-command-utils',
        npm: '@reciple/message-command-utils',
    }),
    'create-reciple': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'create-reciple',
        npm: 'create-reciple'
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