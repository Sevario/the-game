import { useState, useEffect, useCallback } from "react";

const getInventory = (url: string | null = null, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [invSpace, setInvSpace] = useState<string | null>(null);
  const [inventoryOrder, setInventoryOrder] = useState<number[]>([]);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setData(data);
      if (data) {
        setInvSpace(data.result[0].inventory);
        const parsedOrder = JSON.parse(data.result[0].inventory_order);
        setInventoryOrder(parsedOrder);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  const refreshData = () => {
    fetchData();
  };

  return { data, invSpace, inventoryOrder, isLoading, error, refreshData };
};

export { getInventory };
