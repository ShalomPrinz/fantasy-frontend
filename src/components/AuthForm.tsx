import { useMutation } from "@tanstack/react-query";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SchemaLike } from "yup/lib/types";

import { loginUser, registerUser } from "../services/user";
import type { LoginUser, RegisterUser } from "../types";

import { Form } from "./";
import type { TextInput } from "./";

const auth = {
  login: {
    message: "If you don't have a user already, you should register first",
    mutationFn: (userInfo: LoginUser) => loginUser(userInfo),
    title: "Log In",
    toastSuccess: "Successfully logged in. Enjoy!",
    toastError: "Couldn't log in. Please try again later",
    url: "/login",
  },
  register: {
    message: "If you already have a user, you should log in instead",
    mutationFn: (userInfo: RegisterUser) => registerUser(userInfo),
    title: "Register",
    toastSuccess: "Successfully registered. Enjoy!",
    toastError: "Couldn't register. Please try again later",
    url: "/register",
  },
};

interface AuthFormProps {
  authType: "login" | "register";
  schema: SchemaLike;
  textInputs: Array<TextInput>;
}

const AuthForm = ({ authType, schema, textInputs }: AuthFormProps) => {
  const alterAuth = authType === "login" ? auth.register : auth.login;
  const currentAuth = authType === "login" ? auth.login : auth.register;

  const navigate = useNavigate();
  const authMutation = useMutation({
    mutationFn: currentAuth.mutationFn,
    onSuccess: (v) => {
      toast.success(currentAuth.toastSuccess);
      navigate("/team");
      console.log("Auth Success", v);
    },
    onError: (e) => {
      toast.error(currentAuth.toastError);
      console.error("Auth Error", e);
    },
  });

  return (
    <main className="container">
      <Row className="m-4">
        <Col>
          <Form
            onSubmit={authMutation.mutate}
            schema={schema}
            submitDisabled={authMutation.isLoading}
            textInputs={textInputs}
            title={currentAuth.title}
          />
          {authMutation.isLoading && (
            <h2 className="mt-2 fs-2 text-center">Loading...</h2>
          )}
        </Col>
        <Col className="m-5 text-center">
          <h3 className="p-5">{alterAuth.message}</h3>
          <Link
            className="fs-2 bg-default py-3 px-5 rounded text-decoration-none button-border-focus"
            to={alterAuth.url}
          >
            {alterAuth.title}
          </Link>
        </Col>
      </Row>
    </main>
  );
};

export default AuthForm;
