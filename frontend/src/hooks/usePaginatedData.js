// src/hooks/usePaginatedData.js

import { useState, useEffect } from "react";

function usePaginatedData(
  fetchFunction,
  page,
  dependencies = [],
  pageSize = 10
) {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchFunction(page, pageSize);
      setData(response.content || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, ...dependencies]);

  return {
    data,
    totalPages,
    loading,
    refetch: fetchData,
  };
}

export default usePaginatedData;
