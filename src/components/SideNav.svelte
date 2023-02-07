<script lang="ts">
    import type { DocsData } from '../data/DocsData';
    import packages from '../scripts/packages';
    import DropdownMenu from './DropdownMenu.svelte';

    export let docs: DocsData;
    export let tag: string;

    let fetchDocs: Promise<DocsData> = Promise.resolve(!docs.tags.length || !docs.data ? docs.fetchDocs(tag) : docs);
</script>

<style lang="scss">
    :global(.docsContent) {
        padding-left: 300px;
    }

    .sidenav {
        position: fixed;
        top: 4rem;
        height: calc(100% - 4rem);
        width: 300px;
        background: #181818;
        border-right: 1px solid #3c3c3c;

        .settings {
            padding: 1rem 0.5rem;

            :global(.dropdown) {
                margin-bottom: 1rem;
            }
        }
    }
</style>

<div class="sidenav">
    <div class="settings">
        <DropdownMenu class="dropdown" values={Object.keys(packages).map(v => ({ value: v, href: `/docs/${v}`, selected: v === docs.options.package }))} icon="ph:package-bold" id="package-select"></DropdownMenu>
        {#await fetchDocs then docs}
            <DropdownMenu class="dropdown" values={docs.tags.map(v => ({ value: v, href: `/docs/${docs.options.package}/${v}`, selected: v === tag }))} icon="tabler:versions" id="tag-select"></DropdownMenu>
        {/await}
    </div>
</div>