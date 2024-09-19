import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/fileupload";
import { PREDICT_ROUTE } from "@/utils/constants";
function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState();
  const [images, setImages] = useState([]);
  const [classification, setClassification] = useState("");
  const [averagePrediction, setAveragePrediction] = useState(0);


  const ref = useRef();
  const [ispopped, setIspopped] = useState(true);
  let imageUrl = undefined;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleChange = async (e) => {
    // console.log("nnn");
    const video = e.target.files[0];
    if (video) {
      imageUrl = URL.createObjectURL(video);
    }
    console.log(video);
    setIsLoading(!isLoading);
    const formdata = new FormData();
    formdata.append("video", video);
    // console.log("hdwdw");

    const response = await axios.post(
      PREDICT_ROUTE,
      formdata,
      {
        withCredentials: true,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const { images, classification, average_prediction } = response.data;
    setImages(images);
    setClassification(classification);
    setAveragePrediction(average_prediction);
    console.log(response);

    setTimeout(() => {
      setIsLoading(false);
      setImage(imageUrl);
      // setIspopped(false);
    }, 5000);
    console.log(response);
    if (response.status === 200) {
      // setIsLoading(false);
      console.log("suc");
    } else {
      console.log("wdwd");
    }
  };

  return (
    <div className="min-h-screen w-full ">
      <div className="grid md:grid-cols-2 place-items-center my-20 mr-20">
        <div className="flex flex-col  gap-6 text-center md:text-left px-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Deepfake Detection
          </h1>
          <p className="text-lg text-gray-600">
            Trust your media, verify with us
          </p>
          <div className="flex justify-center md:justify-start">
            <Popup
              className=" rounded-lg bg-cyan-100"
              trigger={
                <button className="bg-[#398D8D] text-white py-2 px-4 rounded transition-transform transform hover:scale-105 hover:bg-[#2e6e6e]">
                  Get Started
                </button>
              }
              position="right center"
              modal
            >
              {ispopped && (
                <div className="w-full h-[500px] p-4 rounded-lg bg-[#398D8D] transition-transform transform scale-105 flex flex-col justify-center items-center">
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={handleChange}
                  />

                  {isLoading && (
                    <Lottie options={defaultOptions} height={400} width={400} />
                    // <div>laoding

                    // </div>
                  )}
                </div>
              )}
            </Popup>

            {/* <div className="w-full h-[500px] p-4 rounded-lg bg-cyan-100 transition-transform transform hover:scale-105 flex flex-col justify-center items-center">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                onChange={handleChange}
              />

              {isLoading && (
                // <Lottie
                // options={defaultOptions}
                //   height={400}
                //   width={400}
                // />
                <div>laoding</div>
              )}
            </div> */}
          </div>
        </div>
        <div className="hover:scale-105 duration-300 flex flex-col">
          <img src="DeepfakeDetection_Facebook.gif" alt="funny gif" />
          <p className="text-right text-sm">Image credits: Facebook AI</p>
        </div>
        {/* <div className="flex justify-center" ref={ref}>
          {image && <video width="500" controls src={image} />}
        </div> */}
      
        
      </div>
      <div className="w-full h-full flex flex-wrap gap-2 overflow-auto">
  {images.map((imageBase64, index) => (
    <div key={index} className="h-[200px] w-[90px]">
      <img 
        src={`data:image/jpeg;base64,${imageBase64}`} 
        alt={`Cropped Frame ${index + 1}`} 
        className="h-full w-full object-cover"
      />
    </div>
  ))}
</div>

      {/* <div className=" w-full h-full flex flex-cols gap-2 ">
                
                {console.log(images.length)}
                {
                images.map((imageBase64, index) => (
                  <div className="h-[200px] w-[90px]" >
                         <img 
                        key={index}
                        src={`data:image/jpeg;base64,${imageBase64}`} 
                        alt={`Cropped Frame ${index + 1}`} 
                        
                    />
                  </div>
                 
                ))}
            </div> */}
            <div>
              {
                classification && (
                  <h2>Result:{classification}</h2>
                )
              }
            </div>
    </div>
  );
}

export default Home;
