import { createRoot } from 'react-dom/client';

import App from './App';

import './../src/output.css';

const initSPA = async () => {
  const container = document.getElementById('root');
  const root = createRoot(container as HTMLElement);

  root.render(<App />);
};

initSPA();
