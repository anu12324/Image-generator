import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerate = () => {

    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleGenerate = async () => {
        if (!prompt) return alert("Please enter a prompt");

        try {
            
            const response = await axios.post('https://image-generator-backend-6ryv.onrender.com', { prompt });
            setImageUrl(response.data.imageUrl);
            console.log(`The response is : ${response.data.imageUrl}`);
        } catch (error) {
            console.error('Error generating image:', error);
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

            {imageUrl && (
                <div style={{ marginTop: '30px' }}>
                    <h3>Generated Image:</h3>
                    <img src={imageUrl} alt="Generated" style={{ border: '1px solid #ccc', borderRadius: '8px' }} />
                </div>
            )}
        </div>
    )
}

export default ImageGenerate
