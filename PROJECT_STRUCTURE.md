# SmartCrop Project Structure

This document provides a detailed explanation of the SmartCrop application's organization and code structure.

## Directory Structure

```
├── static/               # Static files directory
│   ├── css/              # CSS stylesheets
│   │   └── style.css     # Custom CSS for the application
│   └── js/               # JavaScript files
│       └── main.js       # Frontend logic for the application
├── templates/            # Flask HTML templates
│   └── index.html        # Main application page
├── .replit               # Replit configuration
├── app.py                # Main Flask application
├── generated-icon.png    # Application icon
├── main.py               # Entry point for the application
├── pyproject.toml        # Python project dependencies
├── utils.py              # Utility functions for image processing
├── README.md             # Project documentation
├── PROJECT_STRUCTURE.md  # This file
└── requirements.txt      # Python dependencies
```

## Key Components

### 1. Flask Application (`app.py`)

The core of the backend that:
- Initializes the Flask application
- Defines API routes and HTTP endpoints
- Handles image uploads and validation
- Processes images for analysis
- Returns prediction results to the frontend

Key functions:
- `index()`: Renders the main page
- `analyze()`: Processes uploaded images and returns analysis results
- Error handlers for 404 and 500 responses

### 2. Entry Point (`main.py`)

A simple file that:
- Imports the Flask app instance
- Runs the application when executed directly
- Configures the host and port for the server

### 3. Utility Functions (`utils.py`)

Helper functions for image processing and model operations:
- `preprocess_image()`: Transforms and normalizes images for the PyTorch model
- `get_mock_model_prediction()`: Returns sample prediction data (placeholder for actual model inference)

### 4. Frontend Template (`templates/index.html`)

The main HTML template that defines:
- Page structure and layout
- Form for image uploads
- Results display area
- Error handling elements
- Loading indicators
- Integration of CSS and JavaScript files

### 5. Frontend Styling (`static/css/style.css`)

Custom CSS that enhances the Bootstrap framework with:
- Canvas display optimizations
- Hover effects for interactive elements
- Responsive adjustments for different screen sizes
- Custom styling for result displays and error messages

### 6. Frontend Logic (`static/js/main.js`)

JavaScript code that handles:
- User interactions (file selection, form submission)
- Image preview generation
- AJAX communication with the server
- Processing and displaying results
- Drawing bounding boxes on detected regions
- Error handling and user feedback

## Data Flow

1. **User Interface Initialization**
   - The Flask app serves the `index.html` template
   - The browser loads HTML, CSS, and JavaScript
   - The UI displays the upload form

2. **Image Upload Process**
   - User selects an image using the file input
   - JavaScript displays a preview of the selected image
   - User clicks "Analyse" to submit the form
   - JavaScript sends the image to the server via AJAX

3. **Server-Side Processing**
   - Flask receives the image through the `/analyze` endpoint
   - The server validates the file format and size
   - The image is opened using PIL and converted to RGB
   - The image is preprocessed for the model input
   - The (currently mock) model generates prediction results
   - The server returns JSON with bounding box and label data

4. **Result Visualization**
   - JavaScript receives the prediction data
   - It draws the original image on a canvas
   - It adds a bounding box around the detected region
   - It displays the disease label and confidence score
   - The UI updates to show the complete analysis results

## Code Design Principles

### Separation of Concerns
- Backend (Flask) handles data processing and model integration
- Frontend (JavaScript) manages UI interactions and visualization
- Utility modules isolate reusable functions

### Error Handling
- Client-side validation for file selection
- Server-side validation for file formats
- Comprehensive try/except blocks
- User-friendly error messages

### Responsive Design
- Bootstrap grid system for layout
- Media queries for different screen sizes
- Flexible canvas sizing for image display

### Scalability Considerations
- Modular code organization for easy expansion
- Clear separation between mock components and production endpoints
- Configurable preprocessing pipeline