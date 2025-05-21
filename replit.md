# SmartCrop: Crop Disease Detection Application

## Overview

SmartCrop is a web application that allows users to upload images of crops to identify and detect diseases. The application uses a PyTorch-based machine learning model to analyze crop images and provide disease detection results, including bounding boxes around affected areas, disease labels, and confidence scores.

The system uses a Flask backend with a simple HTML/CSS/JavaScript frontend. Currently, the application has placeholder code for the model integration, with mock prediction results.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Technology**: HTML5, CSS3, JavaScript (vanilla)
- **UI Framework**: Bootstrap with Replit-themed dark mode
- **Main Components**:
  - Image upload interface
  - Canvas-based preview rendering
  - Results display with bounding box visualization
  - Loading indicators and error handling

### Backend
- **Framework**: Flask (Python 3.11)
- **Server**: Gunicorn for production deployment
- **Key Functionality**:
  - Image processing and validation
  - Integration with PyTorch model for inference
  - REST API endpoints for the frontend

### Machine Learning
- **Framework**: PyTorch
- **Current State**: Mock implementation with placeholder functions
- **Planned Implementation**: Pretrained crop disease detection model

## Key Components

### Flask Application (`app.py`)
The main Flask application that handles HTTP requests and serves the web interface. It currently includes:
- Route for the home page (`/`)
- Incomplete route for image analysis (`/analyze`)
- Logging configuration
- Placeholder for model loading

### Utility Functions (`utils.py`)
Contains helper functions for image preprocessing and model prediction:
- `preprocess_image()`: Transforms and normalizes images for model input
- `get_mock_model_prediction()`: Returns placeholder prediction data

### Frontend Templates (`templates/index.html`)
The main user interface built with Bootstrap:
- Image upload form
- Preview container
- Results display section
- Error handling elements

### Frontend Scripts (`static/js/main.js`)
Client-side logic for:
- Handling file uploads
- Displaying image previews
- Communicating with the backend API
- Rendering prediction results on canvas

### Frontend Styles (`static/css/style.css`)
Custom styling beyond Bootstrap:
- Canvas display enhancements
- UI element transitions and animations
- Responsive layout adjustments
- Card and button styling

## Data Flow

1. User uploads an image through the web interface
2. Frontend JavaScript validates and displays a preview of the image
3. On form submission, the image is sent to the backend via AJAX
4. Backend validates the file format and processes the image
5. Image is preprocessed (resized, normalized) for the ML model
6. Model predicts disease detection results (currently mocked)
7. Backend sends JSON response with prediction data
8. Frontend displays results by drawing bounding boxes and showing disease information

## External Dependencies

### Python Packages
- **Flask**: Web framework
- **SQLAlchemy**: ORM (currently unused but imported)
- **PyTorch**: Machine learning framework (CPU version)
- **TorchVision**: Computer vision utilities for PyTorch
- **Pillow**: Image processing
- **NumPy**: Numerical computing
- **Gunicorn**: WSGI HTTP Server
- **Psycopg2**: PostgreSQL adapter (currently unused)

### Frontend Libraries
- **Bootstrap**: UI framework via CDN (Replit theme)
- **Font Awesome**: Icon library via CDN

## Development Setup

To run the application locally:

1. Make sure Python 3.11 is installed
2. Install dependencies using `pip install -r requirements.txt`
3. Run the application with `python main.py`
4. Access the application at http://localhost:5000

## Deployment Strategy

The application is configured for deployment on Replit with the following features:

- **Gunicorn**: Production-ready WSGI HTTP server
- **Autoscaling**: Set up to automatically scale based on load
- **Port Configuration**: Binds to port 5000
- **Hot Reloading**: Enabled for development convenience
- **Dependencies**: Managed via pyproject.toml with specific CPU version of PyTorch

## Next Steps for Development

1. Complete the `/analyze` endpoint implementation
2. Integrate a real PyTorch model for crop disease detection
3. Add database storage for uploaded images and analysis results
4. Implement user authentication
5. Add detailed disease information and treatment recommendations
6. Develop a history view for previous analyses
7. Improve mobile responsiveness

## Technical Considerations

- The application is currently set up to use the CPU version of PyTorch, which may affect inference speed
- There's no database integration yet, though SQLAlchemy is imported
- Error handling is partially implemented but needs expansion
- File validation exists but could be strengthened