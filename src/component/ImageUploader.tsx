import React, { useState, useRef } from 'react';
import ImageSlider from '../molecules/ImageSlider';

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

  const card: React.CSSProperties = {
    border: '1px solid rgba(0,0,0,.125)',
    borderRadius: '.25rem',
    backgroundColor: '#fff',
    boxShadow: '0 0.5rem 1rem rgba(0,0,0,.15)',
    marginBottom: '1rem',
    padding: '1rem',
    color: '#000' // 文字色を黒に設定
  };

  return (
    <div>
      <div style={card}>
        <div>
          <input type="file" accept="image/*,video/*" onChange={handleBeforeImageChange} />
        </div>
        <div>
          <input type="file" accept="image/*,video/*" onChange={handleAfterImageChange} />
        </div>
        {(selectedBeforeImage || selectedAfterImage) && (
          <div>
            <ImageSlider selectedBeforeImage={selectedBeforeImage} selectedAfterImage={selectedAfterImage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
