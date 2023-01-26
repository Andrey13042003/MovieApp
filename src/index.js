import ReactDOM from 'react-dom/client';

import App from './app/';
import './index.css';

function MovieApp() {
  return <App />;
}

const root = ReactDOM.createRoot(document.querySelector('.todoapp'));
root.render(<MovieApp />);
