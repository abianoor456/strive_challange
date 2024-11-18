import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableConfig, RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { guard } from '@utils/error';
import { codeReviewPrompt } from '@utils/prompts';
import { CodeReviewResponse } from "@/types";

// instantiate model
const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
});

const prompt = ChatPromptTemplate.fromMessages([
    ["ai", "You are a code review assistant."],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
]);

// runnable that chains the prompt to the model
const runnable = prompt.pipe(llm);

// initialize session history storeage
const messageHistory = new ChatMessageHistory();

// integrate history management
const withHistory = new RunnableWithMessageHistory({
    runnable,
    getMessageHistory: (_sessionId: string) => messageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history",
});

const config: RunnableConfig = { configurable: { sessionId: "1" } };

export class LangChainService {

    /**
     * Retrieves a code review response from the AI model, given a fileContent string.
     * The fileContent should be a string representing the code to be reviewed.
     * The response will be a JSON object with the following format:
     * {
     *     score: number,
     *     reasoning: {
     *         readability: { score: number, reasoning: string },
     *         functionality: { score: number, reasoning: string },
     *         errorHandling: { score: number, reasoning: string },
     *         bestPractices: { score: number, reasoning: string },
     *     },
     * }
     * @param fileContent string representing the code to be reviewed
     * @returns Promise<CodeReviewResponse> a JSON object with the code review response
     */
    static async getCodeReview(fileContent: string): Promise<CodeReviewResponse> {
        try {
            const promptMessage = codeReviewPrompt(fileContent);

            const response = await withHistory.invoke(
                { input: promptMessage },
                config
            );

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
