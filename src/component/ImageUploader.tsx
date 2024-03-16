import React, { useState, useRef } from 'react';

const ImageSlider: React.FC<{ selectedBeforeImage: string | null, selectedAfterImage: string | null }> = ({ selectedBeforeImage, selectedAfterImage }) => {
  const [sliderValue, setSliderValue] = useState<number>(50);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setSliderValue(value);
  };
  const [sliderValue2, setSliderValue2] = useState<number>(100);

  const handleSliderChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setSliderValue2(value);
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
    top: 0,
  };

  const boxBeforeStyle: React.CSSProperties = {
    position: 'absolute',
    width: `${sliderValue}%`,
    height: `${sliderValue2}%`,
    left: 0,
    top: 0,
  };

  const boxBeforeImageStyle: React.CSSProperties = {
    maxWidth: '1800px',
    height: 'auto',
    objectFit: 'cover',
    objectPosition: 'left top'
  };

  const boxAfterImageStyle: React.CSSProperties = {
    maxWidth: '1800px',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'left top'
  };

  // In ImageSlider component
  const beforeVideoRef = useRef<HTMLVideoElement>(null);
  const afterVideoRef = useRef<HTMLVideoElement>(null);

  const handlePauseClick = () => {
    beforeVideoRef.current?.pause();
    afterVideoRef.current?.pause();
  };

  const handlePlayClick = () => {
    beforeVideoRef.current?.play();
    afterVideoRef.current?.play();
  };

  return (
      <div className="before_after_slider">
        <button onClick={handlePlayClick}>Play</button>
        <button onClick={handlePauseClick}>Pause</button>
        <div style={boxStyle}>
          <div className="box_after" style={boxAfterStyle}>
            {selectedAfterImage && (
              selectedAfterImage.includes('video') ? 
              <video ref={afterVideoRef} src={selectedAfterImage} style={boxAfterImageStyle} controls /> : 
              <img src={selectedAfterImage} alt="アフター画像" style={boxAfterImageStyle} />
            )}
          </div>
          <div className="box_before" style={boxBeforeStyle}>
            {selectedBeforeImage && (
              selectedBeforeImage.includes('video') ? 
              <video ref={beforeVideoRef} src={selectedBeforeImage} style={boxBeforeImageStyle} controls /> : 
              <img src={selectedBeforeImage} alt="ビフォー画像" style={boxBeforeImageStyle} />
            )}
          </div>
        </div>
      <input type="range" min="0" max="100" value={sliderValue} onChange={handleSliderChange} className="slider_range" />
      <input type="range" min="0" max="100" value={sliderValue2} onChange={handleSliderChange2} className="slider_range" />
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

export default ImageUploader;
