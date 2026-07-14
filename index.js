require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  REST,
  Routes,
  Events
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Cria a estrutura da loja')
].map(command => command.toJSON());

client.once(Events.ClientReady, async c => {
  console.log(`✅ ${c.user.tag} online`);

  const rest = new REST({ version: '10' })
    .setToken(process.env.TOKEN);

  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Comando registrado');
  } catch (error) {
    console.error(error);
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'setup') {
    await interaction.reply(
      '🚧 Sistema de criação de loja em desenvolvimento...'
    );
  }
});

client.login(process.env.TOKEN);
