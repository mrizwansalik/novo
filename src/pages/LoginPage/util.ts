import * as Yup from "yup";
export interface IFormData {
  email: string;
  password: string;
}

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("Please fill out this field"),
  password: Yup.string().required("Please fill out this field"),
});
