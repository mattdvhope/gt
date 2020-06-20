import { navigate } from "gatsby"
import { logout, handleLogin } from "./auth"
import { addVisit } from "./railsVisits"

export async function getAccessToken(code) {
  const params = `client_id=${process.env.GATSBY_FB_APP_CLIENT_ID}&redirect_uri=${process.env.GATSBY_API_URL}&client_secret=8eef4a89221d26750c5309ab244dfe6f&code=${code}`;
  const response = await fetch(`https://graph.facebook.com/v7.0/oauth/access_token?${params}`)
  const json = await response.json();
  return json.access_token;
}

export async function inspectAccessToken(token) {
  const params = `input_token=${token}&access_token=${token}`;
  const response = await fetch(`https://graph.facebook.com/v7.0/debug_token?${params}`)
  const json = await response.json();
  return json;
}

export async function getUserName(user_id, token) {
  const response = await fetch(`https://graph.facebook.com/v7.0/${user_id}?fields=first_name&fields=last_name&access_token=${token}`)
  const json = await response.json();
  console.log("User GRAPH response:", json)
  return json;
}

export async function getUserPicture(user_id, token) {
  const response = await fetch(`https://graph.facebook.com/v7.0/${user_id}/picture?redirect=0&height=200&width=200&type=normal&access_token=${token}`)
  const json = await response.json();
  // console.log(json)
  return json;
}