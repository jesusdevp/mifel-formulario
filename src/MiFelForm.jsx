import React from "react";
import { Form } from "./components/Form";
import { UserMap } from "./components/UserMap";
import { UserTable } from "./components/UserTable";

export const MiFelForm = () => {


  return (
    <div className="p-8">
      <Form />
      <UserTable />
      <UserMap />
    </div>
  );
};
