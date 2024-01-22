import React from "react";
import { FormFieldsProps } from "../../types/todo";
import FavoriteToggle from "../FavoriteToggle/FavoriteToggle";

const FormFields: React.FC<FormFieldsProps> = ({
  mode,
  formik,
  handleAutoSave,
  isFavorite,
  onFavoriteToggle,
}) => {
  return (
    <>
      <div className="input-group">
        <input
          type="text"
          placeholder="Título"
          name="title"
          value={formik.values.title}
          onChange={(e) => {
            formik.handleChange(e);
            if (mode === "update" && handleAutoSave) {
              handleAutoSave();
            }
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
        <FavoriteToggle isFavorite={isFavorite} onToggle={onFavoriteToggle} />
      </div>
      {formik.submitCount > 0 &&
        formik.touched.title &&
        formik.errors.title && (
          <div className="error-message">{formik.errors.title}</div>
        )}
      <div className="line"></div>
      {mode === "update" ? (
        <textarea
          name="description"
          placeholder="Digite aqui..."
          value={formik.values.description}
          onChange={(e) => {
            formik.handleChange(e);
            if (handleAutoSave) {
              handleAutoSave();
            }
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
          placeholder="Digite aqui..."
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-description"
        />
      )}
      {formik.submitCount > 0 &&
        formik.touched.description &&
        formik.errors.description && (
          <div className="error-message">{formik.errors.description}</div>
        )}
    </>
  );
};

export default FormFields;
