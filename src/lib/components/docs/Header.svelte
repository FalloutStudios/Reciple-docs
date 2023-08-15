<script lang="ts">
    import Icon from '@iconify/svelte';
    import linkIcon from '@iconify/icons-ph/link-bold';

    export let size: number = 3;
    export let id: string|null = null;
</script>

<style lang="scss">
    @import '../../styles/variables.scss';

    .header {
        display: flex;
        margin: 0.5rem 0;
        position: relative;
        font-weight: 600;
        width: 100%;
        @include WordWrap();

        .id-link {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 2rem;
            width: 2rem;
            font-size: 1.3rem;
            color: rgba($white, $alpha: 0.8);
            position: absolute;
            top: 0;
            right: 100%;
            padding-right: 0.2rem;
            opacity: 0.3;
        }

        &:hover .id-link,
        .id-link:focus {
            opacity: 1;
        }

        .content {
            width: 100%;
            line-height: 1.2em;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>

{#if size == 1}
    <h1 class="header header-{size}" {id}>
        {#if id}
            <a href="#{id}" class="id-link">
                <Icon icon={linkIcon}/>
            </a>
        {/if}
        <span class="content"><slot/></span>
    </h1>
{:else if size == 2}
    <h2 class="header header-{size}" {id}>
        {#if id}
            <a href="#{id}" class="id-link">
                <Icon icon={linkIcon}/>
            </a>
        {/if}
        <span class="content"><slot/></span>
    </h2>
{:else if size == 3}
    <h3 class="header header-{size}" {id}>
        {#if id}
            <a href="#{id}" class="id-link">
                <Icon icon={linkIcon}/>
            </a>
        {/if}
        <span class="content"><slot/></span>
    </h3>
{:else if size == 4}
    <h4 class="header header-{size}" {id}>
        {#if id}
            <a href="#{id}" class="id-link">
                <Icon icon={linkIcon}/>
            </a>
        {/if}
        <span class="content"><slot/></span>
    </h4>
{:else if size == 5}
    <h5 class="header header-{size}" {id}>
        {#if id}
            <a href="#{id}" class="id-link">
                <Icon icon={linkIcon}/>
            </a>
        {/if}
        <span class="content"><slot/></span>
    </h5>
{:else if size == 6}
    <h6 class="header header-{size}" {id}>
        {#if id}
            <a href="#{id}" class="id-link">
                <Icon icon={linkIcon}/>
            </a>
        {/if}
        <span class="content"><slot/></span>
    </h6>
{/if}