export const codeReviewPrompt = (fileContent: string) => `
Please review the following code and return a structured JSON response with the following fields:
- "score": an overall score out of 100.
- "reasoning": a detailed breakdown that includes:
  - "readability": an object with "score" out of 25 and "reasoning" describing readability.
  - "functionality": an object with "score" out of 25 and "reasoning" describing functionality.
  - "errorHandling": an object with "score" out of 25 and "reasoning" describing error handling.
  - "bestPractices": an object with "score" out of 25 and "reasoning" describing best practices.

Return the result in this JSON format:

{
  "score": 85,
  "reasoning": {
    "readability": { "score": 20, "reasoning": "Explanation for readability." },
    "functionality": { "score": 25, "reasoning": "Explanation for functionality." },
    "errorHandling": { "score": 20, "reasoning": "Explanation for error handling." },
    "bestPractices": { "score": 20, "reasoning": "Explanation for best practices." }
  }
}

Here is the code to review:\n\n${fileContent}`;
