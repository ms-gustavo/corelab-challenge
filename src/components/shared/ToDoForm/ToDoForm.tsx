import React, { useState } from "react";
import { useFormik } from "formik";
import { ToDoFormProps } from "../../../types/todo";
import "./ToDoForm.scss";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  changeNoteColor,
} from "../../../api/todoApi";
import { createNoteValidationSchema } from "../../../utils/ValidationSchema";
import ColorPickerTrigger from "../../ColorPickerTrigger/ColorPickerTrigger";
import FormFields from "../../FormFields/FormFields";
import SubmitButton from "../../SubmitButton/SubmitButton";
import removeButton from "../../../assets/removeButton.svg";
import { toastError } from "../../../utils/Toasts";

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
  const validationSchema = createNoteValidationSchema();
  const formik = useFormik({
    initialValues: initialValues || {
      title: "",
      description: "",
      isFavorite: false,
      backgroundColor: "white",
      textColor: "black",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (mode === "create") {
          await createTodo(values);
          formik.resetForm();
          onTodoCreated && onTodoCreated();
        } else if (mode === "update" && todoId) {
          await updateTodo(todoId, values);
        }
      } catch (error: unknown) {
        console.error("Error submiting form:", error);
        if (error instanceof Error && "code" in error) {
          if (error.code === "ERR_NETWORK") {
            toastError("Erro de conexão, cheque sua conectividade");
          }
        }
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

  const handleFavoriteToggle = async () => {
    const newFavoriteValue = !formik.values.isFavorite;
    formik.setFieldValue("isFavorite", newFavoriteValue);
    if (mode === "update" && todoId) {
      try {
        const response = await updateTodo(todoId, {
          ...formik.values,
          isFavorite: newFavoriteValue,
        });
        const updatedTodo = response.data;
        onUpdateTodoInList(updatedTodo);
      } catch (error) {
        console.error("Error toggling favorite:", error);
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
        <FormFields
          mode={mode}
          formik={formik}
          handleAutoSave={handleAutoSave}
          isFavorite={formik.values.isFavorite}
          onFavoriteToggle={handleFavoriteToggle}
        />
        {mode === "update" && (
          <>
            <div className="color-picker-container">
              <div className="picker-group">
                <ColorPickerTrigger
                  type="textColor"
                  onSelect={handleTextColorSelect}
                  showPicker={showTextColorPicker}
                  togglePicker={toggleTextColorPicker}
                />
                <ColorPickerTrigger
                  type="backgroundColor"
                  onSelect={handleBackgroundColorSelect}
                  showPicker={showBackgroundColorPicker}
                  togglePicker={toggleBackgroundColorPicker}
                />
              </div>
              <img
                src={removeButton}
                onClick={handleDelete}
                className="delete-icon"
                alt="Remove button"
              />
            </div>
          </>
        )}
        {mode === "create" && <SubmitButton />}
      </div>
    </form>
  );
};

export default ToDoForm;
