import { useState, useEffect, useCallback } from "react";

const getInventory = (url: string | null = null, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [invSpace, setInvSpace] = useState<[] | null>(null);
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
      
      if (data) {
        setData(data);
        let inventoryArray = eval(data.result[0].inventory);

        setInvSpace(inventoryArray);

        // For now, this is useless, fuck this
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

const getItems = (url: string | null = null, dependencies = []) => {
  const [itemsData, setItemsData] = useState(null);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setItemsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setItemsData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setItemsError(err.message);
      } else {
        setItemsError("An unknown error occurred.");
      }
    } finally {
      setItemsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  const refreshItemsData = () => {
    fetchData();
  };

  return { itemsData, itemsLoading, itemsError, refreshItemsData };
};

export { getInventory, getItems };
