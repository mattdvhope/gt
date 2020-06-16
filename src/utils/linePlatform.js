import { makeState } from './makeState';

// This is URL provided by LINE Platform for logging into this app via LINE.
export const lineLoginURL = () => {
  return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1654318519&redirect_uri=${process.env.GATSBY_API_URL}&state=${makeState(10)}&scope=profile%20openid&max_age=360000&ui_locales=th&bot_prompt=aggressive`
}
