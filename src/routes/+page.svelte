<script>
    import { browser } from '$app/environment';
    import { writable } from 'svelte/store';

    import Message from '$lib/Message.svelte'
    import Header from '$lib/Header.svelte'
    import Footer from '$lib/Footer.svelte'



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
        { text: '2bed, 2 bath with garage', contact: 'user' },
    ];

    function clear() {
        messages.set([]);
    }


    function start() {
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
        }, 1000);
    }

    function handleOnSubmit({ detail: { value: text } }) {
        if (text.startsWith('/')) {
            if (text === '/clear') {
                clear()
            } else if (text === '/start') {
                start()
            }
            return;
        }
        messages.update((msgs) => {
            let contact = msgs.length % 2 === 0 ? 'user' : 'other';
            return msgs.concat({ text, contact });
        });
    }
</script>


<main>
    <Header contact="ReAIl Estate" />
    <ul>
        {#each $messages as message}
            <Message {...message}  />
        {/each}
    </ul>
    <Footer on:submit={handleOnSubmit} />
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
