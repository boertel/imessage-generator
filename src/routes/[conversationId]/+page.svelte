<script>
    import { page } from '$app/stores';

    import Conversation from '$lib/Conversation.svelte'

    const url = $page.url;
    const shouldPlay = url.searchParams.has('play');

    export let data;
</script>

<Conversation shouldPlay={shouldPlay} conversation={data.conversation} messages={data.messages} />
