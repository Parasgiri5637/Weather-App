import { useEffect } from "react";

export default function useError(errors, errorType, setErrorMessage) {
  useEffect(() => {
    if (errors && errorType?.response?.data?.cod === "404") {
      const cod = errorType?.response?.data?.cod;
      const message = errorType?.response?.data?.message;
      const response = errorType?.response?.statusText;
      setErrorMessage({ cod, message, response, errors });
    } else {
      setErrorMessage({ errors });
    }
  }, [errors, errorType, setErrorMessage]);
}
