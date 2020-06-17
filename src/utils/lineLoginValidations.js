import { navigate } from "gatsby"
import { logout, handleLogin } from "./auth"
import { addVisit } from "./railsVisits"

export async function getIdToken(code) {
	const params = `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.GATSBY_API_URL}&client_id=1654318519&client_secret=26e02bf88250345262e5d0cf7aab03f8`;
  const response = await fetch(`https://api.line.me/oauth2/v2.1/token`, {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: params
  })
  // 'json' contains the various tokens provided by 'api.line.me/oauth2...'
  const json = await response.json();
  return json;
}

export async function getPerson(json) {
  const personal_data = await fetch(`https://api.line.me/oauth2/v2.1/verify`, {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `id_token=${json.id_token}&client_id=1654318519`
  });
  const person = await personal_data.json()
  return person;
}

export const validateIdToken = (json) => {
  const base64Url = json.id_token.split('.')[1]; // json.id_token you get
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
}

export const checkValidation = (surveyPost, json, person, decodedData) => {
  if (JSON.stringify(person) === JSON.stringify(decodedData)) {
    handleLogin(person)
    addVisit(person.name, person.picture) // Record page visit in Rails
    surveyPost.setState({ person: person, id_token: json.id_token });
  } else {
    alert("ข้อมูลรับรองของคุณไม่ผ่านการตรวจสอบ");
		logout(() => navigate(`/`))
  }
}