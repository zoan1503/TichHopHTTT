const db = require('./database')

module.exports = {
    add: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const fullname = req.body.fullname;
        const address = req.body.address;
        const birth = req.body.birth;
        const cccd = req.body.cccd;
        const gender = req.body.gender;

        const gender2 = (gender == 'Nam') ? 1 : 0;
        const birth2 = birth[6] + birth[7] + birth[8] + birth[9] + '-' + birth[3] + birth[4] + '-' + birth[0] + birth[1]

        const insertQuery = "INSERT INTO user (username, password, fullname, address, birth, gender, cccd) VALUES(?, ?, ?, ?, ?, ?, ?)"


        db.query(insertQuery, [username, password, fullname, address, birth2, gender2, cccd], (err, results) => {
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