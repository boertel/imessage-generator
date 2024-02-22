<script>
	export let text;
	export let contact;
	export let delay = 0;
</script>

<li class={contact}>
	{#if delay !== 0}<p class="typing"><span /><span /><span /></p>{:else}<p>{@html text}</p>{/if}
</li>

<style>
	@keyframes dots {
		0% {
			opacity: 1;
		}
	}
	li {
		display: flex;
		margin: 0;
		padding: 0;
	}
	li.other {
		justify-content: flex-start;
		margin-right: 20px;
	}
	li.user {
		justify-content: flex-end;
		margin-left: 20px;
	}

	li p {
		position: relative;
		display: inline-flex;
		list-style: none;
		padding: 12px 18px;
		margin: 0;
		min-height: 43px;
	}

	:global(li p img) {
		width: 50%;
	}

	li p.typing {
		gap: 4px;
		align-items: center;
	}

	li p.typing span {
		border-radius: 100%;
		width: 12px;
		height: 12px;
		background: rgb(var(--foreground-1));
		opacity: 0.3;
		animation: dots 0.9s ease-in-out infinite;
	}

	li p.typing span:nth-child(1) {
		animation-delay: 0s;
	}
	li p.typing span:nth-child(2) {
		animation-delay: 0.3s;
	}
	li p.typing span:nth-child(3) {
		animation-delay: 0.6s;
	}

	li p:before {
		content: '';
		position: absolute;
		height: 20px;
		width: 20px;
		bottom: 0;
		z-index: 0;
	}
	li p:after {
		content: '';
		position: absolute;
		z-index: 1;
		bottom: 0;
		width: 10px;
		height: 20px;
		background: rgb(var(--background));
	}

	li.user p {
		border-radius: 20px 20px 10px 20px;
		background-color: rgb(var(--primary));
		color: white;
	}
	li.user p:before {
		right: -8px;
		background: rgb(var(--primary));
	}
	li.user:first-child p:before,
	li.other + li.user p:before {
		border-bottom-left-radius: 15px;
	}
	li.user p:after {
		right: -10px;
	}
	li.user:first-child p:after,
	li.other + li.user p:after {
		border-bottom-left-radius: 10px;
	}

	li.other p {
		border-radius: 20px 20px 20px 10px;
		background-color: rgb(var(--background-1));
		color: rgb(var(--foreground-1));
	}
	li.other p:before {
		left: -7px;
		background: rgb(var(--background-1));
	}
	li.other:first-child p:before,
	li.user + li.other p:before {
		border-bottom-right-radius: 15px;
	}
	li.other p:after {
		left: -10px;
	}
	li.other:first-child p:after,
	li.user + li.other p:after {
		border-bottom-right-radius: 10px;
	}
</style>
