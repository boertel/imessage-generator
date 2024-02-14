<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function onkeydown(evt) {
        if (!evt.shiftKey && evt.key === 'Enter') {
            evt.preventDefault();
            const { value } = evt.target;
            if (value.length > 0) {
                dispatch('submit', { value });
                evt.target.value = '';
            }
        }
    }
</script>

<footer>
    <textarea readonly name="message" autoFocus placeholder="Message" on:keydown={onkeydown} rows="1" />
</footer>

<style>
    footer {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        backdrop-filter: blur(var(--blur));
        padding: 6px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 10px;
    }
    textarea {
        resize: none;
        font-family: -apple-system;
        font-size: 1em;
        background-color: rgba(var(--background), 0.2);
        border: 1px solid rgb(var(--background-1));
        color: rgba(var(--foreground-1));
        border-radius: 20px;
        padding: 8px 12px;
        width: 100%;
    }
    textarea:focus {
        outline: none;
        caret-color: rgb(var(--primary));
    }
</style>
