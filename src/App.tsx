import React, { useState, useRef } from 'react';
import './App.css';
import ImageUploader from './component/ImageUploader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ImageUploader />
      </header>
    </div>
  );
}

export default App;
