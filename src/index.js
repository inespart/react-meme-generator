import './index.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const Home = () => {
//   const [meme, setMeme] = useState();

//   useEffect(() => {
//     fetch('https://api.memegen.link/images/buzz/memes/memes_everywhere.jpg')
//       .then((r) => r.json())
//       .then(setMeme);
//   }, []);

//   return <App meme={meme} />;
// };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
