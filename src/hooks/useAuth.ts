import React, { useCallback, useState } from "react";
import { IFormUser } from "../models/models";

interface IFormState {
  [key: string]: string;
}

export function useAuth(props: IFormUser) {
  const [values, setValues] = useState<IFormState>({ ...props });
  const [errors, setErrors] = useState<IFormState>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    // @ts-ignore
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = true) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
