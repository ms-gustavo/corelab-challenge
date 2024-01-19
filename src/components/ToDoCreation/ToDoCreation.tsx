import React from "react";
import { FormikHelpers, useFormik } from "formik";
import { createNoteValidationSchema } from "../../utils/ValidationSchema";
import "./ToDoCreation.scss";
import StarIcon from "../StarIcon";
import { TodoCreateData } from "../../types/todo";

const ToDoCreation: React.FC = () => {
  const validationSchema = createNoteValidationSchema();

  const formik = useFormik<TodoCreateData>({
    initialValues: {
      title: "",
      description: "",
      isFavorite: false,
    },
    validationSchema,
    onSubmit: (values, formikHelpers: FormikHelpers<TodoCreateData>) => {
      console.log("values", values);
      formikHelpers.resetForm();
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
        <div className="line"></div>
        <input
          type="text"
          placeholder="Descrição"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className="input-description"
        />
        <div className="button-container">
          <button type="submit">Criar nota</button>
        </div>
      </div>
    </form>
  );
};

export default ToDoCreation;
