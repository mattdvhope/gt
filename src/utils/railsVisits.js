import axios from 'axios'

export const linkVisit = () => {
	console.log("in linkVisit");
  // const user_data = JSON.parse(sessionStorage.getItem("user_data"));
  // let visits = user_data.user.visits
  // persistQuestions(user_data.user.name, user_data.user.picture)
  // console.log(visits + 1)
}


export async function persistQuestions(questions, selected) {

	

  axios.post(`https://nameless-coast-54274.herokuapp.com/questions`, {
  // axios.post(`http://localhost:3000/questions`, {
    
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