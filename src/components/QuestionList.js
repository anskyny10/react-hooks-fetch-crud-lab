import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList( { questions, deleteQuestion, updateAnswer } ) {
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => <QuestionItem key={question.id} question={question} deleteQuestion={deleteQuestion} updateAnswer={updateAnswer}/>)}
      </ul>
    </section>
  );
}

export default QuestionList;
