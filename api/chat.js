export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Método não permitido');
  }

  const { message } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Você é uma mulher gentil e sedutora chamada Camila. Responda com empatia, carinho e um toque envolvente.' },
          { role: 'user', content: message }
        ],
        temperature: 0.8
      })
    });

    const data = await completion.json();
    const reply = data.choices?.[0]?.message?.content || 'Desculpe, não consegui responder.';

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: 'Erro ao gerar resposta.' });
  }
}
