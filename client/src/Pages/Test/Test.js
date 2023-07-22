import React, { useEffect, useState, useCallback } from "react";
import "./Test.css";
import CropEasy from "../../Components/CropEasy/CropEasy";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./testCanvasUtils";
const Test = () => {
  const [file, setFile] = useState();
  const [change, setChange] = useState();

  // useEffect(() => {

  // }, [change])

  const handleChange = (e) => {
    const tmp = e.target.files[0];
    const tmp2 = URL.createObjectURL(tmp);
    setImageSrc(tmp2)
    setFile(tmp2);
  };

  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState()
  const [croppedImage, setCroppedImage] = useState()
  const [imageSrc, setImageSrc] = useState()

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])


  return (
    <>
      {!file ? (
        <>
          <div className="aa">
            <div className="aa">
              <input
                type="file"
                name="pipi"
                id=""
                style={{ width: "52px", height: "20px" }}
                onChange={handleChange}
              />
              <label htmlFor="pipi" className="rr">
                <span>File</span>
              </label>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="pag2-conainer">
            <div className="crop">
              <Cropper
                image={file}
                zoom={zoom}
                crop={crop}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                // mediaProps={{width: "250px", height: "250px"}}
                // style={{width:"500px", height:"500px"}}
                // mediaSize={}
              />
            </div>
            <div className="controls">
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
                className="zoom-range"
              />
              <button onClick={showCroppedImage}>Show results</button>
            </div>
          </div>
          <div className="result"><img src={croppedImage} alt="" /></div>
        </>
      )}
    </>
  );
};

export default Test;
