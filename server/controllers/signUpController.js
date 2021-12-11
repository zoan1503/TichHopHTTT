const db = require('./database')

module.exports = {
    add: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const fullname = req.body.fullname;
        const address = req.body.address;
        const age = req.body.age;
        const email = req.body.email;

        const insertQuery = "INSERT INTO users (username, password, fullname, address, email, age) VALUES(?, ?, ?, ?, ?, ?)"


        db.query(insertQuery, [username, password, fullname, address, email, age], (err, results) => {
            if (err) {
                console.log("insert error");
                res.send(err)
            }
            else {
                res.send({ error: false, data: results, message: 'user has been add successfully!', isSignUp: 1 });
            }

        });
    },

}