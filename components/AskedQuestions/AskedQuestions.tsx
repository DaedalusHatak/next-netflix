import { useState } from "react";
import styles from "./AskedQuestions.module.scss";
import GetStartedForm from "../GetStartedForm/GetStartedForm";
import Answer from "../Answer/Answer";
import { useQuestions } from "./useQuestions";

export default function AskedQuestions() {
  const note = "Note that this is only demonstration website!";
  const [questions, setQuestion] = useState(useQuestions);

  function handleActive(question: any, hide?: any) {
    const updateQuestions = [...questions];
    updateQuestions[question].isActive = !updateQuestions[question].isActive;
    setQuestion(updateQuestions);
    console.log(questions[question]);
  }
  return (
    <>
      <div className={styles["ask-section"]}>
        <h2 className={styles.h2}>Frequently Asked Questions</h2>

        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <h3 className={styles.h3}>
                <button
                  className={styles.button}
                  onClick={() => handleActive(index)}
                >
                  {question.name}

                  <p className={styles["add-sign"]}>
                    <svg
                      className={styles.svg}
                      fill="currentColor"
                      height="800px"
                      width="800px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 330 330"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                      />
                    </svg>
                  </p>
                </button>
              </h3>
              <Answer
                question={question}
                note={note}
                styles={styles}
              ></Answer>
            </li>
          ))}
        </ul>

        <GetStartedForm></GetStartedForm>
      </div>
    </>
  );
}
