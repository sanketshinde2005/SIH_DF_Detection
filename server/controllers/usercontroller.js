import axios from "axios";
import fs from "fs";
import FormData from "form-data";

// Function to decode base64 and save images (optional, you may skip saving locally if just sending to frontend)
const saveBase64Image = (base64String, filePath) => {
    const buffer = Buffer.from(base64String, 'base64');
    fs.writeFileSync(filePath, buffer);
}

export const predict = async (req, res) => {
    try {
        const videopath = req.file.path;
        console.log(videopath);

        if (videopath) {
            const formData = new FormData();
            formData.append('video', fs.createReadStream(videopath));

            const flaskResponse = await axios.post('http://localhost:5000/receive-video', formData, {
                headers: formData.getHeaders(),
            });
            console.log(flaskResponse.data)
            // Extract images and classification data from the response
            const { images, classification, average_prediction } = flaskResponse.data;

            // Optional: Save images to disk (if you still want to store them locally)
            images.forEach((imageBase64, index) => {
                const imagePath = `./saved_images/image_${index + 1}.jpg`;
                saveBase64Image(imageBase64, imagePath);
                console.log(`Saved image: ${imagePath}`);
            });

            // Send response back to frontend with base64-encoded images and classification result
            return res.status(200).json({
                message: "Success",
                classification: classification,
                average_prediction: average_prediction,
                images: images  // Send base64 strings directly
            });
        } else {
            return res.status(400).send("Video file missing");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}
