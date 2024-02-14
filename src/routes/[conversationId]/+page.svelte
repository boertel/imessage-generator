<script>
    import { enhance } from '$app/forms';
    import { browser } from '$app/environment';
    import { writable } from 'svelte/store';
    import { page } from '$app/stores';
    import { onMount, tick } from 'svelte';

    import Message from '$lib/Message.svelte'
    import Header from '$lib/Header.svelte'
    import Footer from '$lib/Footer.svelte'

    const url = $page.url;
    const shouldPlay = url.searchParams.has('play');

    export let action;
    export let data;

    let formElement;
    let element;

    const messages = writable(shouldPlay ? [] : data.messages || []);

    function clear() {
        messages.set([]);
    }

    async function scrollToBottom(node) {
        if (node) {
            document.scrollingElement.scroll({ top: node.scrollHeight, behavior: 'smooth' });
        }
    }; 

    onMount(() => {
        if (shouldPlay) {
            start({ delay: 1000 });
            scrollToBottom(element);
        }
    });

    messages.subscribe(async () => {
        console.log({ element })
        await tick();
        scrollToBottom(element);
    });

    function start({ delay }) {
        clear()
        let _interval = window.setInterval(function () {
            messages.update((msgs) => {
                if (msgs.length < data.messages.length) {
                    const nextIndex = msgs.length;
                    const previousMessage = msgs[nextIndex - 1];
                    const nextMessage = data.messages[nextIndex];
                    if (previousMessage) {
                        previousMessage.delay = 0
                    }
                    if (nextMessage && msgs.length !== data.messages.length - 1) {
                        nextMessage.delay = 1
                    }
                    return msgs.concat(nextMessage)
                } else {
                    window.clearInterval(_interval)
                    return msgs
                }
            });
        }, delay ?? 1000);
    }

    function handleOnSubmit({ detail: { value: text } }) {
        if (text.startsWith('/')) {
            const [command, ...args] = text.split(' ');
            if (command === '/clear') {
                clear()
            } else if (command === '/start') {
                const delay = args.length > 0 ? parseInt(args[1], 10) : null;
                start({ delay })
            }
            return;
        }
        messages.update((msgs) => {
            return msgs.concat({ text, contact: 'user' });
        });
        formElement.requestSubmit();
    }

</script>

<main>
    <Header contact={data.conversation.conv_contact_name} />
    <ul bind:this={element}>
        {#each $messages as message}
            <Message {...message}  />
        {/each}
    </ul>
    <form method="POST" use:enhance={({ data }) => {
        messages.update((msgs) => {
            return msgs.concat({ text: "", contact: "other", delay: 1 });
        });
        return async ({ result }) => {
            if (result.data.status === 200) {
                messages.update((msgs) => {
                    const previousMessage = msgs[msgs.length - 1];
                    previousMessage.delay = 0;
                    previousMessage.text = result.data.text;
                    return msgs
                });
            }
        }
    }} bind:this={formElement}>
        <Footer on:submit={handleOnSubmit} />
    </form>
</main>

<style>
    main {
        padding: 10px;
    }
    ul {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        gap: 12px;
        margin: 20px 0;
        padding-top: 40px;
        padding-bottom: 40px;
    }
</style>
