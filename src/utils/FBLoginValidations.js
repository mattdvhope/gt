import { navigate } from "gatsby"
import { logout, handleLogin } from "./auth"
import { addVisit } from "./railsVisits"

export async function getClientAccessToken(code) {
  const params = `client_id=${process.env.GATSBY_FB_APP_CLIENT_ID}&redirect_uri=${process.env.GATSBY_API_URL}&client_secret=8eef4a89221d26750c5309ab244dfe6f&code=${code}`;
  const response = await fetch(`https://graph.facebook.com/v7.0/oauth/access_token?${params}`)
  const json = await response.json();
  return json.access_token;
}

export async function getWebAccessToken() {
  const params = `client_id=${process.env.GATSBY_FB_APP_CLIENT_ID}&client_secret=8eef4a89221d26750c5309ab244dfe6f&grant_type=client_credentials`
  const response = await fetch(`https://graph.facebook.com/v7.0/oauth/access_token?${params}`)
  const json = await response.json();
  return json.access_token;
}

export async function inspectAccessToken(clientToken, webToken) {
alert(clientToken)
alert(webToken)
  const params = `input_token=${clientToken}&access_token=${webToken}`;
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