document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const uploadForm = document.getElementById('upload-form');
    const imageUpload = document.getElementById('image-upload');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const resultsContainer = document.getElementById('results-container');
    const resultCanvas = document.getElementById('result-canvas');
    const resultLabel = document.getElementById('result-label');
    const resultScore = document.getElementById('result-score');
    const loadingIndicator = document.getElementById('loading-indicator');
    const noResults = document.getElementById('no-results');
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');

    // Original image data to keep for drawing
    let originalImage = null;
    
    // Add event listener for file input change
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            displayImagePreview(file);
        }
    });
    
    // Add event listener for form submission
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const file = imageUpload.files[0];
        if (file) {
            analyzeImage(file);
        } else {
            showError('Please select an image first.');
        }
    });
    
    /**
     * Display preview of the uploaded image
     * @param {File} file - The uploaded image file
     */
    function displayImagePreview(file) {
        // Clear previous results
        clearResults();
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = new Image();
            
            img.onload = function() {
                // Store the original image for later use
                originalImage = img;
                
                // Set canvas dimensions
                const ctx = imagePreview.getContext('2d');
                
                // Calculate dimensions to maintain aspect ratio
                const maxWidth = 400;
                const maxHeight = 300;
                let width = img.width;
                let height = img.height;
                
                if (width > height) {
                    if (width > maxWidth) {
                        height = height * (maxWidth / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = width * (maxHeight / height);
                        height = maxHeight;
                    }
                }
                
                // Set canvas dimensions
                imagePreview.width = width;
                imagePreview.height = height;
                
                // Draw image on canvas
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);
                
                // Show the preview container
                imagePreviewContainer.classList.remove('d-none');
            };
            
            img.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }
    
    /**
     * Send the image to the server for analysis
     * @param {File} file - The image file to analyze
     */
    function analyzeImage(file) {
        // Show loading indicator
        loadingIndicator.classList.remove('d-none');
        noResults.classList.add('d-none');
        resultsContainer.classList.add('d-none');
        errorContainer.classList.add('d-none');
        
        // Create form data
        const formData = new FormData();
        formData.append('file', file);
        
        // Send the request to the server
        fetch('/analyze', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || 'Server error occurred');
                });
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            showError(error.message || 'An error occurred during analysis');
        })
        .finally(() => {
            loadingIndicator.classList.add('d-none');
        });
    }
    
    /**
     * Display the analysis results
     * @param {Object} data - The analysis results from the server
     */
    function displayResults(data) {
        // Check if we have valid results
        if (!data || data.error) {
            showError(data.error || 'Invalid response from server');
            return;
        }
        
        // Show results container
        resultsContainer.classList.remove('d-none');
        noResults.classList.add('d-none');
        
        // Update result text
        resultLabel.textContent = formatLabel(data.label);
        resultScore.textContent = `${(data.score * 100).toFixed(2)}%`;
        
        // Draw the result on canvas with bounding box
        drawResultCanvas(data);
    }
    
    /**
     * Draw the result on canvas with bounding box
     * @param {Object} data - The analysis results including bounding box coordinates
     */
    function drawResultCanvas(data) {
        if (!originalImage) return;
        
        const ctx = resultCanvas.getContext('2d');
        
        // Calculate dimensions to maintain aspect ratio
        const maxWidth = 400;
        const maxHeight = 300;
        let width = originalImage.width;
        let height = originalImage.height;
        
        if (width > height) {
            if (width > maxWidth) {
                height = height * (maxWidth / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = width * (maxHeight / height);
                height = maxHeight;
            }
        }
        
        // Set canvas dimensions
        resultCanvas.width = width;
        resultCanvas.height = height;
        
        // Draw image on canvas
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(originalImage, 0, 0, width, height);
        
        // Calculate scaling factors
        const scaleX = width / originalImage.width;
        const scaleY = height / originalImage.height;
        
        // Draw bounding box
        const scaledXMin = data.xmin * scaleX;
        const scaledYMin = data.ymin * scaleY;
        const scaledWidth = (data.xmax - data.xmin) * scaleX;
        const scaledHeight = (data.ymax - data.ymin) * scaleY;
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#00FF00';
        ctx.strokeRect(scaledXMin, scaledYMin, scaledWidth, scaledHeight);
        
        // Draw a semi-transparent overlay for the bounding box
        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        ctx.fillRect(scaledXMin, scaledYMin, scaledWidth, scaledHeight);
        
        // Display label above the bounding box
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#FFFFFF';
        
        // Create a background for the text
        const label = formatLabel(data.label);
        const textMetrics = ctx.measureText(label);
        const textPadding = 4;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(
            scaledXMin, 
            scaledYMin - 20, 
            textMetrics.width + (textPadding * 2), 
            20
        );
        
        // Draw the text
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(label, scaledXMin + textPadding, scaledYMin - 6);
    }
    
    /**
     * Format the label for display
     * @param {string} label - The raw label from the API
     * @returns {string} - The formatted label
     */
    function formatLabel(label) {
        if (!label) return 'Unknown';
        
        // Convert snake_case to Title Case with spaces
        return label
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    /**
     * Show error message
     * @param {string} message - The error message to display
     */
    function showError(message) {
        errorContainer.classList.remove('d-none');
        errorMessage.textContent = message;
        resultsContainer.classList.add('d-none');
        noResults.classList.add('d-none');
    }
    
    /**
     * Clear all results and error messages
     */
    function clearResults() {
        resultsContainer.classList.add('d-none');
        errorContainer.classList.add('d-none');
        noResults.classList.remove('d-none');
    }
});
