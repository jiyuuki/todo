import { createContext, useCallback, useReducer } from "react";

export const ItemsContext = createContext();

const initialState = {
  items: [],
  loading: true,
  error: ''
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'GET_LISTS_SUCESS':
      return {
        ...state,
        items: action.payload,
        loading: false
      }
    case 'GET_LISTS_ERROR':
      return {
        ...state,
        items : [],
        error : action.payload
      }
    case 'ADD_ITEM_SUCCESS':
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false
      }
    case 'ADD_ITEM_ERROR':
      return {
        ...state,
        items: [],
        loading: true
      }
    default :
      return state
  }
}

export const ItemsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchItems = useCallback( async (listId) => {
    try{
      const data = await fetch(`http://localhost:8000/lists/${listId}/items`)
      const result = await data.json()
      if (result) {
        dispatch({ type: 'GET_LISTS_SUCESS', payload: result })
      }
    } catch(e) {
      dispatch({ type: 'GET_LISTS_SUCESS', payload: e.message })
    }
  }, [])

  const addItem = useCallback( async ({listId, title, quantity, price}) => {
    const ItemId = Math.floor(Math.random()*100)
    try {
      const data = await fetch(`http://localhost:8000/items`, {
        method : 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          id : ItemId,
          listId,
          title,
          quantity,
          price
        })
      })
      const result = await data.json()
      if (result) {
        dispatch({
          type : 'ADD_ITEM_SUCCESS',
          payload : {
          id : ItemId,
          listId,
          title,
          quantity,
          price
        }
        })
      }
    } catch {
      console.log('error')
    }
  }, [])

  return (
    <ItemsContext.Provider value={{ ...state, fetchItems, addItem }}>
      {children}
    </ItemsContext.Provider>
  );
};
