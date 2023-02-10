<script lang="ts">
  import type { DocumentationClassMethod, DocumentationProperty } from '../../interfaces/Documentation';


    export let properties: DocumentationProperty[] = [];
    export let methods: DocumentationClassMethod[] = [];
</script>

<div class="container">
    {#if properties.length}
        <h2>Properties</h2>
        {@html properties.map(e => `<a href="#${e.name}">${e.name}</a>`).join('<br>')}
    {/if}

    {#if methods.length}
        <h2>Methods</h2>
        {@html properties.map(e => `<a href="#${e.name}">${e.name}</a>`).join('<br>')}
    {/if}
</div>