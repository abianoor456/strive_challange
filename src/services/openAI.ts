// src/services/OpenAIService.ts
import OpenAI from 'openai';
import { CodeReviewResponse } from '@types/index';
import { codeReviewPrompt } from '@utils/prompts';
import { guard } from '@utils/error';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export class OpenAIService {
    static async getCodeReview(fileContent: string): Promise<CodeReviewResponse> {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'You are a code review assistant.' },
                    {
                        role: 'user',
                        content: codeReviewPrompt(fileContent),
                    },
                ],
            });

            const content = response.choices[0].message.content;
            if (content === null) {
                throw new Error('Received null content from OpenAI response');
            }

            const parsedContent: CodeReviewResponse = JSON.parse(content);
            return parsedContent;
        } catch (error) {
            console.error('Error with OpenAI API:', error);
            guard.internalServer('Failed to process the code review');
            return { score: 0, reasoning: {} as CodeReviewResponse['reasoning'] };
        }
    }
}
