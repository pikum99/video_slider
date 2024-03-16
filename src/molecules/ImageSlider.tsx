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

  const [maxWidth, setMaxWidth] = useState<number>(1280);

  // maxWidthを変更する関数
  const handleMaxWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxWidth(parseInt(event.target.value));
  };

  const boxStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    maxWidth: `${maxWidth}px`,
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
    maxWidth: `${maxWidth}px`,
    height: 'auto',
    objectFit: 'cover',
    objectPosition: 'left top'
  };

  const boxAfterImageStyle: React.CSSProperties = {
    maxWidth: `${maxWidth}px`,
    height: 'auto',
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
              <img src={selectedAfterImage} alt="アフター" style={boxAfterImageStyle} />
            )}
          </div>
          <div className="box_before" style={boxBeforeStyle}>
            {selectedBeforeImage && (
              selectedBeforeImage.includes('video') ? 
              <video ref={beforeVideoRef} src={selectedBeforeImage} style={boxBeforeImageStyle} controls /> : 
              <img src={selectedBeforeImage} alt="ビフォー" style={boxBeforeImageStyle} />
            )}
          </div>
        </div>
      <input type="range" min="0" max="100" value={sliderValue} onChange={handleSliderChange} className="slider_range" />
      <input type="range" min="0" max="100" value={sliderValue2} onChange={handleSliderChange2} className="slider_range" />
      <input type="range" min="0" max="1280" value={maxWidth} onChange={handleMaxWidthChange} />
    </div>
  );
};

export default ImageSlider;
