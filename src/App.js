import './App.css';
import './style.css';

function App() {
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
        <button>Download meme</button>
      </section>
    </main>
  );
}

export default App;
