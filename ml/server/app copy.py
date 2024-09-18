from flask import Flask, request
import os
import frame_maker
import predictor

app = Flask(__name__)

# Ensure uploads directory exists
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'model_uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/receive-video', methods=['POST'])
def receive_video():
    if 'video' not in request.files:
        return "No video file part", 400

    video_file = request.files['video']
    if video_file.filename == '':
        return "No selected file", 400

    video_path = os.path.join(app.config['UPLOAD_FOLDER'], video_file.filename)
    video_file.save(video_path)
    
    # Step 1: Extract frames and crop faces using frame_maker
    frame_maker.process_video(video_path)
    
    # Step 2: Predict if video is fake or real
    classification, average_prediction = predictor.predict_video()

    

    return f"Video classified as: {classification} (Average prediction: {average_prediction:.4f})", 200

if __name__ == '__main__':
    app.run(port=5001)
