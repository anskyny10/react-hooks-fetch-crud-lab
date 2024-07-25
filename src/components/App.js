import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const url = "http://localhost:4000/questions";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => setQuestions(data));
  }, []);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion])
  }

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter(question => question.id!== id);
    setQuestions(updatedQuestions);
  }

  const updateAnswer = (newAnswer) => {
    const updatedQuestions = questions.map(question => question.id === newAnswer.id? {...question, correctIndex: newAnswer.correctIndex} : question);
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion} url={url}/> : <QuestionList questions={questions} deleteQuestion={deleteQuestion} updateAnswer={updateAnswer}/>}
    </main>
  );
}

export default App;
