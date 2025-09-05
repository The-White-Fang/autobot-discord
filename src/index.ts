import Express from "express";
import dotenv from "dotenv";
import { Client, GatewayIntentBits, REST } from "discord.js";
import verify_env from "@bot/utils/verify_env";
import {
  DiscordComnad,
  register_commands,
  register_intents,
} from "@bot/discord/functions";
import discord_commands from "@bot/discord/commands";

dotenv.config();

const { app_id, public_key, token } = verify_env();

const discrod_rest_client = new REST({ version: "10" }).setToken(token);

const discord_client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const server = Express();

const PORT = process.env.PORT || 2611;

async function post_start() {
  console.log(`Server started on port ${PORT}`);

  try {
    await register_commands(
      discrod_rest_client,
      app_id,
      discord_commands as any as DiscordComnad[],
    );
    await register_intents(discord_client, token);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const http_server = server.listen(PORT, post_start);
