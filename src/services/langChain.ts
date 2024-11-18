import { ChatOpenAI } from "@langchain/openai";
import { CodeReviewResponse } from '@types/index';
import { guard } from '@utils/error';
import { codeReviewPrompt } from '@utils/prompts';

const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
});

export class LangChainService {
    static async getCodeReview(fileContent: string): Promise<CodeReviewResponse> {
        try {
            const promptMessage = codeReviewPrompt(fileContent);
            const response = await llm.invoke([
                { role: 'system', content: 'You are a code review assistant.' },
                {
                    role: 'user',
                    content: promptMessage
                },
            ]);

            console.log('response', response.content);
            if (!response) {
                guard.internalServer('Received empty response from LLM');
            }

            return JSON.parse(response.content as string) as CodeReviewResponse;
        } catch (error) {
            console.error('Error processing code review:', error);
            guard.internalServer('Error with code review processing');
            return { score: 0, reasoning: {} as CodeReviewResponse['reasoning'] };
        }
    }
}
