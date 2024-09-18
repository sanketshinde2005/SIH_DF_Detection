import cv2
import os
from mtcnn import MTCNN

def process_video(video_path):
    # Step 1: Read the video
    cap = cv2.VideoCapture(video_path)

    # Create a folder to save cropped images
    output_folder = 'cropped_images'
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Initialize MTCNN detector
    detector = MTCNN()

    # Step 2: Split video into 10 frames
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_interval = frame_count // 10  # Choose 10 frames evenly spaced
    frames = []

    for i in range(10):
        cap.set(cv2.CAP_PROP_POS_FRAMES, i * frame_interval)
        ret, frame = cap.read()
        if ret:
            frames.append(frame)
        else:
            print(f"Could not read frame {i}")
            break

    cap.release()

    # Step 3 & 4: Apply MTCNN and save cropped face images
    for idx, frame in enumerate(frames):
        result = detector.detect_faces(frame)
        if result:
            # Assume only one face per frame for simplicity
            x, y, width, height = result[0]['box']
            cropped_face = frame[y:y+height, x:x+width]
            save_path = os.path.join(output_folder, f'cropped_face_{idx}.jpg')
            cv2.imwrite(save_path, cropped_face)
        else:
            print(f"No face detected in frame {idx}")

    print("Cropped face images saved successfully.")
