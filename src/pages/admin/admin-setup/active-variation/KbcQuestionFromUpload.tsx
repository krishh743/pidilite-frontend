import React, { useState, ChangeEvent } from "react";
import { Button, Upload, Modal, Input, Form, Space, Checkbox } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload/interface";

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

const KbcQuestionFormUpload: React.FC = () => {
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

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const handleAddQuestion = () => {
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
    ]);
  };

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

  const handlePreview = (file: string) => {
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
    newQuestions[qIndex].options[optIndex].isCorrect = !newQuestions[qIndex].options[optIndex].isCorrect;
    setQuestions(newQuestions);
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancelPreview = () => setPreviewOpen(false);

  const saveAllQuestions = () => {
    console.log(questions);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Aditional Details</h2>
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-8 p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Question {qIndex + 1}</h3>
          <Form layout="vertical">
            <Form.Item label="">
              <div className="flex flex-row justify-between gap-4 items-center">
                <Input
                  value={question.text}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(qIndex, "text", e.target.value)
                  }
                  className="h-8"
                />
                <Upload
                  listType="picture-card"
                  showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
                  onPreview={() => handlePreview(question.image)}
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
                      onChange={() => handleCheckboxChange(qIndex, optIndex)}
                    />
                  </Form.Item>
                  <Form.Item label={`Option ${optIndex + 1} Text`} className="flex-1">
                    <Input
                      value={option.text}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
                      showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
                      onPreview={() => handlePreview(option.image)}
                      onRemove={() => handleDeleteImage(qIndex, optIndex)}
                      beforeUpload={(file) => {
                        handleOptionFileChange(qIndex, optIndex, "image", file);
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
          onClick={handleAddQuestion}
          icon={<PlusOutlined />}
        >
          Add Question
        </Button>
        <Button
          onClick={saveAllQuestions}
          className="bg-black text-white font-bold"
        >
          Save Questions
        </Button>
      </div>
      <Modal
        visible={previewOpen}
        title="Image Preview"
        footer={null}
        onCancel={handleCancelPreview}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default KbcQuestionFormUpload;
