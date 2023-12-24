import React, { Component, forwardRef, useImperativeHandle } from "react";
import "./Uploader.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { useState } from "react";

const  Uploader = forwardRef((props, ref) => {
  let img = props.img

  const [imgshow, setImgShow] = useState(null);
  const [fileName, setFileName] = useState(null);
  
  return (
    <div
      onClick={() => {
        document.querySelector(".image-input").click()
      }}
    >
      <form className="file-uploader" action="">
        <input
          type="file"
          accept="image/*"
          className="image-input"
          hidden
          onChange={({ target: { files } }) => {
            img = files[0]
            props.updateImg(img)
            files[0] && setFileName(files[0].name);
            if (files) {
              setImgShow(URL.createObjectURL(files[0]));
              // tạo chuỗi URL đại diện cho object
            }
          }}
        />
        {imgshow ? (
          <img src={imgshow} width={120} height={120} alt={fileName} />
        ) : (
          <>
            {" "}
            <MdCloudUpload color="gray" size={60} />
            <p>Tải ảnh</p>
          </>
        )}
      </form>
    </div>
  );
})

export default Uploader;
