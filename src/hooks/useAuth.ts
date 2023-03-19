import React, { useCallback, useState } from "react";
import { IFormState } from "../services/types/authTypes";
import { IFormUser } from "../services/types/userTypes";

export const useAuth = (props: IFormUser) => {
  const [values, setValues] = useState<IFormState>({ ...props });
  const [errors, setErrors] = useState<IFormState>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form")!.checkValidity());
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
};
