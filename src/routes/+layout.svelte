<script lang="ts">
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import '$lib/styles/main.scss';

    let ready = true;

    beforeNavigate(() => ready = false);
    afterNavigate(() => ready = true);
</script>
{#if !ready}<div class="page-loader"><div class="progress"></div></div>{/if}
<slot/>