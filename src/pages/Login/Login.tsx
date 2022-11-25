import { useUser } from "contexts";
import * as Yup from "yup";

import { AuthForm, AuthProps } from "../../components";

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

const props: AuthProps = {
  other: {
    message: "If you don't have a user already, you should register first",
    title: "Register",
    url: "/register",
  },
  title: "Log In",
  toastError: "Couldn't log in. Please try again later",
  toastSuccess: "Successfully logged in. Enjoy!",
};

const Login = () => {
  const { login } = useUser();
  return (
    <AuthForm
      authProps={props}
      mutationFn={login}
      schema={schema}
      textInputs={textInputs}
    />
  );
};

export default Login;
