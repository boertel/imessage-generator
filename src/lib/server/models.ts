import { nanoid } from 'nanoid';

export async function createConversation(D1) {
	const conversationId = nanoid();
	await D1.prepare(
		`INSERT INTO conversation (
    conv_id,
    conv_created_at,
    conv_updated_at
  ) VALUES (
    ?1,
    datetime('now'),
    datetime('now')
  )`
	)
		.bind(conversationId)
		.run();
	return conversationId;
}

export function insertMessage(D1, { text, contact, conversationId }) {
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
