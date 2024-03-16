import React, { useState, useRef } from 'react';
import './App.css';
import ImageUploader from './component/ImageUploader';
import 'bootstrap/dist/css/bootstrap.min.css'; // BootstrapのCSSをインポート
import Button from 'react-bootstrap/Button'; // React BootstrapのButtonコンポーネントをインポート

function App() {
  const [uploaders, setUploaders] = useState([<ImageUploader key={0} />]);

  const addUploader = () => {
    setUploaders(prev => [...prev, <ImageUploader key={prev.length} />]);
  };
  return (
    <div className="App">
      <header className="App-header">

      <div className="d-flex flex-wrap">
        {uploaders}
      </div>
      <Button onClick={addUploader}> + </Button>
      </header>
    </div>
  );
}

export default App;
