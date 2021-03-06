import React, { useState } from "react";
import myCSS from "./QuizCreator.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {
  createControl,
  validate,
  validateForm,
} from "../../utils/FormFramework/FormFramework";
import Select from "../../UI/Select/Select";
import { connect } from "react-redux";
import { setQuiz, addNewQuiz } from "../../redux/reducers/createReducer";

const createAnswersControl = () => {
  let answers = [];
  for (let index = 0; index < 4; index++) {
    answers.push(
      createControl(
        {
          label: "Answer option #" + (index + 1),
          errorMessage: "Value could not be empty",
        },
        { required: true }
      )
    );
  }
  return answers;
};

const initialFormControls = {
  question: createControl(
    {
      label: "Enter question",
      errorMessage: "Question could not be empty",
    },
    { required: true }
  ),
  answers: createAnswersControl(),
};

const QuizCreator = ({ quiz, setQuiz, addNewQuiz }) => {
  // const [quiz, setQuiz] = useState([]);
  const [rightAnswerId, setRightAnswerId] = useState(1);
  const [isFormValid, setFormValid] = useState(false);
  const [formControls, setControls] = useState(initialFormControls);

  const resetForm = () => {
    setControls({
      question: createControl(
        {
          label: "Enter question",
          errorMessage: "Question could not be empty",
        },
        { required: true }
      ),
      answers: createAnswersControl(),
    });
    setRightAnswerId(1);
    setFormValid(false);
  };

  const addQuestionHandler = (evt) => {
    evt.preventDefault();
    let localQuiz = [...quiz];
    const index = localQuiz.length + 1;
    const quizAnswers = formControls.answers.map((answer, index) => ({
      id: index + 1,
      text: answer.value,
    }));
    const questionItem = {
      question: formControls.question.value,
      id: index,
      rightAnswerId: rightAnswerId,
      answers: quizAnswers,
    };
    localQuiz.push(questionItem);
    setQuiz(localQuiz);

    // reseting from
    resetForm();
  };

  const addQuizHandler = (evt) => {
    evt.preventDefault();
    addNewQuiz(quiz);
    resetForm();
    setQuiz([])
  };

  const selectChangeHandler = (evt) => {
    setRightAnswerId(+evt.target.value);
  };

  const inputChangeHangler = (value, controlName, index) => {
    const localFormControls = { ...formControls };
    const control =
      controlName === "answer"
        ? { ...formControls.answers[index] }
        : { ...formControls.question };
    control.touched = true;
    control.value = value;
    control.valid = validate(value, control.validation);
    if (controlName === "answer") localFormControls.answers[index] = control;
    else localFormControls.question = control;
    setControls(localFormControls);

    // checking whole form to be valid
    setFormValid(validateForm(localFormControls));
  };

  const rederInput = (control, name, index) => {
    return (
      <Input
        key={index}
        {...control}
        shouldValidate={!!control.validation}
        onChange={(evt) => {
          inputChangeHangler(evt.target.value, name, index);
        }}
      />
    );
  };
  const renderInputs = () => {
    return (
      <>
        {rederInput(formControls.question, "question")}
        <hr />
        {formControls.answers.map((answer, index) => {
          return rederInput(answer, "answer", index);
        })}
      </>
    );
  };

  return (
    <div className={myCSS.QuizCreator}>
      <div>
        <h1>Create new quiz</h1>
        <form onSubmit={evt => evt.preventDefault()}>
          {renderInputs()}

          <Select
            label="Choose right answer"
            value={rightAnswerId}
            onChange={selectChangeHandler}
            options={[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 },
              { text: 4, value: 4 },
            ]}
          />
          <Button
            type="primary"
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Add question
          </Button>
          <Button
            type="success"
            onClick={addQuizHandler}
            disabled={quiz.length === 0}
          >
            Create test
          </Button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quiz: state.create.quiz,
  };
};

export default connect(mapStateToProps, { setQuiz, addNewQuiz })(QuizCreator);
