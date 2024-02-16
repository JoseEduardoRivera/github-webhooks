import { Request, Response } from "express";
import { GithubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";


export class GitHubController {

    constructor(
        private readonly githubService = new GithubService(),
        private readonly discordService = new DiscordService()
    ){}

    webHookHandler = (req:Request, res:Response) => {


        const githubEvent = req.header('x-github-event') ?? 'unknown';
        const signature = req.header('x-hub-signature-256') ?? 'unknown';
        const payload = req.body;
        let message:string;

        switch(githubEvent) {
            case 'star':
                message =   this.githubService.onStar(payload)
            break;

            case 'issues':
                message = this.githubService.onIssue(payload)
            break;

            default:
                message = `Unknown github event ${githubEvent}`
                
        }

        this.discordService.notify(message)
        .then(()=> res.send('Acepted'))
        .catch(()=> res.status(500).json({
            error: 'Internal Server Error'
        }))
    }



}