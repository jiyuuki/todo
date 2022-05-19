import { ItemsContextProvider } from "./contexts/ItemsContext";
import { ListsContextProvider } from "./contexts/ListsContext";

const AppContext = ({children}) => {
  return (
    <ListsContextProvider>
      <ItemsContextProvider>
        {children}
      </ItemsContextProvider>
    </ListsContextProvider>
  )
}

export default AppContext
