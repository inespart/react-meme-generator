import './App.css';
import './style.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  // here comes image style variable
  const [previewMeme, setPreviewMeme] = useState();
  const [customUrl, setCustomUrl] = useState(
    'https://api.memegen.link/images/ams/Hello/my friends.png',
  );

  const url = 'https://api.memegen.link/templates/';

  // Fetch template
  useEffect(() => {
    fetch(url)
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
          <input
            type="text"
            id="topText"
            placeholder="Hello"
            value={topText}
            onChange={(e) => {
              setTopText(e.currentTarget.value);
            }}
          />
        </div>

        <div className="inputArea">
          <label htmlFor="bottomText">Bottom text: </label>
          <input
            type="text"
            id="bottomText"
            placeholder="my friends"
            value={bottomText}
            onChange={(e) => {
              setBottomText(e.currentTarget.value);
            }}
          />
        </div>

        <div className="inputArea">
          <label htmlFor="styleImage">Image style: </label>
          <input type="text" id="styleImage" />
        </div>

        <div>
          <button
            onClick={() => {
              setCustomUrl(
                `https://api.memegen.link/images/buzz/` +
                  topText +
                  `/` +
                  bottomText +
                  `.jpg`,
              );
            }}
          >
            Preview meme
          </button>
          <button>Download meme</button>
        </div>

        <div>
          <img className="memeImg" src={customUrl} alt="Custom meme" />
        </div>
      </section>
    </main>
  );
}

export default App;
