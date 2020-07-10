import { navigate } from "gatsby"
import { logout, handleLogin } from "./auth"
import { addVisit } from "./railsVisits"

export async function getAccessToken(code) {
alert(code)
  const params = `client_id=${process.env.GATSBY_FB_APP_CLIENT_ID}&redirect_uri=${process.env.GATSBY_API_URL}&client_secret=c88e4dcb888f1d3fee4c796d7a6e6dcd&code=${code}`;
alert(process.env.GATSBY_FB_APP_CLIENT_ID)
alert(process.env.GATSBY_API_URL)
  const response = await fetch(`https://graph.facebook.com/v7.0/oauth/access_token?${params}`)
  const json = await response.json();
alert(JSON.stringify(json))
  return json.access_token;
}

export async function inspectAccessToken(token) {
  const params = `input_token=${token}&access_token=${token}`;
  const response = await fetch(`https://graph.facebook.com/v7.0/debug_token?${params}`)
  const json = await response.json();
alert(JSON.stringify(json))
  return json;
}

export async function getUserProfile(user_id, token) {
  const response = await fetch(`https://graph.facebook.com/v7.0/${user_id}?fields=id,name,first_name,middle_name,last_name,name_format,picture,short_name,email&access_token=${token}`)
  const json = await response.json();
  return json;
}