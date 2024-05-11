const axios = require('axios')
require('dotenv').config();

const fs = require('fs')

const file = require('../utils/file')

async function getMediaUrl(idMedia){
    try{
        console.log("GetMediaURL funfou")
        let response = await axios({
            method: "GET",
            url:
            "https://graph.facebook.com/v18.0/" + idMedia,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.FB_API_TOKEN}`
            },
        });
        //console.log("Informações de mídia recebidas: ", response.data);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao receber informações da mídia: ", error);
    }
}

async function downloadMedia(url){
    try{
        console.log("downloadMedia funfou")

        let response = await axios({
            method: "GET",
            url,
            headers: {
                "Authorization": `Bearer ${process.env.FB_API_TOKEN}`,
            },
            responseType: 'arraybuffer'
        });
        //console.log("Mídia recebida: ", response.data);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao receber mídia: ", error);
    }
}

module.exports = {getMediaUrl, downloadMedia};