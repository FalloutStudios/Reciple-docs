<script lang="ts">
    import type { IconifyIcon } from '@iconify/svelte';
    import Icon from '@iconify/svelte';

    export let label: string;
    export let icon: string|IconifyIcon|null = null;
</script>

<style lang="scss">
    .floating-label-container {
        
    }
</style>

<div class="floating-label-container">
    <div class="floating-label-content">
        <div class="floating-label">
            {#if icon}<Icon {icon}/>{/if}
            <span class="text">{label}</span>
        </div>
        <div class="floating-label-slot"><slot/></div>
    </div>
</div>