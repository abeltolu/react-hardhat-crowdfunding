import { useState } from "react";

export function useApiState<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<T>();

  return { loading, error, data };
}
