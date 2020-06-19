import { makeState } from './makeState';

// This is URL provided by FB Platform for logging into this app via FB.
export const fbLoginURL = () => {
  return `
    https://www.facebook.com/v7.0/dialog/oauth?client_id=1153251771692328&redirect_uri=${process.env.GATSBY_API_URL}&state=${makeState(10)}&locale=th_TH
  `
}
