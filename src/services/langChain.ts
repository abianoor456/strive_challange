// src/services/LangChainService.ts
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableConfig, RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { CodeReviewResponse } from '@types/index';
import { guard } from '@utils/error';
import { codeReviewPrompt } from '@utils/prompts';

// Instantiate your model
const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
});

// Define the prompt template with a placeholder for message history
const prompt = ChatPromptTemplate.fromMessages([
    ["ai", "You are a code review assistant."],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
]);

// Create the runnable that chains the prompt to the model
const runnable = prompt.pipe(llm);

// Initialize the session history store
const messageHistory = new ChatMessageHistory();

// Use `RunnableWithMessageHistory` to integrate history management
const withHistory = new RunnableWithMessageHistory({
    runnable,
    getMessageHistory: (_sessionId: string) => messageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history",
});

// Define a session configuration for history tracking
const config: RunnableConfig = { configurable: { sessionId: "1" } };

export class LangChainService {
    static async getCodeReview(fileContent: string): Promise<CodeReviewResponse> {
        try {
            const promptMessage = codeReviewPrompt(fileContent);

            console.log('messageHistory', messageHistory)
            // Invoke the LLM with memory support and the prompt message
            const response = await withHistory.invoke(
                { input: promptMessage },
                config
            );

            if (!response) {
                guard.internalServer('Received empty response from LLM');
            }

            console.log('response:', response.content);

            return JSON.parse(response.content as string) as CodeReviewResponse;
        } catch (error) {
            console.error('Error processing code review:', error);
            guard.internalServer('Error with code review processing');
            return { score: 0, reasoning: {} as CodeReviewResponse['reasoning'] };
        }
    }
}
