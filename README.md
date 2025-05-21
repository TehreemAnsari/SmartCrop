# SmartCrop: Crop Disease Detection Application

![SmartCrop Logo](generated-icon.png)

## Overview

SmartCrop is a web application that allows farmers and agricultural professionals to upload images of their crops for disease detection and analysis. Using advanced machine learning techniques, the application identifies potential diseases, highlighting affected areas and providing classification results.

## Features

- **Image Upload**: Simple and intuitive interface for uploading crop images
- **Real-time Analysis**: Quick processing and visualization of results
- **Disease Detection**: Identifies crop diseases with bounding box visualization
- **Confidence Scoring**: Provides confidence level for each detection
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Machine Learning**: PyTorch
- **Image Processing**: Pillow
- **UI Framework**: Bootstrap (Replit Dark Theme)
- **Server**: Gunicorn (for production deployment)

## Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=SmartCrop+Home+Page)

### Analysis Results
![Analysis Results](https://via.placeholder.com/800x400?text=SmartCrop+Analysis+Results)

## Installation

### Prerequisites
- Python 3.11 or higher
- pip (Python package installer)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smartcrop.git
   cd smartcrop
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:
   ```bash
   python main.py
   ```

5. Access the application at [http://localhost:5000](http://localhost:5000)

## Usage

1. Open the SmartCrop web application in your browser
2. Click on "Upload image of a crop" to select an image file
3. View the preview of your selected image
4. Click "Analyse" to process the image
5. Review the results, including:
   - The original image with highlighted affected areas
   - Disease classification label
   - Confidence score for the detection

## Project Structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for a detailed breakdown of the project's organization.

## Implementation Details

### Machine Learning Model

The application uses a PyTorch-based model for crop disease detection. The current implementation uses a placeholder prediction function for demonstration purposes. In a production environment, this would be replaced with a trained model capable of detecting various crop diseases.

### Image Processing Pipeline

1. User uploads an image through the web interface
2. The image is validated for format and size
3. The image is preprocessed (resized, normalized) for model input
4. The model analyzes the image to detect diseases
5. Results are returned to the frontend for visualization

## Planned Enhancements

- Integration with a full-fledged crop disease detection model
- Database storage for uploaded images and analysis results
- User authentication and history tracking
- Detailed disease information and treatment recommendations
- Mobile application version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Bootstrap for the responsive UI framework
- PyTorch for the machine learning capabilities
- Replit for the development environment