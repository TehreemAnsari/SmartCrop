import torch
import torchvision.transforms as transforms
from PIL import Image
import numpy as np

def preprocess_image(image):
    """
    Preprocess the PIL image for input to a PyTorch model.
    
    Args:
        image (PIL.Image): Input image
        
    Returns:
        torch.Tensor: Preprocessed image tensor
    """
    # Define preprocessing transforms (adjust based on your model's requirements)
    preprocess = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])
    
    # Apply preprocessing
    tensor = preprocess(image)
    return tensor

def get_mock_model_prediction():
    """
    Return a mock prediction that simulates crop disease detection results.
    In a real application, this would be replaced by actual model inference.
    
    Returns:
        dict: Mock prediction results including bounding box, label and confidence score
    """
    # This is a mock response for demonstration purposes
    # In a production app, this would be the actual model output
    return {
        "xmin": 50, 
        "ymin": 40, 
        "xmax": 200, 
        "ymax": 180, 
        "label": "wheat_healthy", 
        "score": 0.98
    }
