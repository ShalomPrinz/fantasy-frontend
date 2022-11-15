import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SchemaLike } from "yup/lib/types";

import { Form } from "./";
import type { TextInput } from "./";

export interface AuthProps {
  mutationFn: (values: {}) => Promise<any>;
  other: {
    message: string;
    title: string;
    url: string;
  };
  toastError: string;
  toastSuccess: string;
  title: string;
}

interface AuthFormProps {
  authProps: AuthProps;
  schema: SchemaLike;
  textInputs: Array<TextInput>;
}

const AuthForm = ({ authProps: auth, schema, textInputs }: AuthFormProps) => {
  const navigate = useNavigate();
  const authMutation = useMutation({
    mutationFn: auth.mutationFn,
    onSuccess: async () => {
      toast.success(auth.toastSuccess);
      navigate("/team");
    },
    onError: (e: FirebaseError) => {
      if (e.code === "auth/wrong-password")
        toast.error("Couldn't log in, password isn't correct");
      else toast.error(auth.toastError);
      console.log("Auth Error", e.code);
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
            title={auth.title}
          />
          {authMutation.isLoading && (
            <h2 className="mt-2 fs-2 text-center">Loading...</h2>
          )}
        </Col>
        <Col className="m-5 text-center">
          <h3 className="p-5">{auth.other.message}</h3>
          <Link
            className="fs-2 bg-default py-3 px-5 rounded text-decoration-none button-border-focus"
            to={auth.other.url}
          >
            {auth.other.title}
          </Link>
        </Col>
      </Row>
    </main>
  );
};

export default AuthForm;
