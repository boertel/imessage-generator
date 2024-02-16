<script>
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';
    import { writable } from 'svelte/store';
    import { onMount, tick } from 'svelte';

    import Message from '$lib/Message.svelte'
    import Header from '$lib/Header.svelte'
    import Footer from '$lib/Footer.svelte'


    export let shouldPlay
    export let messages;
    export let conversation;

    let formElement;
    let element;

    const _messages = writable(shouldPlay ? [] : messages || []);

    function clear() {
        _messages.set([]);
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

    _messages.subscribe(async () => {
        await tick();
        scrollToBottom(element);
    });

    function start({ delay }) {
        clear()
        let _interval = window.setInterval(function () {
            _messages.update((msgs) => {
                if (msgs.length < messages.length) {
                    const nextIndex = msgs.length;
                    const previousMessage = msgs[nextIndex - 1];
                    const nextMessage = messages[nextIndex];
                    if (previousMessage) {
                        previousMessage.delay = 0
                    }
                    if (nextMessage && msgs.length !== messages.length - 1) {
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
        _messages.update((msgs) => {
            return msgs.concat({ text, contact: 'user' });
        });
        formElement.requestSubmit();
    }

</script>

<main>
    <Header contact={conversation?.conv_contact_name} />
    <ul bind:this={element}>
        {#each $_messages as message}
            <Message {...message}  />
        {/each}
    </ul>
    <form method="POST" use:enhance={() => {
      return async ({ result }) => {
        if (result.type === 'redirect') {
          goto(result.location);
        } else {
            _messages.update((msgs) => {
                return msgs.concat({ text: "", contact: "other", delay: 1 });
            });
            return async ({ result }) => {
                if (result.data.status === 200) {
                    _messages.update((msgs) => {
                        const previousMessage = msgs[msgs.length - 1];
                        previousMessage.delay = 0;
                        previousMessage.text = result.data.text;
                        return msgs
                    });
                }
            }
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
