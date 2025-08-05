import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerateLazyLoading = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) return alert("Please enter a prompt");

        setIsLoading(true);
        setImageLoaded(false);
        setImageUrl('');

        try {
            const response = await axios.post('https://image-generator-backend-6ryv.onrender.com/api/generate-image', { prompt });
            setImageUrl(response.data.imageUrl);
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Image Generator</h2>

            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter prompt"
                style={{ padding: '10px', width: '300px' }}
            />

            <button onClick={handleGenerate} style={{ padding: '10px 20px', marginLeft: '10px' }}>
                Generate Image
            </button>

            {isLoading && <p style={{ marginTop: '20px' }}> Generating image...</p>}

            {imageUrl && (
                <div style={{ marginTop: '30px', position: 'relative' }}>
                    <h3>Generated Image:</h3>

                    {!imageLoaded && (
                        <div style={{
                            width: '400px',
                            height: '300px',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '0 auto',
                            position: 'absolute',
                            top: '50px',
                            left: 0,
                            right: 0,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                            <span> Loading image...</span>
                        </div>
                    )}

                    <img
                        src={imageUrl}
                        alt="Generated"
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            width: '400px',
                            height: '300px',
                            opacity: imageLoaded ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageGenerateLazyLoading;
