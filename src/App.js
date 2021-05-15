import './App.css';
import './style.scss';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetch('https://api.memegen.link/temp lates/')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return 'Loading...';
  if (error) return 'Error!';

  return (
    <main>
      <section>
        <h1>Create your custom meme</h1>
        <div className="inputArea">
          <label htmlFor="topText">Top text: </label>
          <input type="text" id="topText" />
        </div>
        <div className="inputArea">
          <label htmlFor="bottomText">Bottom text: </label>
          <input type="text" id="bottomText" />
        </div>
        <div className="inputArea">
          <label htmlFor="styleImage">Image style: </label>
          <input type="text" id="styleImage" />
        </div>
        <img
          className="memeImg"
          src="https://api.memegen.link/images/buzz/happy/day.jpg"
          alt=""
        />
        <button>Preview meme</button>
        <button>Download meme</button>
      </section>
    </main>
  );
}

export default App;
