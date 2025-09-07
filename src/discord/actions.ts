import { CacheType, Interaction } from 'discord.js';
import { Command } from '@bot/discord/commands';
import assert from 'assert';

export type Action = (interaction: Interaction<CacheType>) => Promise<void> | void;

const actions: Record<Command, Action> = {
	async help(interaction) {
		assert(interaction.isRepliable(), 'Interaction is not repliable');
		interaction.reply('Available commands: help, ping, info');
	},
	async ping(interaction) {
		assert(interaction.isRepliable(), 'Interaction is not repliable');
		interaction.reply('Pong!');
	},
	async info(interaction) {
		assert(interaction.isRepliable(), 'Interaction is not repliable');
		interaction.reply('This is a Discord bot built with discord.js');
	},
};

export default actions;
