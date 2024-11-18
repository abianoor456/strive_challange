// src/services/OpenAIService.ts
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export class OpenAIService {
    static async getCodeReview(fileContent: string): Promise<string> {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'You are a code review assistant.' },
                    {
                        role: 'user',
                        content: `Please review the following code and provide a score out of 100. Evaluate it based on:
            - Readability
            - Functionality
            - Error Handling
            - Best Practices

            Here is the code:\n\n${fileContent}`,
                    },
                ],
            });

            const content = response.choices[0].message.content;
            if (content === null) {
                throw new Error('Received null content from OpenAI response');
            }

            return content;
        } catch (error) {
            console.error('Error with OpenAI API:', error);
            throw new Error('Failed to process the code review');
        }
    }
}
