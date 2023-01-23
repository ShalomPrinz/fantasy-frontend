import { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { Form, IconComponent } from "../../../components";
import { useUser } from "../../authentication";
import { createLeague } from "../services";
import type { CreateLeague } from "../types";

const schema = Yup.object({
  name: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});

const textInputs = [
  {
    id: 0,
    label: "League Title",
    name: "name",
    type: "text",
  },
];

const CreateLeagueComponent = () => {
  const { createRequest, isLoading } = useCreateLeague();

  return (
    <main className="container mx-auto my-4 p-5">
      <Row>
        <Col>
          <Form
            onSubmit={createRequest}
            schema={schema}
            submitDisabled={isLoading}
            textInputs={textInputs}
            title="Create New League"
          />
          {isLoading && <h2 className="mt-2 fs-2 text-center">Loading...</h2>}
        </Col>
        <Col className="text-center fs-1">
          <IconComponent color="midnightblue" icon="trophy" size="6" />
        </Col>
      </Row>
    </main>
  );
};

function useCreateLeague() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { invalidate } = useUser();

  const onSuccess = (name: string) => {
    toast.success(`Successfully created new league, ${name}`);
    invalidate().then(() => navigate("/leagues"));
  };

  const onError = () => {
    toast.error("Couldn't create new league. Please try again later");
  };

  const fn = (info: CreateLeague) => {
    setLoading(true);
    createLeague(info)
      .then(() => onSuccess(info.name))
      .catch(onError)
      .finally(() => setLoading(false));
  };

  return {
    isLoading: loading,
    createRequest: fn,
  };
}

export default CreateLeagueComponent;
