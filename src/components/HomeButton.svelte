<script lang="ts">
    export let style: 'Blue'|'Normal' = 'Normal';
    export let href: string = '#';
    export let target: ''|'_blank' = '';
</script>

<style lang="scss">
    a {
        position: relative;
        display: inline-block;
        padding: 0.6rem 1.2rem;
        background: rgba(34, 34, 34, 1.0);
        border: 1px solid rgba(60, 60, 60, 1.0);
        text-decoration: none;
        border-radius: 5px;
        color: #fff;
        font-size: 1.1rem;
        font-weight: bold;

        &.blue {
            background: #5865f2;
            border-color: #5865f2;
        }
    }
</style>

<a class:blue={style == 'Blue'} on:click href={href} target={target}><slot>Link</slot></a>