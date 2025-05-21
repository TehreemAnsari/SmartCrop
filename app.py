import os
import logging
from flask import Flask, render_template, request, jsonify
import torch
from PIL import Image
import io
from utils import preprocess_image, get_mock_model_prediction

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default_secret_key")

# Load pretrained model (this is a placeholder - real model would be loaded here)
# In a real scenario, you would load your actual PyTorch model
# model = torch.load("crop_model.pth")
# model.eval()

@app.route('/')
def index():
    """Render the home page."""
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    """
    Process uploaded image and perform crop disease detection.
    Returns analysis results including bounding box and label.
    """
    try:
        # Check if image file is present in request
        if 'file' not in request.files:
            logger.error("No file part in the request")
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        
        # Check if filename is empty
        if file.filename == '':
            logger.error("No file selected")
            return jsonify({'error': 'No selected file'}), 400
        
        # Validate file type (accept only images)
        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            logger.error("Invalid file type")
            return jsonify({'error': 'Invalid file type. Please upload an image.'}), 400
        
        # Open and preprocess the image
        try:
            image = Image.open(file.stream).convert("RGB")
            # Preprocess image for model input
            tensor = preprocess_image(image)
            
            # In a real scenario, you would pass the tensor to your model
            # with torch.no_grad():
            #     output = model(tensor.unsqueeze(0))
            
            # For demo purposes, we'll use a mock prediction
            # In a real application, you would process the actual model output
            prediction = get_mock_model_prediction()
            
            logger.debug(f"Prediction: {prediction}")
            return jsonify(prediction), 200
            
        except Exception as e:
            logger.error(f"Error processing image: {str(e)}")
            return jsonify({'error': f'Error processing image: {str(e)}'}), 500
        
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template('index.html', error="Page not found"), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('index.html', error="Server error occurred"), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
