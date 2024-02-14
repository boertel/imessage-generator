<script>
    export let contact;
</script>

<header>
    <div />
    <div class="contact">
        <div class="avatar" />
        <h1>{contact}</h1>
    </div>
    <div />
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        backdrop-filter: blur(var(--blur));
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: 60px;
        box-sizing: border-box;
        padding: 0;
        z-index: 1;
    }
    header:before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background-color: rgba(255, 255, 255, 0.06);
    }

    .contact {
        display: flex;
        align-items: center;
    }

    h1 {
        font-family: -apple-system;
        margin: 0;
        padding: 0;
        font-size: 1em;
        font-weight: normal;
        color: rgb(var(--foreground-1));
    }
</style>
