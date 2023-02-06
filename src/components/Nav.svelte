<script lang="ts">
    import { githubHome } from '../scripts/data';
    import Icon from '@iconify/svelte';
</script>

<style lang="scss">
    .nav {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba($color: #6d6d6d, $alpha: 1.0);
    }
</style>

<div class="nav">
    <div class="nav-container">
        <div class="nav-links">
            <a href="/">Reciple</a>
            <a href="/docs">Documentation</a>
            <a href={githubHome}>GitHub</a>
        </div>
        <div class="nav-whitespace"></div>
        <div class="nav-utils"></div>
    </div>
</div>