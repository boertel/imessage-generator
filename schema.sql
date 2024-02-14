DROP TABLE IF EXISTS conversation;

CREATE TABLE IF NOT EXISTS conversation (
    conv_id TEXT PRIMARY KEY,
    conv_created_at TEXT,
    conv_updated_at TEXT,
    conv_password TEXT,
    conv_contact_name TEXT
);

DROP TABLE IF EXISTS message;

CREATE TABLE IF NOT EXISTS message (
    msg_id TEXT PRIMARY KEY,
    msg_created_at TEXT,
    msg_updated_at TEXT,
    text TEXT,
    contact TEXT,
    msg_conv_id TEXT,
    FOREIGN KEY (msg_conv_id) REFERENCES conversation(conv_id)
);

INSERT INTO conversation (conv_id, conv_created_at, conv_updated_at, conv_password, conv_contact_name) VALUES ('1', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 'password', 'Real EstAIte');

INSERT INTO message (msg_id, msg_created_at, msg_updated_at, text, contact, msg_conv_id) VALUES
    ("11", "datetime('now')", "datetime('now')", "Hello", "user", "1"),
    ("12", "datetime('now')", "datetime('now')", "Good morning Benjamin! I'm Real EstAIte to help you with your marketing content.", "other", "1"),
    ("13", "datetime('now')", "datetime('now')", "Can you generate a flyer for a 3630 Jackon Street in San Francisco?", "user", "1"),
    ("14", "datetime('now')", "datetime('now')", "Sure, can you tell more about the property?", "other", "1"),
    ("15", "datetime('now')", "datetime('now')", "It is a 8 bed, 9 baths house", "user", "1"),
    ("16", "datetime('now')", "datetime('now')", "What about the price?", "other", "1"),
    ("17", "datetime('now')", "datetime('now')", "29 millions", "user", "1"),
    ("18", "datetime('now')", "datetime('now')", "I need a couple more details. Are there interesting amenties?", "other", "1"),
    ("19", "datetime('now')", "datetime('now')", "I has its own pickeball court, and view on the Golden Gate Bridge.", "user", "1"),
    ("20", "datetime('now')", "datetime('now')", "It sounds gorgeous, do you have a few pictures of the property?", "other", "1"),
    ("21", "datetime('now')", "datetime('now')", "<img src='https://photos.zillowstatic.com/fp/7776826c70c93a1eedfed38ddcd208fa-uncropped_scaled_within_1536_1152.webp'>", "user", "1"),
    ("22", "datetime('now')", "datetime('now')", "<img src='https://photos.zillowstatic.com/fp/6c7273c1ceb606ba4f7984eced57cb17-uncropped_scaled_within_1536_1152.webp'>", "user", "1"),
    ("23", "datetime('now')", "datetime('now')", "<img src='https://photos.zillowstatic.com/fp/0cffb5323b4b51105a5dd7e0d2bec2bc-uncropped_scaled_within_1536_1152.webp'>", "user", "1"),
    ("24", "datetime('now')", "datetime('now')", "Hang in there, I'm creating a flyer for you...", "other", "1"),
    ("25", "datetime('now')", "datetime('now')", "<img src='/images/jackson.avif'>", "other", "1"),
    ("26", "datetime('now')", "datetime('now')", "Can you remove the price from the flyer?", "user", "1"),
    ("27", "datetime('now')", "datetime('now')", "<img src='/images/jackson-no-price.avif'>", "other", "1"),

    ("99", "datetime('now')", "datetime('now')", "Thank you!", "user", "1")
    ;
