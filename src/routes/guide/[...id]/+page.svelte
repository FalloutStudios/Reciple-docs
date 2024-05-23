<script lang="ts">
    import { onMount } from 'svelte';

    export let data;

    let Markdown: any;

    const loadFile = async () => {
        Markdown = (await import(`../../../guides/${data.file}`)).default;
    };

    $: data, loadFile();
</script>

<svelte:component this={Markdown}></svelte:component>