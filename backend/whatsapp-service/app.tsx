const qrcode = require('qrcode-terminal');
const { GroupChat } = require('whatsapp-web.js');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: '../'
    }),
    puppeteer: {
        headless: false,
        args: ['--no-sandbox'],
        browserWSEndpoint: process.env.BROWSER_URL,
    },
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', async () => {
    console.log('Client is ready!');

});

client.on('message', async (message) => {
   console.log(message)
})

client.initialize().catch(console.error);