const db = require('./database')

module.exports = {


    get_all_review_book: (req, res) => {
        id_user = req.query.id_user;
        let sql = 'select books.id_book, book_title, author, description, image_url, review_id, content_review, review.id_user, users.username, rate.avgRating from books inner join review on books.id_book = review.id_book  inner join users on review.id_user = users.id_user and users.id_user = ? left join (SELECT FORMAT(AVG(rating_value), 1) AS avgRating, count(rating_value) as counting, id_book FROM rating GROUP BY id_book ) rate on rate.id_book = books.id_book order by review_id desc'
        db.query(sql, [id_user], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    get_all_rating_book: (req, res) => {
        id_user = req.body.id_user;
        let sql = 'select book_title, rating_value, image_url, author  from rating, books where rating.id_book = books.id_book and id_user = ?'
        db.query(sql, [id_user], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    get_all_reaction: (req, res) => {
        id_user = req.query.id_user;
        let sql = 'select books.id_book, book_title, image_url, reaction.reaction_id, reaction.review_id, content_review, review.id_user as reviewer_id, user2.username as reviewer, users.username as user_react, reaction.id_user, reaction.reaction_choice from reaction inner join review on reaction.review_id = review.review_id inner join books on books.id_book = review.id_book inner join users user2 on user2.id_user = review.id_user inner join users on reaction.id_user = users.id_user and users.id_user = ? order by reaction_id desc'
        db.query(sql, [id_user], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    get_all_user_info: (req, res) => {
        let id_user = req.query.id_user;
        let sql = 'select * from users where id_user = ?'
        db.query(sql, [id_user], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    check_signin: (req, res) => {
        let username = req.query.username;
        let password = req.query.password;
        let sql = 'select * from users where username = ? and password = ?'
        db.query(sql, [username, password], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    update_info: (req, res) => {
        let newAge = req.body.age;
        let newEmail = req.body.email;
        let newAddress = req.body.address;
        let newFullName = req.body.fullname;
        let id_user = req.body.id_user;
        let sql = 'UPDATE users SET age = ?, email = ?, address = ?, fullname = ? WHERE id_user = ?'
        db.query(sql, [newAge, newEmail, newAddress, newFullName, id_user], (err, response) => {
            console.log(sql)
            if (err) throw err
            res.json({ message: 'Update user success!' })
        })
    },
    update_pass: (req, res) => {
        let id_user = req.body.id_user
        let newPassword = req.body.password;
        console.log(newPassword);
        let sql = 'UPDATE users SET password = ? WHERE id_user = ?'
        db.query(sql, [newPassword, id_user], (err, response) => {
            console.log(sql)
            if (err) throw err
            res.json({ message: 'Update pass success!', isChanged: 1 })

        })
    },
}