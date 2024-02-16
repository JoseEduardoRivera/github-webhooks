import 'dotenv/config'
import {get} from 'env-var'

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    DISCORD_URL: get('DISCORD_LISTENER_URL').required().asString()
}