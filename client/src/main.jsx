import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Router>
    <Provider store={store}>
      <App />
      <Toaster position='top-right' />
    </Provider>
  </Router>
  // </StrictMode>,
)
