import type { Documentation } from '../interfaces/Documentation';
import semver from 'semver';

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
    public data: Partial<Documentation> = {};

    public tags: string[] = [];

    public currentTag: string|null = null;

    get source() { return `https://github.com/${this.options.repository}/blob/docs/${this.options.package}/`; }

    constructor (public options: DocsDataOptions) {}

    public async fetchTags(): Promise<string[]> {
        const files: APIGitHubRepositoryContent<'file'>[] = await fetch(`https://api.github.com/repos/${this.options.repository}/contents/${this.options.package}?ref=docs`).then(res => this.resJson(res));
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

        return this.tags;
    }

    public async fetchDocs(tag?: string|null): Promise<this> {
        await this.fetchTags();

        this.currentTag = tag ?? this.options.defaultTag;
        this.data = await fetch(`https://raw.githubusercontent.com/${this.options.repository}/docs/${this.options.package}/${tag ?? this.options.defaultTag}.json`).then(res => this.resJson(res));

        return this;
	}

    protected resJson<T = 'unknown'>(res: Response): Promise<T> {
        if (!res.ok) throw new Error('Failed to fetch docs data file from GitHub');
        return res.json();
    }
}