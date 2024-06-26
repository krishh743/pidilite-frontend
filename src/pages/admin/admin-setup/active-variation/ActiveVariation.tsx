import React, { useEffect, useState, useCallback } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import { Button, Form, Input, Modal, Select, Upload, UploadProps } from "antd";
import { GetGamesListAPi } from "../../../../services/ApiServices";
import UploadAndViewVariationForm from "./UploadAndViewVariationForm";
import { PlusOutlined } from "@ant-design/icons";

type FileType = Parameters<NonNullable<UploadProps["beforeUpload"]>>[0];

const { Option } = Select;

interface IOptions {
  option: string;
  optionImage: string;
}

interface IQuestions {
  question: string;
  correctAnswer: number | string;
  questionImage: string;
  options: IOptions[];
}


interface gameOverview {
  id: number | null | string;
  gameType: string;
  variationName: string;
  mobileBanner: string;
  siteBanner: string;
  isNewGame: boolean;
  productImage: string;
  additionalDetails: {
    backgroundImage: string;
    trainerBackgroundImage: string;
    playerBackgroundImage: string;
    questions?: IQuestions[];
    img2: string;
    img6: string;
    img12: string;
    img16: string;
    img21: string;
    img25: string;
    img28: string;
    img33: string;
    img38: string;
    img41: string;
    img45: string;
    img48: string;
    img51: string;
    img58: string;
  };
}

const defaultGameOverview: gameOverview = {
  id: null,
  gameType: "",
  variationName: "",
  mobileBanner: "",
  siteBanner: "",
  isNewGame: false,
  productImage: "",
  additionalDetails: {
    backgroundImage: "",
    trainerBackgroundImage: "",
    playerBackgroundImage: "",
    questions: [
      {
        question: "",
        questionImage: "",
        options: [
          {
            option: "",
            optionImage: "",
          }
        ],
        correctAnswer: ""
      }
      ],

    img2: "",
    img6: "",
    img12: "",
    img16: "",
    img21: "",
    img25: "",
    img28: "",
    img33: "",
    img38: "",
    img41: "",
    img45: "",
    img48: "",
    img51: "",
    img58: "",
  },
};

function ActiveVariation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [gameListData, setGameListData] = useState([]);
  const [openedGame, setOpenedGame] = useState(defaultGameOverview);
  const [fileLists, setFileLists] = useState({
    siteBanner: [],
    mobileBanner: [],
    productImage: [],
    img2: [],
  });
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const [togleForm, setToggleForm] = useState("");

  const rowsPerPage = 10;
  const totalPages = Math.ceil(gameListData.length / rowsPerPage);
  const currentRows = gameListData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const fetchGamesList = useCallback(async () => {
    try {
      const gamelistResponse = await GetGamesListAPi();
      setGameListData(gamelistResponse?.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchGamesList();
  }, [fetchGamesList]);

  const handleGameTypeInputChange = useCallback((value: any) => {
    setOpenedGame((prevState) => ({
      ...prevState,
      gameType: value,
    }));
    setToggleForm(value);
  }, []);

  const handleVariationNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOpenedGame((prevState) => ({
      ...prevState,
      variationName: e.target.value,
    }));
  };

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const openGameDetails = useCallback((game: any) => {
    setOpenedGame({
      ...defaultGameOverview,
      ...game,
    });
  }, []);

  const handleOpenNewGameForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenedGame({
      id: "",
      gameType: "",
      variationName: "",
      mobileBanner: "",
      siteBanner: "",
      isNewGame: true,
      productImage: "",
      additionalDetails: {
        backgroundImage: "",
        trainerBackgroundImage: "",
        playerBackgroundImage: "",
        questions: [
          {
            question: "",
            correctAnswer: "",
            questionImage: "",
            options: [
              {
                option: "",
                optionImage: "",
              },
            ],
          },
        ],
        img2: "",
        img6: "",
        img12: "",
        img16: "",
        img21: "",
        img25: "",
        img28: "",
        img33: "",
        img38: "",
        img41: "",
        img45: "",
        img48: "",
        img51: "",
        img58: "",
      },
    });
  };

  const handleChange =
    (imageType: any) =>
    ({ fileList }: any) => {
      setFileLists((prevFileLists) => ({
        ...prevFileLists,
        [imageType]: fileList,
      }));
    };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handlePreviewImage = async (file: any) => {
    if (file.url) {
      setPreviewImage(file.url);
      setPreviewVisible(true);
      return;
    }
    const base64 = await getBase64(file.originFileObj as FileType);
    setPreviewImage(base64);
    setPreviewVisible(true);
  };

  const handleCancelGameDetailsUpdates = useCallback(() => {
    setOpenedGame(defaultGameOverview);
  }, []);

  return (
    <div> 
      <ToastContainer />
      <div className="flex gap-4">
        <div>
          <div className="flex direction-row justify-end items-center mb-4">
            <Button
              onClick={handleOpenNewGameForm}
              className="text-sm bg-black text-white font-bold hover:bg-blue-700 px-4 rounded-md"
            >
              Add Game
            </Button>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="rounded-sm border border-stroke bg-white px-4 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        S.No
                      </th>
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        Game Type
                      </th>
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Variation Name
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        Banner
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRows.map((row: any, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark text-left">
                          {index + 1}
                        </td>
                        <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark text-left">
                          {row?.gameType === "snl" ? "S&L" : "KBC"}

                        </td>
                        <td className="border-b border-[#eee] pl-10 dark:border-strokedark">
                          {row?.variationName}
                        </td>
                        <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark text-left">
                          {row?.mobileBanner}
                        </td>
                        <td className="flex gap-4 border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                          <IoEyeOutline
                            className="text-lg cursor-pointer"
                            onClick={() => openGameDetails(row)}
                          />
                          <AiOutlineDelete className="text-lg cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end gap-x-2 pb-2 mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="text-sm bg-meta-5 p-2 text-white rounded-md disabled:cursor-not-allowed disabled:bg-body hover:text-blue-700 cursor-pointer"
                >
                  Previous Page
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="text-sm bg-meta-5 p-2 text-white rounded-md disabled:cursor-not-allowed disabled:bg-body hover:text-blue-700 cursor-pointer"
                >
                  Next Page
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {openedGame.id === null ? (
            <div>No opened Game</div>
          ) : (
            <div className="w-full">
              <div className="flex direction-row justify-end gap-4 items-center mb-4">
                <Button className="text-sm bg-black text-white font-bold hover:bg-blue-700 px-4 rounded-md">
                  Save
                </Button>

                <Button
                  onClick={handleCancelGameDetailsUpdates}
                  className="text-sm bg-black text-white font-bold hover:bg-blue-700 px-4 rounded-md"
                >
                  Cancel
                </Button>
              </div>
              <div className="border px-6 py-6">
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Basic Details</span>
                    <span className="font-bold text-lg">{`Opened Game: ${openedGame.id}`}</span>
                  </div>
                  <Form layout="inline">
                    <Form.Item label="VARIATION NAME">
                      <Input
                        placeholder="Enter something..."
                        value={openedGame?.variationName}
                        onChange={handleVariationNameInputChange}
                      />
                    </Form.Item>
                    <Form.Item label="Game Type">
                      <Select
                        style={{ width: 200 }}
                        onChange={handleGameTypeInputChange}
                        value={openedGame.gameType}
                      >
                        <Option value="snl">S & L</Option>
                        <Option value="kbc">KBC</Option>
                      </Select>
                    </Form.Item>
                    <div className="flex flex-col justify-between gap-4 w-full"></div>
                  </Form>

                  <div className="flex justify-between">
                    <h3>Add Site Banner (1280 px by 150 px)</h3>
                    <Upload
                      action="/api/upload"
                      listType="picture-card"
                      fileList={fileLists.siteBanner}
                      onChange={handleChange("siteBanner")}
                      onPreview={handlePreviewImage}
                    >
                      {fileLists.siteBanner.length < 1 && (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </div>

                  <div className="flex justify-between">
                    <h3>Add Product Image</h3>

                    <Upload
                      action="/api/upload"
                      listType="picture-card"
                      fileList={fileLists.mobileBanner}
                      onChange={handleChange("mobileBanner")}
                      onPreview={handlePreviewImage}
                    >
                      {fileLists.mobileBanner.length < 1 && (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </div>
                  <div className="flex justify-between">
                    <h3>Add Mobile Banner (375 px by 181 px)</h3>
                    <Upload
                      action="/api/upload"
                      listType="picture-card"
                      fileList={fileLists.productImage}
                      onChange={handleChange("productImage")}
                      onPreview={handlePreviewImage}
                    >
                      {fileLists.productImage.length < 1 && (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </div>
               
                  <h2 className="text-xl font-bold">Additional Details
                  </h2>
                  <UploadAndViewVariationForm
                    openedGame={openedGame}
                    toggleForm={togleForm}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <Modal
          open={previewVisible}
          title="Image Preview"
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="preview" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    </div>
  );
}

export default ActiveVariation;
