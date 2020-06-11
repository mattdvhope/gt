export const preventTooManyChoices = (selected_in_question, one_selected, question) => {
	selected_in_question.push(one_selected);
	if (selected_in_question.length > 1){
		selected_in_question.shift();
	}
	question.selected = selected_in_question[0]
	return question;
}

export const updatedQuestions = (questions, question) => {
	const newQuestions = questions.map(obj =>
    obj.id === question.id ? { ...obj, selected: question.selected } : obj
	);
	return newQuestions;
}

export const final_selections_of_choices = (questions) => {
  let final_answers = []      
  questions.map((question) => {
    const selected = question.selected;
    final_answers.push(selected)
  })
  return final_answers;
}