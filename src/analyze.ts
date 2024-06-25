
import axios from 'axios';

export async function analyzeCode(code: string): Promise<string | null> {
  try {
    const response = await axios.post('https://api.openai.com/v1/codex/completions', {
      prompt: `Analyze the following code for syntax, style, performance, and security issues:\n\n${code}\n\n`,
      max_tokens: 150,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error analyzing code:', error);
    return null;
  }
}
