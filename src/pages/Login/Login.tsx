import * as Yup from "yup";

import { AuthForm } from "../../components";

const schema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("Required"),
});

const textInputs = [
  {
    id: 0,
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Jane.Doe@gmail.com",
  },
  {
    id: 1,
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "******",
  },
];

const Login = () => (
  <AuthForm authType="login" schema={schema} textInputs={textInputs} />
);

export default Login;
