
const consts = require('../consts/consts');

async function getFeedbackMessage(jsonData) {
    let formattedDate = time.epochToDate(jsonData.date);
    let msg = '';
    switch (jsonData.category) {
        case consts.categories.FOOD:
            msg = `*${jsonData.message}* \n\nCategoria: ${consts.categoriesPTBR.FOOD}\n${jsonData.date ? `Horário: ${formattedDate}` : ''}\n${jsonData.items?.length > 0 ? `Itens: ${jsonData.items.join(", ")}` : ''}`;
            break;
        case consts.categories.MEDICINE:
            msg = `*${jsonData.message}* \n\nCategoria: ${consts.categoriesPTBR.MEDICINE}\n${jsonData.date ? `Horário: ${formattedDate}` : ''}\n${jsonData.name ? `Nome: ${jsonData.name}` : ''}\n${jsonData.quantity ? `Quantidade: ${jsonData.quantity} unidades` : ''}`;
            break;
        case consts.categories.EXERCISE:
            msg = `*${jsonData.message}* \n\nCategoria: ${consts.categoriesPTBR.EXERCISE}\n${jsonData.date ? `Horário: ${formattedDate}` : ''}\n${jsonData.name ? `Nome: ${jsonData.name}` : ''}\n${jsonData.time ? `Tempo: ${jsonData.time}` : ''}`;
            break;
        case consts.categories.GLUCOSE:
            msg = `*${jsonData.message}* \n\nCategoria: ${consts.categoriesPTBR.GLUCOSE}\n${jsonData.date ? `Horário: ${formattedDate}` : ''}\n${jsonData.glucose ? `Índice glicêmico: ${jsonData.glucose}` : ''}`;
            break;
        default:
            msg = `Parece que sua mensagem está fora do contexto de saúde e diabetes. Por favor, envie uma mensagem relacionada a este tema e ficarei feliz em ajudá-lo :)`;
            break;
    }
    console.log(msg);
    return msg;
}

module.exports = { getFeedbackMessage };