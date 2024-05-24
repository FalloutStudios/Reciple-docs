<script lang="ts">
    import '$lib/styles/markdown.scss';
    import '@skyra/discord-components-core';
    import { domCookie } from 'cookie-muncher';

    export let data;

    $: data, (() => {
        if (typeof document === 'undefined') return;

        domCookie.set({
            name: 'guide-page',
            value: `${data.category}/${data.id}`
        });

        console.log(domCookie.get('guide-page'));
    })();
</script>

<div class="container markdown">
    <svelte:component this={data.content}></svelte:component>
</div>