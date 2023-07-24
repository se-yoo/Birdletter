import { useState, useCallback } from "react";

export default (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, handler];
};
