import exppress from "express";
import { predict } from "../controllers/usercontroller.js";
import multer from "multer"
const userroutes = exppress.Router();
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads/videos")
    },
    filename: function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const upload = multer({storage});

userroutes.post("/predict",upload.single('video'),predict);

export default userroutes;