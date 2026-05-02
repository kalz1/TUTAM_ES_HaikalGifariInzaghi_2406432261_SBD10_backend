const { pool } = require('../database/database');

exports.getAllNotes = async () => {
    const result = await pool.query('SELECT id AS "_id", title, content FROM notes ORDER BY created_at DESC');
    return result.rows;
};

exports.createNote = async (title, content) => {
    const result = await pool.query(
        'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING id AS "_id", title, content',
        [title, content]
    );
    return result.rows[0];
};

exports.deleteNote = async (id) => {
    await pool.query('DELETE FROM notes WHERE id = $1', [id]);
};