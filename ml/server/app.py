from flask import Flask, request, jsonify
import os
import frame_maker
import predictor
import cv2
import base64

app = Flask(__name__)

# Ensure uploads directory and cropped images folder exist
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'model_uploads')
CROPPED_IMAGES_FOLDER = os.path.join(os.getcwd(), 'cropped_images')  # Path to cropped images folder
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
if not os.path.exists(CROPPED_IMAGES_FOLDER):
    os.makedirs(CROPPED_IMAGES_FOLDER)

@app.route('/receive-video', methods=['POST'])
def receive_video():
    # Check if video file is in the request
    if 'video' not in request.files:
        return jsonify({"error": "No video file part"}), 400

    video_file = request.files['video']
    if video_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the video file
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], video_file.filename)
    video_file.save(video_path)
    
    # Step 1: Extract frames and crop faces using frame_maker
    try:
        frame_maker.process_video(video_path)
    except Exception as e:
        return jsonify({"error": f"Error processing video: {str(e)}"}), 500

    # Step 2: Iterate over the "cropped_images" folder and convert images to base64
    image_buffers = []
    try:
        for filename in os.listdir(CROPPED_IMAGES_FOLDER):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):  # Ensure it's an image file
                img_path = os.path.join(CROPPED_IMAGES_FOLDER, filename)
                img = cv2.imread(img_path)
                
                # Encode image as a buffer
                success, buffer = cv2.imencode('.jpg', img)
                if success:
                    # Convert the buffer to base64 string
                    img_base64 = base64.b64encode(buffer).decode('utf-8')
                    image_buffers.append(img_base64)
    except Exception as e:
        return jsonify({"error": f"Error encoding images: {str(e)}"}), 500
    
    # Step 3: Predict if the video is fake or real using predictor
    try:
        classification, average_prediction = predictor.predict_video()
    except Exception as e:
        return jsonify({"error": f"Error during prediction: {str(e)}"}), 500
    
    # Step 4: Return JSON response with classification, average prediction, and base64-encoded images
    print(classification)
    response_data = {
        "classification": classification,
        "average_prediction": float(average_prediction),  # Ensure it's JSON serializable
        "images": image_buffers  # List of base64-encoded image buffers
    }

    return jsonify(response_data), 200

if __name__ == '__main__':
    app.run(port=5001)
