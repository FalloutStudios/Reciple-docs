<script lang="ts">
    import '$lib/styles/markdown.scss';
    import '@skyra/discord-components-core';

    export let data;
</script>

<div class="container markdown">
    <svelte:component this={data.content}></svelte:component>
</div>