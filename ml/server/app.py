from flask import Flask, request
import os

app = Flask(__name__)

# Ensure uploads directory exists
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'model_uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/receive-video', methods=['POST'])
def receive_video():
    if 'video' not in request.files:
        print("No video file part in request")
        return "No video file part", 400

    video_file = request.files['video']
    if video_file.filename == '':
        print("No selected file")
        return "No selected file", 400
    
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], video_file.filename)

    print(f"Received file: {video_file.filename}")
    print(f"Saving video to: {video_path}")
    video_file.save(video_path)

    print(f"Video saved successfully at {video_path}")
    
    return "Video received successfully", 200

if __name__ == '__main__':
    app.run(port=5001)
