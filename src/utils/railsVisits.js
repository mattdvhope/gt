import axios from 'axios'

export const persistUser = (profile) => {
  const { id, name, picture } = profile;
  console.log("fb_id??????..", id)
  console.log(name)
  console.log(picture.data.url)

  // axios.post(`http://localhost:3000/users`, {
  // axios.post(`https://nameless-coast-54274.herokuapp.com/users`, {
  //   name: name, picture: picture.data.url, fb_id: id
  // })
  // .then(response => {
  //   console.log(response)
  //   return response.data.message;
  // })

}











// FUNCTIONS (BELOW) FOR LATER!!!!!!
export const linkVisit = () => {
	console.log("in linkVisit");
  // const user_data = JSON.parse(sessionStorage.getItem("user_data"));
  // let visits = user_data.user.visits
  // persistQuestions(user_data.user.name, user_data.user.picture)
  // console.log(visits + 1)
}

export async function addVisit(name, picture) {
	console.log("in addVisit");
	console.log(name);
	console.log(picture);
  // const saved_person = await fetch(`https://graphql-rails-pg1.herokuapp.com/users`, {
  // // const saved_person = await fetch(`http://localhost:3000/users`, {
  //   method: 'POST',
  //   headers: {'Content-Type':'application/x-www-form-urlencoded'},
  //   body: `name=${name}&picture=${picture}`
  // });
  // const saved_person_data = await saved_person.json()
  // sessionStorage.setItem("user_data", JSON.stringify(saved_person_data))
}

export async function persistQuestions(questions, selected) {
  // axios.post(`https://nameless-coast-54274.herokuapp.com/questions`, {
  axios.post(`http://localhost:3000/questions`, {
    selected: selected
  })
  .then(response => {
  	console.log(response)
    return response.data.message;
  })
  // .then(message => {
  //   if (message === "Successful creation of new class time!!") {
  //     navigate('app/view-class-times');
  //   } else {
  //     console.log("STILL ERRORS");
  //   }
  // });
}