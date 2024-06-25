
import Configuration, { ClientOptions } from 'openai';
import { OpenAI } from 'openai';

const configuration = new Configuration({
    apiKey: 'sk-proj-ZmwjIT03D6f3XL59rLmOT3BlbkFJGsweUwB9n3BOl8pSycVq',
});

const openai = new OpenAI(configuration as any) as any;

export const analyzeCode = async (code: string) => {
    try {
        const response = await openai.createCompletion({
            model: 'code-davinci-002',
            prompt: `Analyze the following code for syntax, style, performance, and security issues:\n${code}\n`,
            max_tokens: 1024,
        });
        return response.data.choices[0].text;
    } catch (error) {
        console.error(error);
        return null;
    }
};
