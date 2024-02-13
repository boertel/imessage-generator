<script>
    import { enhance } from '$app/forms';
    import { browser } from '$app/environment';
    import { writable } from 'svelte/store';

    import Message from '$lib/Message.svelte'
    import Header from '$lib/Header.svelte'
    import Footer from '$lib/Footer.svelte'

    export let action;

    let formElement;

    let storedMessages = []
    if (browser) {
        try {
            storedMessages = JSON.parse(window.localStorage.getItem('messages'))
        } catch (e) {
            console.error(e)
        }
    }
    const messages = writable(storedMessages || []);

    messages.subscribe((msgs) => {
        if (browser) {
            window.localStorage.setItem('messages', JSON.stringify(msgs));
        }
    });

    let transcript = [
        { text: 'Hi', contact: 'user', delay: 1 },
        { text: 'Hello, I\'m ReAIl Estate and I\'m here to help!', contact: 'other' },
        { text: 'I need you to create a marketing packet for a new property about to go on the market.', contact: 'user' },
        { text: 'Sure, can you give me some details about this property?', contact: 'other' },
        { text: 'What is the address?', contact: 'other' },
        { text: '2799 Broadway St', contact: 'user' },
        { text: '7bed, 9 bath', contact: 'user' },
    ];

    function clear() {
        messages.set([]);
    }


    function start({ delay }) {
        clear()
        let _interval = window.setInterval(function () {
            messages.update((msgs) => {
                if (msgs.length < transcript.length) {
                    const nextIndex = msgs.length;
                    const previousMessage = msgs[nextIndex - 1];
                    const nextMessage = transcript[nextIndex];
                    if (previousMessage) {
                        previousMessage.delay = 0
                    }
                    if (nextMessage && msgs.length !== transcript.length - 1) {
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
    <Header contact="ReAIl Estate" />
    <ul>
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
