import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postAssessment } from "../components/AcademySlice";
import "./CreateAssessment.css";

const CreateAssessment = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [moduleList, setModuleList] = useState([
    { moduleName: "", questions: [{ question: "" }] },
  ]);

  const questionHandler = (e, moduleIndex, questionIndex) => {
    const updatedModules = [...moduleList];
    updatedModules[moduleIndex].questions[questionIndex].question =
      e.target.value;
    setModuleList(updatedModules);
  };

  const addModuleHandler = (e) => {
    e.preventDefault();
    setModuleList((prevModuleList) => [
      ...prevModuleList,
      { moduleName: "", questions: [{ question: "" }] },
    ]);
  };

  const removeModuleHandler = (index) => {
    const updatedModules = [...moduleList];
    updatedModules.splice(index, 1);
    setModuleList(updatedModules);
  };

  const addQuestionHandler = (moduleIndex) => {
    const updatedModules = [...moduleList];
    updatedModules[moduleIndex].questions.push({ question: "" });
    setModuleList(updatedModules);
  };

  const removeQuestionHandler = (moduleIndex, questionIndex) => {
    const updatedModules = [...moduleList];
    updatedModules[moduleIndex].questions.splice(questionIndex, 1);
    setModuleList(updatedModules);
  };

  const onSubmit = (data) => {
    console.log("Assessment Data:", data);

    const filteredModules = data.modules.filter((module) => {
      if (!module.moduleName.trim()) {
        return false;
      }
      module.questions = module.questions.filter((question) => {
        return !!question.question.trim();
      });

      return true;
    });

    data.modules = filteredModules;

    dispatch(postAssessment(data))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    reset();
  };

  return (
    <div className="container-create-assessment">
      <form
        className="form-container-create-assessment"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="assessment-title">Create Assessment Page</h1>
        <div>
          <h2 className="section-title">Assessment Name:</h2>
          <input
            {...register("assessmentName", { required: true })}
            type="text"
            className="input-field assessment-name"
          />
          {errors.assessmentName && (
            <p className="create-assessment-error">
              Assessment Name is required.
            </p>
          )}
          <h2 className="section-title">Assessment Description:</h2>
          <input
            {...register("assessmentDescription", { required: true })}
            type="text"
            className="input-field assessment-description"
          />
          {errors.assessmentDescription && (
            <p className="create-assessment-error">
              Assessment Description is required.
            </p>
          )}
          {moduleList.map((module, moduleIndex) => (
            <div key={moduleIndex}>
              <h2 className="section-title">Module Name:</h2>
              <input
                {...register(`modules.${moduleIndex}.moduleName`, {
                  required: true,
                })}
                type="text"
                className="input-field module-name"
              />
              {errors.modules && errors.modules[moduleIndex]?.moduleName && (
                <p className="create-assessment-error">
                  Module Name is required.
                </p>
              )}
              {module.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="question-container">
                  <h2>Question:</h2>
                  <input
                    {...register(
                      `modules.${moduleIndex}.questions.${questionIndex}.question`,
                      { required: true }
                    )}
                    onChange={(e) =>
                      questionHandler(e, moduleIndex, questionIndex)
                    }
                    type="text"
                    className="input-field"
                  />
                  {errors.modules &&
                    errors.modules[moduleIndex]?.questions &&
                    errors.modules[moduleIndex].questions[questionIndex]
                      ?.question && (
                      <p className="create-assessment-error">
                        Question is required.
                      </p>
                    )}
                  <div className="button-container">
                    <button
                      onClick={() =>
                        removeQuestionHandler(moduleIndex, questionIndex)
                      }
                      className="remove-question-button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => addQuestionHandler(moduleIndex)}
                className="add-question-button"
              >
                Add Question
              </button>
              {moduleIndex > 0 && (
                <button
                  onClick={() => removeModuleHandler(moduleIndex)}
                  className="remove-module-button"
                >
                  Remove Module
                </button>
              )}
            </div>
          ))}
          <button onClick={addModuleHandler} className="add-module-button">
            Add Module
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssessment;
