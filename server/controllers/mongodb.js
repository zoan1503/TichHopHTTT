const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://anhvd172951:zoan1503@cluster0.kubah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if(err) {
        throw(err)
    }else {
        const collection = client.db("covid").collection("vinhphuc");
        // perform actions on the collection object
        console.log(collection)
        client.close();
    }
   
});