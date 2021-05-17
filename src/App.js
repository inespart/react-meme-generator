import './App.css';
import './style.css';
import React, { useEffect, useState } from 'react';
import Input from './Components/Input.js';

function App() {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState();
  // const [error, setError] = useState();
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [styleImage, setStyleImage] = useState();
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

  // // Fetch template that didn't work
  // useEffect(() => {
  //   fetch(url)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw response;
  //     })
  //     .then((data) => {
  //       setData(data);
  //       // console.log(data);
  //       const styleNames = data.map((item) => {
  //         return item.id;
  //       });
  //       console.log('CL from useEffect');
  //       console.log(styleNames);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) return 'Loading...';
  // if (error) return 'Error!';

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
          htmlFor="topText"
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
          htmlFor="bottomText"
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
            type="text"
            id="styleImage"
            placeholder="buzz"
            onChange={(e) => {
              setStyleImage(e.currentTarget.value);
            }}
          >
            <option>Please select</option>

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
              !styleImage
                ? setCustomUrl(
                    `https://api.memegen.link/images/ams/${topText}/${bottomText}.jpg`,
                  )
                : setCustomUrl(
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
