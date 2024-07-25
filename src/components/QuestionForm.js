import React, { useState } from "react";

function QuestionForm( { url, addQuestion }) {
  
  let [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let { prompt, answer1, answer2, answer3, answer4, correctIndex } = formData;

    let updatedFormData = {
      prompt: prompt,
      answers: [answer1, answer2, answer3, answer4],
      correctIndex: parseInt(correctIndex, 10)
    }

    fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedFormData),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error("failed to submit")
      }
    })
    .then(data => {
      // console.log("Question added:", data);
      addQuestion({
        id: data.id,
        ...updatedFormData,
      });
      setFormData({
        prompt: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        correctIndex: 0
      })
    })
    .catch(err => console.error("couldn't reach server"))
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
