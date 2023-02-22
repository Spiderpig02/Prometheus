import App from './App';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from "react-router-dom";


test('renders learn react link', () => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
    root
  );
  
});
