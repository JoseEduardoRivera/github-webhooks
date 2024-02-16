import { Request, Response } from "express";
import { GithubService } from "../services/github.service";


export class GitHubController {

    constructor(
        private readonly githubService = new GithubService(),
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



        
        console.log({message});
        
        
        res.status(202).send('Accepted')
    }



}