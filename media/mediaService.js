
require('dotenv').config();
const facebookMediaService = require("./facebookMediaService")
const deepgramService = require("./deepgramService")
const file = require("../utils/file")

// colocar await quando for chamar essa bagaça
async function getFileAndTranscribe(mediaId){
    try{

        // obtém informações do arquivo do facebook
        let mediaInfo = await facebookMediaService.getMediaUrl(mediaId)

        // faz download do arquivo do facebook
        let mediaFile = await facebookMediaService.downloadMedia(mediaInfo.url)

        // salva o arquivo na pasta files (ela precisa já estar criada)
        let filePath = `./files/file-${mediaId}.ogg`
        file.saveMedia(filePath, mediaFile)

        // transcrição do arquivo de áudio
        let transcription = await deepgramService.transcription(filePath)
        return transcription

    } catch (e){
        throw new Error("Erro ao obter e transcrever arquivo: ", e)
    }
}

module.exports = {getFileAndTranscribe};