import semver from 'semver';

import DocsSource from './DocsSource';

const branchBlacklist = new Set(['docs','webpack', 'v8']);
export default new DocsSource({
	id: 'reciple.js',
	name: 'reciple.js',
	global: 'reciple.js',
	docsRepo: 'FalloutStudios/reciple',
	repo: 'FalloutStudios/reciple',
	branchFilter: (branch: string) => !branchBlacklist.has(branch) && !branch.startsWith('dependabot/'),
	tagFilter: (tag: string) => semver.gte(tag.replace(/(^@.*\/.*@v?)?(?<semver>\d+.\d+.\d+)-?.*/, '$<semver>'), '5.5.0'),
});
