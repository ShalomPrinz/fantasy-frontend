import { useMutation } from "@tanstack/react-query";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { Form } from "../../components";
import { registerUser } from "../../services/user";
import type { RegisterUser } from "../../types/User";

const schema = Yup.object({
  fullName: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  nickname: Yup.string()
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
    label: "Nickname",
    name: "nickname",
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

const Register = () => {
  const register = useMutation({
    mutationFn: (userInfo: RegisterUser) => registerUser(userInfo),
    onSuccess: (v) => {
      toast.success("Successfully registered. Enjoy!");
      console.log(v);
    },
    onError: (e) => {
      toast.error("Couldn't register. Please try again later");
      console.error(e);
    },
  });

  return (
    <main className="container">
      <Row className="m-4">
        <Col>
          <Form
            onSubmit={register.mutate}
            schema={schema}
            submitDisabled={register.isLoading}
            textInputs={textInputs}
            title="Register"
          />
          {register.isLoading && (
            <h2 className="mt-2 fs-2 text-center">Loading...</h2>
          )}
        </Col>
        <Col className="m-5 text-center">
          <h3 className="p-5">
            If you already have a user, you should log in instead
          </h3>
          <Link
            className="fs-2 bg-default py-3 px-5 rounded text-decoration-none button-border-focus"
            to="/"
          >
            Log in
          </Link>
        </Col>
      </Row>
    </main>
  );
};

export default Register;
