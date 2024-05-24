<script lang="ts">
    import '$lib/styles/markdown.scss';
    import '@skyra/discord-components-core';

    export let data;
</script>

<style lang="scss">
    
</style>

<div class="container markdown">
    <svelte:component this={data.content}></svelte:component>
</div>