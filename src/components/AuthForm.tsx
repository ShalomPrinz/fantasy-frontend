import { useState } from "react";

import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SchemaLike } from "yup/lib/types";

import { Form } from "./";
import type { TextInput } from "./";

export interface AuthProps {
  other: {
    message: string;
    title: string;
    url: string;
  };
  toastError: string;
  toastSuccess: string;
  title: string;
}

type AuthInfo = {};
type AuthFn = (info: AuthInfo) => Promise<any>;

interface AuthFormProps {
  authFn: AuthFn;
  authProps: AuthProps;
  schema: SchemaLike;
  textInputs: Array<TextInput>;
}

const AuthForm = ({
  authProps: auth,
  authFn,
  schema,
  textInputs,
}: AuthFormProps) => {
  const { authRequest, isLoading } = useAuthRequest(
    authFn,
    auth.toastSuccess,
    auth.toastError
  );

  return (
    <main className="container">
      <Row className="m-4">
        <Col>
          <Form
            onSubmit={authRequest}
            schema={schema}
            submitDisabled={isLoading}
            textInputs={textInputs}
            title={auth.title}
          />
          {isLoading && <h2 className="mt-2 fs-2 text-center">Loading...</h2>}
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

function useAuthRequest(
  authFn: AuthFn,
  toastSuccess: string,
  toastError: string
) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSuccess = () => {
    toast.success(toastSuccess);
    navigate("/team");
  };

  const onError = (e: any) => {
    if (e?.code === "auth/wrong-password")
      toast.error("Couldn't log in, password isn't correct");
    else toast.error(toastError);
    console.log("Auth Error", e?.code);
  };

  const fn = (info: AuthInfo) => {
    setLoading(true);
    authFn(info)
      .then(onSuccess)
      .catch(onError)
      .finally(() => setLoading(false));
  };

  return {
    isLoading: loading,
    authRequest: fn,
  };
}

export default AuthForm;
