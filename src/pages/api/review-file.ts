// src/pages/api/review.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { ReviewDto } from '../../dto/review.dto';

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: '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'
  });


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const dto = new ReviewDto(req.body);

  if (!dto.isValid()) {
    return res.status(400).json({ message: 'Invalid GitHub URL or SHA format.' });
  }

  const repoDetails = dto.getOwnerAndRepo();
  if (!repoDetails) {
    return res.status(400).json({ message: 'Invalid GitHub repository URL.' });
  }

  const { owner, repo } = repoDetails;
  console.log('owner', owner);
  console.log('repo', repo);
  console.log('/${dto.fileSha}', dto.fileSha);
  const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/git/blobs/${dto.fileSha}`;

  console.log('githubApiUrl',githubApiUrl
  );
  try {
    const fileResponse = await axios.get(githubApiUrl, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });

    const fileContent = Buffer.from(fileResponse.data.content, 'base64').toString('utf-8');
    console.log("fileContent:", fileContent);

    // Use GPT-4o Mini for code review
    const openAiResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a code review assistant.',
          },
          {
            role: 'user',
            content: `Please review the following JavaScript code and provide a score out of 100. Evaluate it based on:\n\n- Readability: Is the code clear and easy to understand?\n- Functionality: Does the code achieve its intended purpose?\n- Error Handling: Are potential errors handled effectively?\n- Best Practices: Does the code follow modern JavaScript best practices?\n\nHere is the code:\n\n${fileContent}`,
          },
        ],
      });
  
      // Extract score and reasoning from OpenAI response
      const reviewScore = openAiResponse.choices[0].message.content;

      console.log('reviewScore', reviewScore)
    const llmResponse = {
      data: reviewScore
    };

    res.status(200).json({
      score: 80,
      reasoning: llmResponse.data
    });
  } catch (error) {
    console.error('Error fetching file or calling LLM:', error);
    res.status(500).json({ message: 'Error fetching file or analyzing code.' });
  }
}
