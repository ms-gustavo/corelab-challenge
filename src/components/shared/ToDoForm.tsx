import React, { useState } from "react";
import { useFormik } from "formik";
import StarIcon from "../StarIcon";
import { ToDoFormProps } from "../../types/todo";
import "./ToDoForm.scss";
import ColorPicker from "../ColorPicker/ColorPicker";
import { createTodo, updateTodo, markTodoAsFavorite } from "../../api/todoApi";
import changeBG from "../../assets/changeBG.svg";
import changeText from "../../assets/changeText.svg";

const ToDoForm: React.FC<ToDoFormProps> = ({
  mode,
  todoId,
  initialValues,
  onTodoCreated,
}) => {
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);

  const formik = useFormik({
    initialValues: initialValues || {
      title: "",
      description: "",
      isFavorite: false,
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      console.log("values", values);
      try {
        if (mode === "create") {
          await createTodo(values);
          formik.resetForm();
          onTodoCreated && onTodoCreated();
        } else if (mode === "update" && todoId) {
          await updateTodo(todoId, values);
        }
        console.log("Form submitted with values:", values);
      } catch (error) {
        console.error("Error submiting form:", error);
      }
      setSubmitting(false);
    },
  });

  const handleTextColorSelect = (color: string) => {
    formik.setFieldValue("textColor", color);
    handleAutoSave();
    setShowTextColorPicker(false);
  };
  const handleBackgroundColorSelect = (color: string) => {
    formik.setFieldValue("backgroundColor", color);
    handleAutoSave();
    setShowBackgroundColorPicker(false);
  };

  const handleAutoSave = async () => {
    if (mode === "update" && todoId) {
      try {
        await updateTodo(todoId, formik.values);
      } catch (error) {
        console.error("Error auto-saving:", error);
      }
    }
  };

  const toggleTextColorPicker = () => {
    setShowTextColorPicker(!showTextColorPicker);
    if (showBackgroundColorPicker) {
      setShowBackgroundColorPicker(false);
    }
  };

  const toggleBackgroundColorPicker = () => {
    setShowBackgroundColorPicker(!showBackgroundColorPicker);
    if (showTextColorPicker) {
      setShowTextColorPicker(false);
    }
  };

  const handleFavoriteToggle = async () => {
    const newFavoriteValue = !formik.values.isFavorite;
    formik.setFieldValue("isFavorite", newFavoriteValue);

    if (mode === "update" && todoId) {
      try {
        await markTodoAsFavorite(todoId);
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={mode === "update" ? "update-margin" : ""}
    >
      <div className="note-creation">
        <div className="input-group">
          <input
            type="text"
            placeholder="Título"
            name="title"
            value={formik.values.title}
            onChange={(e) => {
              formik.handleChange(e);
              handleAutoSave();
            }}
            onBlur={formik.handleBlur}
            className="input-title"
          />
          <div
            className={`star ${formik.values.isFavorite ? "is-favorite" : ""}`}
          >
            <StarIcon
              isFavorite={formik.values.isFavorite}
              onClick={handleFavoriteToggle}
            />
          </div>
        </div>
        {formik.submitCount > 0 &&
          formik.touched.title &&
          formik.errors.title && (
            <div className="error-message">
              {typeof formik.errors.title === "string"
                ? formik.errors.title
                : ""}
            </div>
          )}
        <div className="line"></div>
        {mode === "update" ? (
          <textarea
            name="description"
            placeholder="Descrição"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-description textarea"
          />
        ) : (
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-description"
          />
        )}
        {formik.submitCount > 0 &&
          formik.touched.description &&
          formik.errors.description && (
            <div className="error-message">
              {typeof formik.errors.title === "string"
                ? formik.errors.title
                : ""}
            </div>
          )}
        {mode === "update" && (
          <>
            <div className="color-picker-container">
              <div onClick={toggleTextColorPicker}>
                <img src={changeText} alt="Text Color Picker" />
                {showTextColorPicker && (
                  <ColorPicker onSelect={handleTextColorSelect} />
                )}
              </div>

              <div onClick={toggleBackgroundColorPicker}>
                <img src={changeBG} alt="Background Color Picker" />
                {showBackgroundColorPicker && (
                  <ColorPicker onSelect={handleBackgroundColorSelect} />
                )}
              </div>
            </div>
          </>
        )}
        {mode === "create" && (
          <div className="button-container">
            <button type="submit">Criar nota</button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ToDoForm;
