import { createContext, useCallback, useReducer } from "react"

export const ListsContext = createContext()

const initialState = {
  lists: [],
  list: {},
  loading: true,
  error: ''
}

const reducer = (state, action)  => {
  switch(action.type) {
    case 'GET_LISTS_SUCESS':
      return {
        ...state,
        lists: action.payload,
        loading: false
      }
    case 'GET_LISTS_ERROR' :
      return {
        ...state,
        lists: [],
        error: action.payload
      }
    default :
      return state
  }
}

export const ListsContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchLists = useCallback( async () => {
    try{
      const data = await fetch(`http://localhost:8000/lists`)
      const result = await data.json()
      if (result) {
        dispatch({ type: 'GET_LISTS_SUCESS', payload: result })
      }
    } catch(e) {
      dispatch({ type: 'GET_LISTS_ERROR', payload: e.message })
    }
  }, [])

  return(
    <ListsContext.Provider
      value={{ ...state, fetchLists }}
    >
      {children}
    </ListsContext.Provider>
  )
}

export default ListsContext
