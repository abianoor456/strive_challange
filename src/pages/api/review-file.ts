// src/pages/api/review.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { ReviewDto } from '../../dto/review.dto';

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
  const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/git/blobs/${dto.fileSha}`;

  try {
    const fileResponse = await axios.get(githubApiUrl, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });

    const fileContent = Buffer.from(fileResponse.data.content, 'base64').toString('utf-8');
    console.log("fileContent:", fileContent);

    const llmResponse = {
      data: {
        score: 85, 
        reasoning: 'The code follows best practices but could improve on documentation and error handling.',
      },
    };

    res.status(200).json({
      score: llmResponse.data.score,
      reasoning: llmResponse.data.reasoning,
    });
  } catch (error) {
    console.error('Error fetching file or calling LLM:', error);
    res.status(500).json({ message: 'Error fetching file or analyzing code.' });
  }
}
