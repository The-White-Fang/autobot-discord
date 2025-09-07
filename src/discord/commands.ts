const commands = [
	{ name: 'help', description: 'List all available commands' },
	{ name: 'ping', description: "Check the bot's latency" },
	{ name: 'info', description: 'Get information about the bot' },
] as const;

export type Command = (typeof commands)[number]['name'];

export default commands;
