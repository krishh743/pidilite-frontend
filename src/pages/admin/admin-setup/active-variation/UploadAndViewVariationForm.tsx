import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Modal, Button } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Config } from "../../../../services/Config";
import { RcFile } from "antd/lib/upload/interface";
import { Input, Form, Checkbox } from "antd";

interface Option {
  text: string;
  image: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  image: string;
  options: Option[];
}

type FileType = Parameters<NonNullable<UploadProps["beforeUpload"]>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface UploadAndViewVariationFormProps {
  openedGame: any;
  toggleForm: string;
  fileLists: string[] | any;
  onChangeHandler: any;
  setFileLists: any;
  setOpenedGame: any;
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
        action={`${Config.BASE_API_URL}/upload/info`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        headers={{
          Authorization: `${localStorage.getItem("token")}`,
        }}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
    </div>
  );
};

const UploadAndViewVariationForm: React.FC<UploadAndViewVariationFormProps> = ({
  openedGame,
  toggleForm,
  fileLists,
  setFileLists,
  setOpenedGame,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // const [fileLists, setFileLists] = useState<{ [key: string]: UploadFile[] }>({
  //   backgroundImage: [],
  //   trainerBackgroundImage: [],
  //   playerBackgroundImage: [],
  //   img2: [],
  //   img6: [],
  //   img12: [],
  //   img16: [],
  //   img21: [],
  //   img25: [],
  //   img28: [],
  //   img33: [],
  //   img38: [],
  //   img41: [],
  //   img45: [],
  //   img48: [],
  //   img51: [],
  //   img58: [],
  // });

  const [questions, setQuestions] = useState<Question[]>([
    {
      text: "",
      image: "",
      options: [
        { text: "", image: "", isCorrect: false },
        { text: "", image: "", isCorrect: false },
        { text: "", image: "", isCorrect: false },
        { text: "", image: "", isCorrect: false },
      ],
    },
  ]);


console.log(openedGame,"opened")

  useEffect(() => {
    const initialFileLists: { [key: string]: UploadFile[] } = {};
    Object.keys(fileLists).forEach((key) => {
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
    // setFileLists(initialFileLists);
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

  const handleChange =
    (imageType: string): UploadProps["onChange"] =>
    ({ fileList: newFileList }) => {

      console.log('imageTYPE - newFileLIst', imageType, newFileList)
      setFileLists((prevFileLists: any) => ({
        ...prevFileLists,
        [imageType]: newFileList
        // additionalDetails: {
        //   ...prevFileLists.additionalDetails, 
        //   [imageType]: newFileList
        // }
      }));

      setOpenedGame((prevValue: any) => ({
        ...prevValue,
        additionalDetails: {
          ...prevValue.additionalDetails, 
          [imageType]: newFileList[0].response
        }
      }));
    };

  const handleCancelPreview = () => setPreviewOpen(false);

  const handleInputChange = (
    index: number,
    type: "text" | "image",
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[index][type] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    optIndex: number,
    type: "text" | "image",
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex][type] = value;
    setQuestions(newQuestions);
  };

  const handleFileChange = async (
    index: number,
    type: "image",
    file: RcFile
  ) => {
    const base64 = await getBase64(file);
    const newQuestions = [...questions];
    newQuestions[index][type] = base64;
    setQuestions(newQuestions);
  };

  const handleOptionFileChange = async (
    qIndex: number,
    optIndex: number,
    type: "image",
    file: RcFile
  ) => {
    const base64 = await getBase64(file);
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex][type] = base64;
    setQuestions(newQuestions);
  };

  const handlePreviewQuestionImage = (file: string) => {
    setPreviewImage(file);
    setPreviewOpen(true);
  };

  const handleDeleteImage = (qIndex: number, optIndex?: number) => {
    const newQuestions = [...questions];
    if (optIndex === undefined) {
      newQuestions[qIndex].image = "";
    } else {
      newQuestions[qIndex].options[optIndex].image = "";
    }
    setQuestions(newQuestions);
  };

  const handleCheckboxChange = (qIndex: number, optIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex].isCorrect =
      !newQuestions[qIndex].options[optIndex].isCorrect;
    setQuestions(newQuestions);
  };

  return (
    <>
      {toggleForm === "snl" ? (
        <div className="flex flex-col gap-6">
          {[
            {
              label: "Add Board Background Image (1174 px by 790 px)",
              imageType: "backgroundImage",
            },
            {
              label: "Add Trainer Background Image (1280 px by 720 px)",
              imageType: "trainerBackgroundImage",
            },
            {
              label: "Add Player Background Image (750 px by 1280 px)",
              imageType: "playerBackgroundImage",
            },
            { label: "Ladder 2 Pop up (790 px by 710 px)", imageType: "img2" },
            { label: "Ladder 5 Pop up (790 px by 710 px)", imageType: "img6" },
            {
              label: "Ladder 10 Pop up (790 px by 710 px)",
              imageType: "img12",
            },
            { label: "Snake 13 Pop up (790 px by 710 px)", imageType: "img16" },
            {
              label: "Ladder 17 Pop up (790 px by 710 px)",
              imageType: "img21",
            },
            { label: "Snake 20 Pop up (790 px by 710 px)", imageType: "img25" },
            {
              label: "Ladder 22 Pop up (790 px by 710 px)",
              imageType: "img28",
            },
            { label: "Snake 26 Pop up (790 px by 710 px)", imageType: "img33" },
            { label: "Snake 30 Pop up (790 px by 710 px)", imageType: "img38" },
            {
              label: "Ladder 32 Pop up (790 px by 710 px)",
              imageType: "img41",
            },
            {
              label: "Ladder 35 Pop up (790 px by 710 px)",
              imageType: "img45",
            },
            {
              label: "Ladder 37 Pop up (790 px by 710 px)",
              imageType: "img48",
            },
            { label: "Snake 39 Pop up (790 px by 710 px)", imageType: "img51" },
            { label: "Snake 45 Pop up (790 px by 710 px)", imageType: "img58" },
          ].map((field, index) => (
            <React.Fragment key={field.imageType}>
              <ImageUpload
                label={field.label}
                imageType={field.imageType}
                fileList={fileLists[field.imageType] || []}
                handleChange={handleChange(`${[field.imageType]}`)}
                handlePreview={handlePreviewImage}
              />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="p-4">
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-8 p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Question {qIndex + 1}
              </h3>
              <Form layout="vertical">
                <Form.Item label="">
                  <div className="flex flex-row justify-between gap-4 items-center">
                    <Input
                      value={question.text}
                      onChange={(e: any) =>
                        handleInputChange(qIndex, "text", e.target.value)
                      }
                      className="h-8"
                    />
                    <Upload
                      listType="picture-card"
                      showUploadList={{
                        showPreviewIcon: true,
                        showRemoveIcon: true,
                      }}
                      onPreview={() =>
                        handlePreviewQuestionImage(question.image)
                      }
                      onRemove={() => handleDeleteImage(qIndex)}
                      beforeUpload={(file) => {
                        handleFileChange(qIndex, "image", file);
                        return false;
                      }}
                    >
                      {question.image ? null : (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </div>
                </Form.Item>

                <div className="flex flex-col gap-4">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className="p-4 border rounded-lg shadow-sm flex items-center justify-between gap-4"
                    >
                      <Form.Item label="correct">
                        <Checkbox
                          checked={option.isCorrect}
                          onChange={() =>
                            handleCheckboxChange(qIndex, optIndex)
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        label={`Option ${optIndex + 1} Text`}
                        className="flex-1"
                      >
                        <Input
                          value={option.text}
                          onChange={(e: any) =>
                            handleOptionChange(
                              qIndex,
                              optIndex,
                              "text",
                              e.target.value
                            )
                          }
                        />
                      </Form.Item>
                      <Form.Item>
                        <Upload
                          listType="picture-card"
                          showUploadList={{
                            showPreviewIcon: true,
                            showRemoveIcon: true,
                          }}
                          onPreview={() =>
                            handlePreviewQuestionImage(option.image)
                          }
                          onRemove={() => handleDeleteImage(qIndex, optIndex)}
                          beforeUpload={(file) => {
                            handleOptionFileChange(
                              qIndex,
                              optIndex,
                              "image",
                              file
                            );
                            return false;
                          }}
                        >
                          {option.image ? null : (
                            <div>
                              <PlusOutlined />
                              <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                          )}
                        </Upload>
                      </Form.Item>
                    </div>
                  ))}
                </div>
              </Form>
            </div>
          ))}
          <div className="flex gap-4">
            <Button
              type="dashed"
              onClick={() =>
                setQuestions([
                  ...questions,
                  {
                    text: "",
                    image: "",
                    options: [
                      { text: "", image: "", isCorrect: false },
                      { text: "", image: "", isCorrect: false },
                      { text: "", image: "", isCorrect: false },
                      { text: "", image: "", isCorrect: false },
                    ],
                  },
                ])
              }
              icon={<PlusOutlined />}
            >
              Add Question
            </Button>
          </div>
          <Modal
            open={previewOpen}
            title="Image Preview"
            footer={null}
            onCancel={handleCancelPreview}
          >
            <img alt="preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
      )}
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
