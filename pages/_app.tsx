import "../styles/globals.css"
import type { AppProps } from "next/app"
import { AuthProvider } from "../src/context/authContext"
import { Provider } from "react-redux"
import { store } from "../src/store/store"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}
