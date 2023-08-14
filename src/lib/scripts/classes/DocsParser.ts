import { ProjectParser, SourceParser } from 'typedoc-json-parser';
import { addToCache, getFromCache } from '../helpers';
import semver from 'semver';
import type { Docs } from '../types';
import { Collection } from '@discordjs/collection';

new SourceParser({
    url: '',
    file: '',
    line: 0,
    path: ''
});

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

export interface DocsParserOptions {
    repository: string;
    branch?: string;
    package: string;
    defaultTag: string;
    npm: string;

    tagFilter?: (tag: string) => boolean;
}

export class DocsParser {
    public tags: string[] = [];
    public data?: ProjectParser;

    public currentTag?: string;
    public customPages: Collection<string, Collection<string, Docs['customPages'][0]['files'][0]>> = new Collection();

    constructor(readonly options: DocsParserOptions) {}

    public async fetchTags(): Promise<string[]> {
        const url = `https://api.github.com/repos/${this.options.repository}/contents/${this.options.package}?ref=${this.options.branch ?? 'docs'}`;
        const files: APIGitHubRepositoryContent<'file'>[] = await fetch(url).then(res => this.resJson(res, url));
        const tags: string[] = [];

        let versions = files.filter(f => semver.valid(f.name.replace('.json', ''))).map(f => f.name.replace('.json', ''));
        let branches = files.filter(f => !versions.some(e => e === f.name.replace('.json', ''))).map(f => f.name.replace('.json', ''));

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

        for (const branch of branches) {
            if (!this.options.tagFilter || this.options.tagFilter(branch)) tags.push(branch);
        }

        return this.tags = tags.reverse();
    }

    public async fetchDocs(tag?: string|null): Promise<this> {
        await this.resolveTags();

        const url = `https://raw.githubusercontent.com/${this.options.repository}/${this.options.branch ?? 'docs'}/${this.options.package}/${tag ?? this.options.defaultTag}.json`;
        const response = await fetch(url).then(res => this.resJson<Docs>(res, url));

        this.data = new ProjectParser({ data: response });
        this.currentTag = tag ?? this.options.defaultTag;

        this.customPages.clear();

        for (const category of response.customPages) {
            const collection = this.customPages.get(category.category) ?? this.customPages.set(category.category, new Collection()).get(category.category);

            for (const page of category.files) {
                collection?.set(page.id, page);
            }
        }

        return this;
	}

    public async resolveTags(): Promise<string[]> {
        if (!this.tags.length) return this.fetchTags();

        return this.tags;
    }

    public async resolveDocs(tag?: string|null): Promise<this> {
        if (tag !== this.currentTag || !this.data) return this.fetchDocs(tag ?? this.currentTag);
        return this;
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
        if (url && res.ok && typeof window !== 'undefined') {
            addToCache(url, json);
            console.log(`Added to localstorage response from: ${url}`);
        }

        return json;
    }
}