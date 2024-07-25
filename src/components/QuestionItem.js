import React, { useState } from "react";

function QuestionItem({ question, deleteQuestion, updateAnswer }) {
  
  const { id, prompt, answers, correctIndex } = question;

  const [newAnswer, setNewAnswer] = useState(correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`,
      {method: "DELETE"}
    )
    .then(res => {
      if(res.ok){
        deleteQuestion(id)
      } else {
        throw Error('delete went wrong')
      }
    })
    .catch(err => console.error('couldnt reach server'))
  }

  const handleNewAnswer = (e) => {
    setNewAnswer(e.target.value);
    handleUpdateAnswer();
  }

  const handleUpdateAnswer = () => {
    fetch(`http://localhost:4000/questions/${id}`,
      {method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correctIndex: parseInt(newAnswer)})
      }
    )
    .then(res => {
      if(res.ok) {
        return res.json()
        } else {
        throw Error('patch went wrong')
      }
    })
    .then(data => {
      updateAnswer(data)
    })
    .catch(err => console.error('couldnt reach server'))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleNewAnswer}>{options}</select>
      </label>
      <button className= "delete" onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
