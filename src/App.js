import React, { useState, useEffect } from "react";
import "./App.css";

const compress = (markup) => {
  const output = markup
    .replace(/\n/g, "")
    .replace(/[\t ]+</g, "<")
    .replace(/>[\t ]+</g, "><")
    .replace(/>[\t ]+$/g, ">");

  return output;
};

const selectAndCopy = (target, callback) => {
  target.select();
  navigator.clipboard.writeText(target.value).then(callback);
};

function App() {
  const [original, setOriginal] = useState("");
  const [minified, setMinified] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 500);
    }
  }, [copied]);

  const handleOriginal = (e) => {
    setOriginal(e.target.value);
    setMinified(compress(e.target.value));
  };

  return (
    <div className="App">
      <header>
        <h1>No nonsense HTML minifier v1</h1>
        <figure>
          <blockquote cite="https://dictionary.cambridge.org/dictionary/english/no-nonsense">
            Practical and serious, and only interested in doing what is
            necessary or achieving what is intended, without silly ideas or
            methods
          </blockquote>
          <figcaption>Cambridge Dictionary</figcaption>
        </figure>
      </header>
      <main>
        <hr />
        <div>
          <h2>Paste code here:</h2>
          <textarea
            value={original}
            onChange={handleOriginal}
            onClick={() => setOriginal("")}
          />
        </div>
        <div>
          <h2>
            Minified code <small>click textarea to copy</small>:
          </h2>
          <textarea
            value={minified}
            onClick={(e) => {
              selectAndCopy(e.target, () => {
                setCopied(true);
              });
            }}
          />
          {copied && <strong className="ok">Copied!</strong>}
        </div>
      </main>
    </div>
  );
}

export default App;
