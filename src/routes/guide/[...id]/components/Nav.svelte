<script lang="ts">
    import { page } from '$app/stores';
    import '$lib/styles/nav.scss';
    import Icon from '@iconify/svelte';
    import { navLinks } from '../../../../lib/scripts/config';
    import externalLinkIcon from '@iconify/icons-tabler/external-link';
</script>

<div class="nav">
    <style>
        body {
            padding-top: var(--nav-height);
        }

        html,
        body {
            scroll-padding-top: var(--nav-height);
        }
    </style>
    <div class="nav-container">
        <a href="/guide" class="nav-home">Guide<span class="tag" style="text-transform: capitalize;"><span class="separator">/</span>{$page.data.metadata.title}</span></a>
        <div class="nav-links">
            {#if navLinks.length}
                {#each navLinks as link}
                    <a href={link.href} target={link.blank ? "_blank" : null} class:canbehidden={link.blank}>
                        {link.name} {#if link.blank}<Icon icon={externalLinkIcon}/>{/if}
                    </a>
                {/each}
            {/if}
        </div>
    </div>
</div>