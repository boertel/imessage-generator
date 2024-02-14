import { completion } from '$lib/server/ai.ts';
import { nanoid } from 'nanoid';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params: { conversationId }, platform }) => {
	const { results: conversationResults } = await platform.env.D1.prepare(
		`SELECT * FROM conversation WHERE conv_id = ? LIMIT 1;`
	)
		.bind(conversationId)
		.run();
	console.log({ conversationResults, conversationId });
	const conversation = conversationResults[0];
	const { results: messages } = await platform.env.D1.prepare(
		`SELECT * FROM message WHERE msg_conv_id = ?;`
	)
		.bind(conversation.conv_id)
		.run();
	return {
		conversation,
		messages
	};
};

export const actions = {
	default: async ({ request, platform, params: { conversationId } }) => {
		const data = await request.formData();
		const text = data.get('message');
		let status = 200;
		let reply = '';
		if (text.startsWith('/')) {
			status = 201;
		} else {
			reply = `pong ${new Date().toISOString()}`;
			//reply = await completion(text);
		}

		await insertMessage(platform.env.D1, { text, contact: 'user', conversationId }).run();
		await insertMessage(platform.env.D1, { text: reply, contact: 'other', conversationId }).run();

		return {
			status,
			text: reply,
			contact: 'other'
		};
	}
};

function insertMessage(D1, { text, contact, conversationId }) {
	const messageId = nanoid();
	return D1.prepare(
		`INSERT INTO message (
			msg_id,
			msg_created_at,
			msg_updated_at,
			text,
			contact,
			msg_conv_id
		) VALUES (
			?1,
			datetime('now'),
			datetime('now'),
			?2,
			?3,
			?4
		);`
	).bind(messageId, text, contact, conversationId);
}
