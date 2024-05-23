<script lang="ts">
    import { onMount } from 'svelte';

    export let data;

    console.log(data);
</script>

<svelte:component this={data.content}></svelte:component>