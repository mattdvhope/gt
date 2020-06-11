export const rubyQuestions = questions => {

  return questions.map((question) => {
  	add_question_id_to_choices(question.questionChoices, question) 
		return question;
  })

}

const add_question_id_to_choices = (questionChoices, question) => {
	return questionChoices.map((choice) => {
		return choice.question_id = question.id;
	})
}
