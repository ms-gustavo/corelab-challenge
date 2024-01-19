import * as Yup from "yup";

export const createNoteValidationSchema = () => {
  return Yup.object({
    title: Yup.string().required("O título é obrigatório"),
    description: Yup.string().required("A descrição é obrigatória"),
    isFavorite: Yup.boolean(),
  });
};
