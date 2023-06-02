import store from "@/src/Store";
import { Provider } from "react-redux";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store} >
      
      <Component {...pageProps} />
    </Provider>
    
  );
}
