import express from 'express';
import { envs } from './config';
import { GitHubController } from './presentation/github/controller';


(()=>{
main()
})();

function main (){

    const app = express();

    app.use(express.json());

    const controller = new GitHubController()

    app.post('/api/github',controller.webHookHandler)

    app.listen(envs.PORT, ()=> {
        console.log('App listening on port '+envs.PORT);
        
    })



}