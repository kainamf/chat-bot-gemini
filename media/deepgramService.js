require('dotenv').config();
const { createClient } = require("@deepgram/sdk");

const fs = require('fs')

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

async function transcription(filePath){
    try{
        console.log("Transcrevendo arquivo : ", filePath)
    
        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
            fs.createReadStream(filePath),
            {
                model: "nova-2",
                language: "pt-BR"
            }
        );
        console.log(result, error)
    
        return result.results.channels[0].alternatives[0].transcript
    } catch(error){
        throw new Error("Erro ao transcrever arquivo: ", error)
    }
}

module.exports = {transcription};