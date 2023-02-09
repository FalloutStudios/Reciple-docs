import type { Documentation, DocumentationClass, DocumentationClassMethod, DocumentationCustom, DocumentationCustomFile, DocumentationParameter, DocumentationTypeDefinition } from '../interfaces/Documentation';
import semver from 'semver';
import { addToCache, getFromCache } from '../scripts/localStorage';
import { typeKey } from '../scripts/typeKey';

export interface APIGitHubRepositoryContent<Type extends 'file'|'dir' = 'file'|'dir'> {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: Type,
    _links: {
        self: string;
        git: string;
        html: string;
    };
}

export interface DocsDataOptions {
    repository: string;
    package: string;

    defaultTag: string;

    tagFilter?: (tag: string) => boolean;
}

export class DocsData {
    protected fetched: boolean = false;
    protected tagsFetched: boolean = false;

    public data: Partial<Documentation> = {};

    public tags: string[] = [];

    public currentTag: string|null = null;

    get source() { return `https://github.com/${this.options.repository}/blob/docs/${this.options.package}/`; }
    get defaultPage(): DocumentationCustomFile|undefined {
        if (!this.data.custom) return;

        const key = Object.keys(this.data?.custom ?? {});
        if (!key.length) return;

        return Object.values(Object.values(this.data?.custom)[0]?.files ?? [])[0];
    }

    constructor (public options: DocsDataOptions) {}

    public async fetchTags(): Promise<string[]> {
        const url = `https://api.github.com/repos/${this.options.repository}/contents/${this.options.package}?ref=docs`;
        const files: APIGitHubRepositoryContent<'file'>[] = await fetch(url).then(res => this.resJson(res, url));
        const tags: string[] = []

        let versions = files.filter(f => semver.valid(f.name.replace('.json', ''))).map(f => f.name.replace('.json', ''));
        let branches = files.filter(f => !versions.some(e => e === f.name.replace('.json', ''))).map(f => f.name.replace('.json', ''));

        for (const branch of branches) {
            if (this.options.tagFilter && !this.options.tagFilter(branch)) continue;
            tags.push(branch);
        }

        const latestPatches: { [key: string]: number } = {};
        for (const version of versions) {
            const majorMinor = `${semver.major(version)}.${semver.minor(version)}`;
            const patch = semver.patch(version);
            if (patch < latestPatches[majorMinor]) continue;

            latestPatches[majorMinor] = patch;
        }

        for (const version of versions) {
            if (this.options.tagFilter && !this.options.tagFilter(version)) continue;

            const majorMinor = `${semver.major(version)}.${semver.minor(version)}`;
            const patch = semver.patch(version);
            if (patch < latestPatches[majorMinor]) continue;

            tags.push(version);
        }

        this.tags = tags;
        this.tagsFetched = true;

        return this.tags;
    }

    public async fetchDocs(tag?: string|null): Promise<this> {
        await this.resolveTags();

        const url = `https://raw.githubusercontent.com/${this.options.repository}/docs/${this.options.package}/${tag ?? this.options.defaultTag}.json`;

        this.data = await fetch(url).then(res => this.resJson(res, url));
        this.currentTag = tag ?? this.options.defaultTag;
        this.fetched = true;

        return this;
	}

    public async resolveTags(): Promise<string[]> {
        if (!this.tagsFetched) return this.fetchTags();

        return this.tags;
    }

    public async resolveSelf(tag?: string|null): Promise<this> {
        if (tag !== this.currentTag || !this.fetched) return this.fetchDocs(tag);
        return this;
    }

    public findType(query: string): { type: 'class'|'function'|'typedef', name: string; data: DocumentationClass|DocumentationClassMethod|DocumentationTypeDefinition; }|undefined {
        const class_ = this.data.classes?.find(q => q.name === query);
        if (class_) return { type: 'class', name: class_.name, data: class_ };

        const function_ = this.data.functions?.find(f => f.name === query);
        if (function_) return { type: 'function', name: function_.name, data: function_ };

        const typedef = this.data.typedefs?.find(t => t.name === query);
        if (typedef) return { type: 'typedef', name: typedef.name, data: typedef };
    }

    public typeKey(type: string[][], dontAtTypes?: boolean, escapeHtml?: boolean): string;
    public typeKey(type: string[][], ignoreType?: string[], escapeHtml?: boolean): string;
    public typeKey(type: string[][], options?: string[]|boolean, escapeHtml: boolean = true): string {
        return typeKey(type, this, escapeHtml, options);
    }

    public parseParamTypes(params: DocumentationParameter[], options?: { ignoreTypes?: string[]; disableTypeAnchors?: boolean; escapeHtml?: boolean; }): string {
        return params.map(t => `${t.name}${t.optional ? '?' : ''}: ${t.type.map(p => this.typeKey(p, options?.disableTypeAnchors ?? <unknown>options?.ignoreTypes as boolean ?? true , options?.escapeHtml ?? false))}`).join(', ')
    }

    protected async resJson<T = 'unknown'>(res: Response, url?: string): Promise<T> {
        if (!res.ok) {
            let cache: T|null = null;

            if (url) {
                cache = getFromCache(url);
                console.warn(`Retrieving data from cached response for: ${url}`, cache);

                if (cache) return cache;
            }

            if (typeof window === 'undefined') return [] as T;
            if (!cache) throw new Error('Failed to fetch docs data file from GitHub');
        }

        const json = await res.json();
        if (url && res.ok) {
            addToCache(url, json);
            console.log(`Added to localstorage response from: ${url}`);
        }

        return json;
    }
}