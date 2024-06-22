import { Button } from "antd";
import React from "react";
import ImageUploader from "react-image-upload";

function UploadAndViewVariationForm({ openedGame, handleSelectImage, handlePreviewImage }:any) {
  return (
    <div className="">
      <div className="SiteBannerContainer">
        <span className="">
          Add Site Banner
          <br />
          (1280 px by 150 px)
        </span>
        <div className="SiteBannerContainerBtns">
          <button className="uploadBtn">
            <ImageUploader
              style={{
                height: 29,
                width: 156,
                background: "##F9F7F7",
              }}
              uploadIcon="Upload"
              deleteIcon=""
              onFileAdded={(img) => handleSelectImage(img, "siteBanner")}
            />
          </button>
          <div className="PreviewAndDeleteBtns">
            <Button
              className={`previewBtn ${
                openedGame?.siteBanner !== "" ? "previewBtnActive" : ""
              }`}
              onClick={() => handlePreviewImage(openedGame?.siteBanner)}
            >
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadAndViewVariationForm;
