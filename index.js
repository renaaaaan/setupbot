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
    .setDescription('Cria toda a estrutura da loja')
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

    await interaction.reply('⚙️ Criando estrutura da loja...');

    const guild = interaction.guild;

    // CARGOS
    await guild.roles.create({
      name: '⚫ Dono',
      color: '#000000'
    });

    await guild.roles.create({
      name: '🔵 Admin',
      color: '#3498db'
    });

    await guild.roles.create({
      name: '🔴 Suporte',
      color: '#e74c3c'
    });

    await guild.roles.create({
      name: '🟢 Cliente',
      color: '#2ecc71'
    });

    await guild.roles.create({
      name: '⚪ Membro',
      color: '#95a5a6'
    });

    // INÍCIO
    const inicio = await guild.channels.create({
      name: '🧭 | Início',
      type: 4
    });

    await guild.channels.create({
      name: '🌟・boas-vindas',
      parent: inicio.id
    });

    await guild.channels.create({
      name: '📡・avisos',
      parent: inicio.id
    });

    await guild.channels.create({
      name: '📚・regras',
      parent: inicio.id
    });

    await guild.channels.create({
      name: '🎉・sorteios',
      parent: inicio.id
    });

    // PARCERIAS
    const parceria = await guild.channels.create({
      name: '🤝 | Parcerias',
      type: 4
    });

    await guild.channels.create({
      name: '🔗・parcerias',
      parent: parceria.id
    });

    await guild.channels.create({
      name: '🚀・seja-parceiro',
      parent: parceria.id
    });

    // LOJA
    const loja = await guild.channels.create({
      name: '🛍️ | Loja',
      type: 4
    });

    await guild.channels.create({
      name: '💠・produtos',
      parent: loja.id
    });

    await guild.channels.create({
      name: '🏷️・preços',
      parent: loja.id
    });

    await guild.channels.create({
      name: '✨・feedbacks',
      parent: loja.id
    });

    // SUPORTE
    const suporte = await guild.channels.create({
      name: '🛠️ | Suporte',
      type: 4
    });

    await guild.channels.create({
      name: '📬・atendimento',
      parent: suporte.id
    });

    // COMUNIDADE
    const comunidade = await guild.channels.create({
      name: '🌐 | Comunidade',
      type: 4
    });

    await guild.channels.create({
      name: '💭・chat-geral',
      parent: comunidade.id
    });

    await guild.channels.create({
      name: '📸・mídia',
      parent: comunidade.id
    });

    await guild.channels.create({
      name: '⚙️・comandos',
      parent: comunidade.id
    });

    // RESENHA
    const resenha = await guild.channels.create({
      name: '🎙️ | Resenha',
      type: 4
    });

    await guild.channels.create({
      name: '🎧・resenha-1',
      type: 2,
      parent: resenha.id
    });

    await guild.channels.create({
      name: '🎧・resenha-2',
      type: 2,
      parent: resenha.id
    });

    await interaction.editReply(
      '✅ Estrutura da loja criada com sucesso!'
    );
  }
});

client.login(process.env.TOKEN);
