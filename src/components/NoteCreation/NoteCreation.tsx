import React, { useState } from "react";
import { useFormik } from "formik";
import { createNoteValidationSchema } from "../../utils/ValidationSchema";
import "./NoteCreation.scss";
import StarIcon from "../StarIcon";

type NoteCreationProps = {
  addNote: (title: string, description: string, isFavorite: boolean) => void;
};

const NoteCreation: React.FC<NoteCreationProps> = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorite, setisFavorite] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const toggleImportant = () => {
    setisFavorite(!isFavorite);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addNote(title, description, isFavorite);
      setTitle("");
      setDescription("");
      setisFavorite(false);
    }
  };

  const validationSchema = createNoteValidationSchema();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      isFavorite: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      formik.resetForm();
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
          />
          <div
            className={`star ${formik.values.isFavorite ? "is-important" : ""}`}
          >
            <StarIcon
              isFavorite={formik.values.isFavorite}
              onClick={() =>
                formik.setFieldValue("isFavorite", !formik.values.isFavorite)
              }
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="Descrição"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <button type="submit">Criar nota</button>
      </div>
    </form>
  );
};

export default NoteCreation;
