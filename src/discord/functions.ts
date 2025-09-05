import { Client, REST, Routes } from "discord.js";
import actions from "./actions";

export type DiscordComnad = { name: string; description: string };

export function register_commands(
  rest_client: REST,
  client_id: string,
  commands: DiscordComnad[],
) {
  return rest_client.put(Routes.applicationCommands(client_id), {
    body: commands,
  });
}

export async function register_intents(client: Client, token: string) {
  client.on("ready", function () {
    console.log(`Discord bot logged in as ${client.user?.tag}`);
  });

  client.on("interactionCreate", async function (interaction) {
    try {
      if (interaction.isChatInputCommand()) {
        const command = interaction.commandName;

        if (!(command in actions)) {
          console.warn(`No action found for command: ${command}`);
          return;
        }

        await actions[command as keyof typeof actions].apply(null, [
          interaction,
        ]);
      }
    } catch (error) {
      console.warn("Error handling interaction:", error);
    }
  });
}
