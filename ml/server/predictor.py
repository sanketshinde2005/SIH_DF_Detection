import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.layers import Dropout

# Define the FixedDropout layer
class FixedDropout(Dropout):
    def __init__(self, rate, **kwargs):
        super(FixedDropout, self).__init__(rate, **kwargs)
        self.supports_masking = True

    def _get_noise_shape(self, inputs):
        if self.noise_shape is None:
            return None
        symbolic_shape = K.shape(inputs)
        noise_shape = [symbolic_shape[axis] if shape is None else shape
                       for axis, shape in enumerate(self.noise_shape)]
        return tuple(noise_shape)

# Load the model with custom objects
model = load_model('balan_finallllll_model.h5', custom_objects={'FixedDropout': FixedDropout})

def preprocess_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (128, 128))  # Adjust input size to 128x128
    img = img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0  # Normalize to [0, 1] range
    return img

def predict_video():
    cropped_images_folder = 'cropped_images'
    
    # Ensure the folder contains cropped images
    if not os.path.exists(cropped_images_folder) or not os.listdir(cropped_images_folder):
        raise ValueError("No cropped images found in the folder.")

    predictions = []
    for image_file in os.listdir(cropped_images_folder):
        image_path = os.path.join(cropped_images_folder, image_file)
        img = preprocess_image(image_path)
        pred = model.predict(img)
        predictions.append(pred)

    # Step 4: Average the predictions
    average_prediction = np.mean(predictions)

    # Step 5: Classify as fake or real
    threshold = 0.2  # Assuming a binary classification with sigmoid output
    classification = 'Real' if average_prediction > threshold else 'Fake'

    return classification, average_prediction
