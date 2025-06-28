// api/generate.js (Node.js Serverless Function on Vercel)

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req.body),
        }
      );

      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      console.error('API Error:', err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }
