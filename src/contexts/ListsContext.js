import { createContext } from "react"
import useDataFetching from "../hooks/useDataFetching"

export const ListsContext = createContext()

export const ListsContextProvider = ({children}) => {
  const [loading, error, data] = useDataFetching(
    'http://localhost:8000/lists',
  )

  return(
    <ListsContext.Provider
      value={{ lists: data, error, loading }}
    >
      {children}
    </ListsContext.Provider>
  )
}

export default ListsContext
