const { db} = require('../config/db');

const getFeedBackById = async (id) => {
    try {
        const query = 'SELECT U.name,  d. FeedBack FROM users U JOIN FeedBack d ON U.id = d.user_id WHERE U.id = $1;';
        const { rows } = await db.query(query, [id]);
        return rows;
    } catch (err) {
        console.log('Error getting FeedBack by id', err);
        throw new Error(err);
    }

}

const createFeedBack = async (feedBack, user_id) => {
    try {
        const query = 'INSERT INTO FeedBack (feedback, user_id, createAt) VALUES ($1, $2, NOW()) RETURNING *;';
        const { rows } = await db.query(query, [feedBack.feedback, user_id]);
        return rows[0];
    } catch (err) {
        console.log('Error creating FeedBack', err);
        throw new Error(err);
    }
}

module.exports = { getFeedBackById, createFeedBack};