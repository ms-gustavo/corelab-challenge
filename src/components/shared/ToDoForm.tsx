import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import StarIcon from "../StarIcon";
import { ToDoFormProps } from "../../types/todo";
import "./ToDoForm.scss";
import ColorPicker from "../ColorPicker/ColorPicker";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  changeNoteColor,
} from "../../api/todoApi";
import changeBG from "../../assets/changeBG.svg";
import changeText from "../../assets/changeText.svg";
import removeButton from "../../assets/removeButton.svg";
import { createNoteValidationSchema } from "../../utils/ValidationSchema";

const ToDoForm: React.FC<ToDoFormProps> = ({
  mode,
  todoId,
  initialValues,
  onTodoCreated,
  onTodoDeleted,
  onUpdateTodoInList,
}) => {
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);

  const textColorPickerRef = useRef<HTMLDivElement>(null);
  const backgroundColorPickerRef = useRef<HTMLDivElement>(null);
  const textColorTriggerRef = useRef<HTMLDivElement>(null);
  const backgroundColorTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        textColorPickerRef.current &&
        !textColorPickerRef.current.contains(target) &&
        textColorTriggerRef.current &&
        !textColorTriggerRef.current.contains(target)
      ) {
        setShowTextColorPicker(false);
      }

      if (
        backgroundColorPickerRef.current &&
        !backgroundColorPickerRef.current.contains(target) &&
        backgroundColorTriggerRef.current &&
        !backgroundColorTriggerRef.current.contains(target)
      ) {
        setShowBackgroundColorPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validationSchema = createNoteValidationSchema();

  const formik = useFormik({
    initialValues: initialValues || {
      title: "",
      description: "",
      isFavorite: false,
      backgroundColor: "black",
      textColor: "white",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (mode === "create") {
          console.log("create", values);
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

  const handleDelete = async () => {
    try {
      if (todoId) {
        await deleteTodo(todoId);
        onTodoDeleted && onTodoDeleted();
      }
    } catch (error) {
      console.error("Error deleting ToDo:", error);
    }
  };

  const handleTextColorSelect = async (color: string) => {
    formik.setFieldValue("textColor", color);
    if (todoId) {
      try {
        await changeNoteColor(todoId, formik.values.backgroundColor, color);
        console.log("Text color updated");
      } catch (error) {
        console.error("Error updating text color:", error);
      }
    } else {
      console.error("Todo ID or Background Color is undefined");
    }
    setShowTextColorPicker(false);
  };

  const handleBackgroundColorSelect = async (color: string) => {
    formik.setFieldValue("backgroundColor", color);
    if (todoId) {
      try {
        await changeNoteColor(todoId, color, formik.values.textColor);
        console.log("Background color updated");
      } catch (error) {
        console.error("Error updating background color:", error);
      }
    } else {
      console.error("Todo ID or Text Color is undefined");
    }
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
        const response = await updateTodo(todoId, {
          ...formik.values,
          isFavorite: newFavoriteValue,
        });
        console.log("Favorite status updated");
        const updatedTodo = response.data;
        onUpdateTodoInList(updatedTodo);
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
      <div
        className="note-creation"
        style={
          mode === "update"
            ? {
                backgroundColor: formik.values.backgroundColor,
                color: formik.values.textColor,
              }
            : {}
        }
      >
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
            style={
              mode === "update"
                ? {
                    backgroundColor: formik.values.backgroundColor,
                    color: formik.values.textColor,
                  }
                : {}
            }
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
            onChange={(e) => {
              formik.handleChange(e);
              handleAutoSave();
            }}
            onBlur={formik.handleBlur}
            className="input-description textarea"
            style={{
              backgroundColor: formik.values.backgroundColor,
              color: formik.values.textColor,
            }}
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
              {typeof formik.errors.description === "string"
                ? formik.errors.description
                : ""}
            </div>
          )}
        {mode === "update" && (
          <>
            <div className="color-picker-container">
              <div className="picker-group">
                <div ref={textColorTriggerRef} onClick={toggleTextColorPicker}>
                  <img src={changeText} alt="Text Color Picker" />
                  {showTextColorPicker && (
                    <div ref={textColorPickerRef}>
                      <ColorPicker onSelect={handleTextColorSelect} />
                    </div>
                  )}
                </div>

                <div
                  ref={backgroundColorTriggerRef}
                  onClick={toggleBackgroundColorPicker}
                >
                  <img src={changeBG} alt="Background Color Picker" />
                  {showBackgroundColorPicker && (
                    <div ref={backgroundColorPickerRef}>
                      <ColorPicker onSelect={handleBackgroundColorSelect} />
                    </div>
                  )}
                </div>
              </div>

              <div className="remove-button">
                <img
                  src={removeButton}
                  onClick={handleDelete}
                  className="delete-icon"
                  alt="Remove button"
                />
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
