import React from "react"

interface TokenType {
  token: string
}

interface AuthContextProps {
  authState: TokenType
  setUserAuthInfo: ({ token }: TokenType) => void
  isUserAuthenticated: () => boolean
  logout: () => void
}

const AuthContext = React.createContext({} as AuthContextProps)
const { Provider } = AuthContext

interface AuthProviderInterface {
  children: React.ReactNode
}
const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [authState, setAuthState] = React.useState({
    token: ""
  })

  // Sets token which is retireved from the api
  const setUserAuthInfo = ({ token }: TokenType) => {
    localStorage.setItem("token", token)

    setAuthState({
      token
    })
  }

  // Will make user logout
  const logout = () => {
    setAuthState({ token: "" })
  }

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    if (!authState.token) {
      return false
    }
    return true
  }

  return (
    <Provider
      value={{
        authState,
        logout,
        setUserAuthInfo,
        isUserAuthenticated
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContext, AuthProvider }
