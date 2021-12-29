const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://anhvd172951:zoan1503@cluster0.kubah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if (err) {
        throw (err)
    } else {
        const db = client.db('covid')
        const collection = db.collection("hanoi");
        const test = collection.find({}).toArray((err, result) => {
            if (err) throw err;
            //console.log(result)
            client.close();
        });
    }
});

