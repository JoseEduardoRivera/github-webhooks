import { envs } from '../../config';

export class DiscordService {

  private readonly discordWebhookUrl = envs.DISCORD_URL;

  constructor() {}

  async notify(message: string){
    const body =  {
        content: message,
        embeds: [
        {
          image: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjZycHVhaG5jcXNqcG43ZWtpMW9vNGYwZnU0OGhuem91Zmh6ZWNnaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif' }
        }
      ]
    }

    const response = await fetch(this.discordWebhookUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        console.log(`Error sending hook to discord ${response}`);
        
    }
  }
  



}