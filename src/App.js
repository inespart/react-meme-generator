import './App.css';
import './style.css';
import React, { useEffect, useState } from 'react';
import Input from './Components/Input.js';

function App() {
  const [data, setData] = useState([]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [styleImage, setStyleImage] = useState('ams');
  const [customUrl, setCustomUrl] = useState(
    'https://api.memegen.link/images/ams/Hello/my friends.png',
  );

  // Fetch template
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.memegen.link/templates/');
        const json = await response.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  // Functionality to download custom meme
  function forceDownload(blob, filename) {
    // Create an invisible anchor element
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.setAttribute('download', filename);
    document.body.appendChild(anchor);

    // Trigger the download by simulating click
    anchor.click();

    // Clean up
    window.URL.revokeObjectURL(anchor.href);
    document.body.removeChild(anchor);
  }
  function downloadResource(URL, filename) {
    // If no filename is set, use filename from URL
    if (!filename) filename = URL.match(/\/([^/#?]+)[^/]*$/)[1];
    fetch(URL, {
      headers: new Headers({
        Origin: window.location.origin,
      }),
      mode: 'cors',
    })
      .then((response) => response.blob())
      .then((blob) => forceDownload(blob, filename))
      .catch((e) => console.error(e));
  }

  return (
    <main>
      <section>
        <h1>Create your custom meme</h1>

        <Input
          text="Top text: "
          type="text"
          id="topText"
          placeholder="Hello"
          value={topText}
          onChange={(e) => {
            setTopText(e.currentTarget.value);
          }}
        />

        <Input
          text="Bottom text: "
          type="text"
          id="bottomText"
          placeholder="my friends"
          value={bottomText}
          onChange={(e) => {
            setBottomText(e.currentTarget.value);
          }}
        />

        <div className="inputArea">
          <label htmlFor="styleImage">Image style: </label>
          <select
            id="styleImage"
            placeholder="buzz"
            value={styleImage}
            onChange={(e) => {
              setStyleImage(e.currentTarget.value);
            }}
          >
            {data.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => {
              setCustomUrl(
                `https://api.memegen.link/images/${styleImage}/${topText}/${bottomText}.jpg`,
              );
            }}
          >
            Preview meme
          </button>
          <button
            onClick={() => {
              downloadResource(
                `https://api.memegen.link/images/${styleImage}/${topText}/${bottomText}.jpg`,
              );
            }}
          >
            Download meme
          </button>
        </div>

        <div>
          <img className="memeImg" src={customUrl} alt="Custom meme" />
        </div>
      </section>
    </main>
  );
}

export default App;
