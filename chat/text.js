const axios = require('axios')
require('dotenv').config();

async function send(fromId, destinationNumber, messageText){
    try{
        let message = await axios({
            method: "POST",
            url:
            "https://graph.facebook.com/v18.0/" +
            fromId +
            "/messages",
            data: {
                messaging_product: "whatsapp",
                to: destinationNumber,
                text: {body: messageText}
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.FB_API_TOKEN}`
            },
        });
        console.log("Mensagem respondida");
        return message;
    } catch (error) {
        console.log("Houve um erro ao enviar a mensagem");
        console.log(error);
    }
}

module.exports = {send};