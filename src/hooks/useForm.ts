import React, { useState } from "react";
import { IFormUser } from "../services/types/userTypes";

export function useForm(inputValues: IFormUser) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
