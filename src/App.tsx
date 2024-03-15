import React, { useState } from 'react';
import './App.css';

const ImageSlider: React.FC<{ selectedBeforeImage: string | null, selectedAfterImage: string | null }> = ({ selectedBeforeImage, selectedAfterImage }) => {
  const [sliderValue, setSliderValue] = useState<number>(50);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setSliderValue(value);
  };

  const boxStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '1800px',
    height: '100%',
    margin: '0 auto'
  };
    
  const boxAfterStyle: React.CSSProperties = {
    left: 0,
    bottom: 0,
  };

  const boxBeforeStyle: React.CSSProperties = {
    position: 'absolute',
    width: `${sliderValue}%`,
    left: 0,
    bottom: 0,
  };

  const boxBeforeImageStyle: React.CSSProperties = {
    maxWidth: '1800px',
    height: 'auto',
    objectFit: 'cover',
    objectPosition: 'left center'
  };

  const boxAfterImageStyle: React.CSSProperties = {
    maxWidth: '1800px',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'left center'
  };

  return (
      <div className="before_after_slider">
        <div style={boxStyle}>
          <div className="box_after" style={boxAfterStyle}>
            {selectedAfterImage && (
              selectedAfterImage.includes('video') ? 
              <video src={selectedAfterImage} style={boxAfterImageStyle} controls /> : 
              <img src={selectedAfterImage} alt="アフター画像" style={boxAfterImageStyle} />
            )}
          </div>
          <div className="box_before" style={boxBeforeStyle}>
            {selectedBeforeImage && (
              selectedBeforeImage.includes('video') ? 
              <video src={selectedBeforeImage} style={boxBeforeImageStyle} controls /> : 
              <img src={selectedBeforeImage} alt="ビフォー画像" style={boxBeforeImageStyle} />
            )}
          </div>
        </div>
      <input type="range" min="0" max="100" value={sliderValue} onChange={handleSliderChange} className="slider_range" />
    </div>
  );
};

const ImageUploader: React.FC = () => {
  const [selectedBeforeImage, setSelectedBeforeImage] = useState<string | null>(null);
  const [selectedAfterImage, setSelectedAfterImage] = useState<string | null>(null);

  // ImageUploader component
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string' || result instanceof ArrayBuffer) {
        setImage(result as string);
      }
    };

    if (file.type.includes('video')) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  const handleBeforeImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(event, setSelectedBeforeImage);
  };

  const handleAfterImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(event, setSelectedAfterImage);
  };

  return (
    <div>
      <input type="file" accept="image/*,video/*" onChange={handleBeforeImageChange} />
      <input type="file" accept="image/*,video/*" onChange={handleAfterImageChange} />
      {(selectedBeforeImage || selectedAfterImage) && (
        <div>
          <h2>Selected Images:</h2>
          <ImageSlider selectedBeforeImage={selectedBeforeImage} selectedAfterImage={selectedAfterImage} />
        </div>
      )}
    </div>
  );
};

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
