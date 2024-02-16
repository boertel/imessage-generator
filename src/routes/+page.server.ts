import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { createConversation, insertMessage } from '$lib/server/models';

export const actions = {
	default: async ({ request, platform }) => {
		const data = await request.formData();
		const text = data.get('message');

		const conversationId = await createConversation(platform.env.D1);

		await insertMessage(platform.env.D1, { text, contact: 'user', conversationId }).run();

		return redirect(303, `/${conversationId}`);
	}
} satisfies Actions;
