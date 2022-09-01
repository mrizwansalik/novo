import * as Yup from "yup";

export interface IFormData {
  password: string;
}

export const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please fill out this field")
    .min(8, "Password is not long enough"),
});
