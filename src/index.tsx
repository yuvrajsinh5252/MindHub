import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <main className='font-poppins'>
      <App />
    </main>
);

// removed the react strict mode because it was causing the app to render twice
// github auth was not working because of this
// we request an access token from github api on the first render
// and then we request it again on the second render which causes the error
{/* </React.StrictMode> */}