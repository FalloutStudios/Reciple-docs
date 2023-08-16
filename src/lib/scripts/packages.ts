import { DocsParser, type DocsParserOptions } from './classes/DocsParser';

export const defaultDocsParserOptions: Omit<DocsParserOptions, 'package'|'npm'> = {
    repository: 'FalloutStudios/reciple',
    branch: 'tags',
    defaultTag: 'main'
};

export const parsers = {
    'reciple': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'reciple',
        npm: 'reciple',
    }),
    'client': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'client',
        npm: '@reciple/client',
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
    })
};


export const packages = Object.keys(parsers) as (keyof typeof parsers)[];
export const all = Object.values(parsers);
export default parsers;