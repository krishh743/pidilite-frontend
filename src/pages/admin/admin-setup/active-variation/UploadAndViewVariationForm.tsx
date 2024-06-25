import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Modal } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Config } from "../../../../services/Config";

type FileType = Parameters<NonNullable<UploadProps['beforeUpload']>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface UploadAndViewVariationFormProps {
  openedGame: any;
}

interface ImageUploadProps {
  label: string;
  imageType: string;
  fileList: UploadFile[];
  handleChange: UploadProps["onChange"];
  handlePreview: (file: UploadFile) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  imageType,
  fileList = [],
  handleChange,
  handlePreview,
}) => {
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="flex flex-row gap-10 items-center justify-between">
      <b className="text-md">{label}</b>
      <Upload
        action={`${Config.BASE_API_URL}/upload`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        headers={{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
    </div>
  );
};

const UploadAndViewVariationForm: React.FC<UploadAndViewVariationFormProps> = ({
  openedGame,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileLists, setFileLists] = useState<{ [key: string]: UploadFile[] }>({
    siteBanner: [],
    mobileBanner: [],
    productImage: [],
    backgroundImage: [],
    trainerBackgroundImage: [],
    playerBackgroundImage: [],
    img2: [],
    img6: [],
    img12: [],
    img16: [],
    img21: [],
    img25: [],
    img28: [],
    img33: [],
    img38: [],
    img41: [],
    img45: [],
    img48: [],
    img51: [],
    img58: [],
  });

  useEffect(() => {
    const initialFileLists: { [key: string]: UploadFile[] } = {};
    Object.keys(fileLists).forEach(key => {
      if (openedGame[key]) {
        initialFileLists[key] = [
          {
            uid: `-${key}`,
            name: key,
            status: "done",
            url: openedGame[key],
          },
        ];
      } else {
        initialFileLists[key] = [];
      }
    });
    setFileLists(initialFileLists);
  }, [openedGame]);

  const handlePreviewImage = async (file: UploadFile) => {
    if (file.url) {
      setPreviewImage(file.url);
      setPreviewOpen(true);
      return;
    }
    const base64 = await getBase64(file.originFileObj as FileType);
    setPreviewImage(base64);
    setPreviewOpen(true);
  };

  const handleChange = (imageType: string): UploadProps["onChange"] => ({ fileList: newFileList }) => {
    setFileLists((prevFileLists) => ({
      ...prevFileLists,
      [imageType]: newFileList,
    }));
  };

  const handleCancelPreview = () => setPreviewOpen(false);

  const imageFields = [
    { label: "Site Banner (1280 px by 150 px)", imageType: "siteBanner" },
    { label: "Add Product Image", imageType: "productImage" },
    { label: "Add Mobile Banner (375 px by 181 px)", imageType: "mobileBanner" },
    { label: "Add Board Background Image (1174 px by 790 px)", imageType: "backgroundImage" },
    { label: "Add Trainer Background Image (1280 px by 720 px)", imageType: "trainerBackgroundImage" },
    { label: "Add Player Background Image (750 px by 1280 px)", imageType: "playerBackgroundImage" },
    { label: "Ladder 2 Pop up (790 px by 710 px)", imageType: "img2" },
    { label: "Ladder 5 Pop up (790 px by 710 px)", imageType: "img6" },
    { label: "Ladder 10 Pop up (790 px by 710 px)", imageType: "img12" },
    { label: "Snake 13 Pop up (790 px by 710 px)", imageType: "img16" },
    { label: "Ladder 17 Pop up (790 px by 710 px)", imageType: "img21" },
    { label: "Snake 20 Pop up (790 px by 710 px)", imageType: "img25" },
    { label: "Ladder 22 Pop up (790 px by 710 px)", imageType: "img28" },
    { label: "Snake 26 Pop up (790 px by 710 px)", imageType: "img33" },
    { label: "Snake 30 Pop up (790 px by 710 px)", imageType: "img38" },
    { label: "Ladder 32 Pop up (790 px by 710 px)", imageType: "img41" },
    { label: "Ladder 35 Pop up (790 px by 710 px)", imageType: "img45" },
    { label: "Ladder 37 Pop up (790 px by 710 px)", imageType: "img48" },
    { label: "Snake 39 Pop up (790 px by 710 px)", imageType: "img51" },
    { label: "Snake 45 Pop up (790 px by 710 px)", imageType: "img58" },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        {imageFields.map((field, index) => (
          <React.Fragment key={field.imageType}>
            {index === 3 && <h2 className="text-lg font-bold">ADDITIONAL DETAILS</h2>}
            <ImageUpload
              label={field.label}
              imageType={field.imageType}
              fileList={fileLists[field.imageType] || []}
              handleChange={handleChange(field.imageType)}
              handlePreview={handlePreviewImage}
            />
          </React.Fragment>
        ))}
      </div>
      <Modal
        open={previewOpen}
        title="Image Preview"
        footer={null}
        onCancel={handleCancelPreview}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadAndViewVariationForm;
