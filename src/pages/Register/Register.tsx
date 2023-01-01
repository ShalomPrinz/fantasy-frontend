import * as Yup from "yup";

import { AuthForm, AuthProps, Message } from "../../components";
import { UserState, useUser } from "../../contexts";

const schema = Yup.object({
  fullName: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  username: Yup.string()
    .max(10, "Must be 10 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("Required"),
});

const textInputs = [
  {
    id: 0,
    label: "Full Name",
    name: "fullName",
    type: "text",
    placeholder: "Jane Doe",
  },
  {
    id: 1,
    label: "Username",
    name: "username",
    type: "text",
    placeholder: "Jane",
  },
  {
    id: 2,
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Jane.Doe@gmail.com",
  },
  {
    id: 3,
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "******",
  },
];

const props: AuthProps = {
  other: {
    message: "If you already have a user, you should log in instead",
    title: "Log In",
    url: "/login",
  },
  title: "Register",
  toastError: "Couldn't register. Please try again later",
  toastSuccess: "Successfully registered. Enjoy!",
};

const Register = () => {
  const { register, state } = useUser();

  switch (state) {
    case UserState.LOADING_USER:
      return <Message color="info" text="Loading..." />;

    case UserState.LOGGED_USER:
      return <Message color="success" text="You are already logged in." />;

    case UserState.NO_LOGGED_USER:
      return (
        <AuthForm
          authFn={register}
          authProps={props}
          schema={schema}
          textInputs={textInputs}
        />
      );
  }
};
export default Register;
