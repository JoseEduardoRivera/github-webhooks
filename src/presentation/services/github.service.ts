import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";


export class GithubService {
    

    constructor(){}

    onStar(payload:GitHubStarPayload):string {
        let message:string = '';

        const { starred_at, action, sender, repository } = payload;

        if (starred_at) {
            message =  `User ${sender.login} ${action} star on ${repository.full_name}`
        } else {
            message = ` not starred`
        }
        
        return message;
    }

    onIssue(payload:GitHubIssuePayload):string {
        let message:string = '';

        const { action, issue, repository } = payload;

        if (action === 'oppened') {
            message  = `An Issue was oppened with title ${issue.title}`
            return message;
        }
        if (action === 'closed') {
            message  = `An Issue was closed by ${issue.user.login} with title ${issue.title} on ${repository.full_name}`
            return message;
        }
        if (action === 'reopened') {
            message  = `An Issue was reopened by ${issue.user.login} with title ${issue.title} on ${repository.full_name}`
            return message;
        }

        return  `Unhandled action for inssue event ${action}`;
        
    }
}