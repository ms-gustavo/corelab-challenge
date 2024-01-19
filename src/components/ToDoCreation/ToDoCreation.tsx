import React from "react";
import { FormikHelpers, useFormik } from "formik";
import { createNoteValidationSchema } from "../../utils/ValidationSchema";
import "./ToDoCreation.scss";
import StarIcon from "../StarIcon";
import { TodoCreateData } from "../../types/todo";
import { ToDoCreationProps } from "../../types/todo";
import { createTodo } from "../../api/todoApi";

const ToDoCreation: React.FC<ToDoCreationProps> = ({ onTodoCreated }) => {
  const validationSchema = createNoteValidationSchema();

  const formik = useFormik<TodoCreateData>({
    initialValues: {
      title: "",
      description: "",
      isFavorite: false,
    },
    validationSchema,
    onSubmit: async (values, formikHelpers: FormikHelpers<TodoCreateData>) => {
      try {
        const response = await createTodo(values);
        console.log("ToDo Created:", response.data);
        formikHelpers.resetForm();
        onTodoCreated();
      } catch (error) {
        console.error(`Error creating a ToDo: ${error}`);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="note-creation">
        <div className="input-group">
          <input
            type="text"
            placeholder="Título"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-title"
          />
          <div
            className={`star ${formik.values.isFavorite ? "is-favorite" : ""}`}
          >
            <StarIcon
              isFavorite={formik.values.isFavorite}
              onClick={() =>
                formik.setFieldValue("isFavorite", !formik.values.isFavorite)
              }
            />
          </div>
        </div>
        {formik.submitCount > 0 &&
          formik.touched.title &&
          formik.errors.title && (
            <div className="error-message">{formik.errors.title}</div>
          )}
        <div className="line"></div>
        <input
          type="text"
          placeholder="Descrição"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className="input-description"
          onBlur={formik.handleBlur}
        />
        {formik.submitCount > 0 &&
          formik.touched.description &&
          formik.errors.description && (
            <div className="error-message">{formik.errors.description}</div>
          )}
        <div className="button-container">
          <button type="submit">Criar nota</button>
        </div>
      </div>
    </form>
  );
};

export default ToDoCreation;
