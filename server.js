require("dotenv").config();

const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

const bot = new TelegramBot(process.env.BOT_TOKEN);

// /start komutu
bot.onText(/\/start/, (msg) => {

    bot.sendMessage(
        msg.chat.id,
        "✅ Bot çalışıyor!"
    );

});

// diğer mesajlar
bot.on("message", (msg) => {

    if(msg.text === "/start") return;

    bot.sendMessage(
        msg.chat.id,
        "📩 Mesajın alındı."
    );

});

// webhook endpoint
app.post("/bot", (req, res) => {

    bot.processUpdate(req.body);
    res.sendStatus(200);

});

app.get("/", (req,res)=>{
    res.send("Bot ayakta 🚀");
});

app.listen(3000, () => {
    console.log("Server running");
});
