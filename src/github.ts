import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: `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` });

export const getRepository = async (owner: string, repo: string) => {
    try {
        const { data } = await octokit.repos.get({ owner, repo });
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

import { Request, Response } from 'express';

export const handleWebhook = async (req: Request, res: Response) => {
    const { action, repository, pull_request } = req.body;
    if (action === 'opened' || action === 'synchronize') {
        const owner = repository.owner.login;
        const repo = repository.name;
    }
};
