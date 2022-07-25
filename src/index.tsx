import App from './App';
import ReactDOM from 'react-dom';
import 'src/utils/chart';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import 'nprogress/nprogress.css';
import { SidebarProvider } from './contexts/SidebarContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  containerStyle: {
    zIndex: 99999
  },
  transition: transitions.SCALE
};

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </BrowserRouter>
      </Provider>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
