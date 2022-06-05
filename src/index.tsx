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
import { GlobalProvider } from './contexts/GlobalContext';

const options = {
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE
};

ReactDOM.render(
  <HelmetProvider>
    <GlobalProvider>
      <SidebarProvider>
        <BrowserRouter>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </BrowserRouter>
      </SidebarProvider>
    </GlobalProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
