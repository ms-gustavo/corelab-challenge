import { useState, useEffect } from "react";

const useSearch = (initialSearchTerm: string) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  return { searchTerm, setSearchTerm, debouncedSearchTerm };
};

export default useSearch;
