import { completion } from '$lib/server/ai.ts';

export const actions = {
		default: async ({ request }) => {
			const data = await request.formData();
			const text = data.get('message');
			let status = 200;
			let reply = '';
			if (text.startsWith('/')) {
				status = 201;
			} else {
				reply = await completion(text);
			}
			return {
				status,
				text: reply,
				contact: 'other',
			}
		}
};
