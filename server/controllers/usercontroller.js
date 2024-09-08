import axios from "axios";
import fs from "fs";
import FormData from "form-data"
export const predict = async (req,res)=>{
    try {
        const videopath = req.file.path;
    console.log(videopath)

    if(videopath){
        const formData = new FormData();
        formData.append('video', fs.createReadStream(videopath));
        // console.log("returning 200");
        const flaskResponse = await axios.post('http://localhost:5001/receive-video', formData, {
            headers: formData.getHeaders(),
          });



       return res.status(200).send("sucess");
    }
    else{
      return  res.status(400).send("failed");
    }

        
    } catch (error) {
       return res.status(500).send("Internal server error")
    }
    
}