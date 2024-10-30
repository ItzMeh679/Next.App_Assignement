// pages/_app.js

// Import Font Awesome CSS in your main file (_app.js or index.js)
import '@fortawesome/fontawesome-free/css/all.min.css';


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}


export default MyApp;

