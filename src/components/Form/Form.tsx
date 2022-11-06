import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";
import { SchemaLike } from "yup/lib/types";

import { ConditionalList } from "../";
import type { TextInput } from "./FormTextInput";
import { FormTextInput } from "./FormTextInput";
import "./Form.css";

const inputCallback = (item: TextInput) => (
  <Row className="mx-2 p-2">
    <FormTextInput {...item} />
  </Row>
);

interface FormProps {
  onSubmit: (values: {}) => void;
  schema: SchemaLike;
  submitDisabled: boolean;
  textInputs: Array<TextInput>;
  title: string;
}

const AppForm = ({
  onSubmit,
  schema,
  submitDisabled,
  textInputs,
  title,
}: FormProps) => {
  const initialValues = textInputs.reduce(
    (o, key) => ({ ...o, [key.name]: "" }),
    {}
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          onSubmit(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="container">
        <Row>
          <h1>{title}</h1>
        </Row>
        <ConditionalList itemCallback={inputCallback} list={textInputs} />
        <Row>
          <button
            className={`fs-2 bg-default py-2 px-auto mt-3 rounded button-border-focus ${
              submitDisabled ? "text-muted" : ""
            }`}
            disabled={submitDisabled}
            type="submit"
          >
            Submit
          </button>
        </Row>
      </Form>
    </Formik>
  );
};

export default AppForm;
