const dotenv = require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const dbClient = new MongoClient(process.env.MONGO_KEY, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

const db = dbClient.db(process.env.MONGO_DB);
const collectionUsers = db.collection('users');

async function createUser(userJson) {
    try{
        let result = await collectionUsers.insertOne(userJson);
        let newUser = await collectionUsers.findOne({_id: result.insertedId.valueOf() });

        return newUser;
    } catch (error) {
        console.log("Erro no createUser: ", error);
    }
}

async function getUser(phoneNumber) {
    try {
        let dbQuery = {phone: phoneNumber};
        let result = await collectionUsers.findOne(dbQuery);
        
        return result;
    } catch (error) {
        console.log("Erro no getUser: ", error);
    }
}

module.exports = {createUser, getUser}