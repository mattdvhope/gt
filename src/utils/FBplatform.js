import { makeState } from './makeState';

// This is URL provided by FB Platform for logging into this app via FB.
export const fbLoginURL = () => {
  return `
    https://www.facebook.com/v7.0/dialog/oauth?client_id=1153251771692328&redirect_uri=https%3A%2F%2Fwin-the-city.netlify.app%2Fsurvey-1&state=${makeState(10)}&locale=th_TH
  `
}
