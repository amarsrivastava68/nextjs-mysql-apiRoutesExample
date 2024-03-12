import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    try {
      const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
      res.status(200).json({ id: result.insertId });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Error adding user' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
