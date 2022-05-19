import { createContext, useState, useCallback } from "react";

export const ItemsContext = createContext();

export const ItemsContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const fetchItems = useCallback( async (listId) => {
    try{
      const data = await fetch(`http://localhost:8000/lists/${listId}/items`)
      const result = await data.json()
      if (result) {
        setItems(result);
        setLoading(false);
      }
    } catch(e) {
      setLoading(false);
      setError(e.message);
    }
  }, [])

  return (
    <ItemsContext.Provider value={{ items, error, loading, fetchItems }}>
      {children}
    </ItemsContext.Provider>
  );
};
