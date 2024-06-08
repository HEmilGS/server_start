const { db} = require('../config/db');

const getDescriptionById = async (id) => {
    try {
        const query = 'SELECT U.name,  d.description, d.prescription  FROM users U JOIN description d ON U.id = d.user_id WHERE U.id = $1;';
        const { rows } = await db.query(query, [id]);
        return rows;
    } catch (err) {
        console.log('Error getting description by id', err);
        throw new Error(err);
    }

}

const createDescription = async (description, prescription, user_id) => {
    try {
        const query = 'INSERT INTO description (description, prescription, user_id) VALUES ($1, $2, $3) RETURNING *;';
        const { rows } = await db.query(query, [description, prescription, user_id]);
        return rows[0];
    } catch (err) {
        console.log('Error creating FeedBack', err);
        throw new Error(err);
    }
}

module.exports = { getDescriptionById, createDescription };