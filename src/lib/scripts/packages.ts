import { DocsParser, type DocsParserOptions } from './classes/DocsParser';

export const defaultDocsParserOptions: Omit<DocsParserOptions, 'package'> = {
    repository: 'FalloutStudios/reciple',
    branch: 'tags',
    defaultTag: 'main'
};

export const parsers = {
    'reciple': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'reciple'
    }),
    'client': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'client'
    }),
    'utils': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'utils'
    }),
    'npm-loader': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'npm-loader'
    }),
    'update-checker': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'update-checker'
    }),
    'docgen': new DocsParser({
        ...defaultDocsParserOptions,
        package: 'docgen'
    })
};


export const packages = Object.keys(parsers) as (keyof typeof parsers)[];
export default parsers;