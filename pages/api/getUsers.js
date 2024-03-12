import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [users] = await db.query('SELECT * FROM users');
      res.status(200).json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ error: 'Error getting users' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
