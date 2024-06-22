import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { tableData } from "../../../../components/data";
import { IoEyeOutline } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import { Button } from "antd";
import { GetGamesListAPi } from "../../../../services/ApiServices";
import UploadAndViewVariationForm from "./UploadAndViewVariationForm";
import { Form, Input, Select, Upload, Row, Col } from "antd";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import KbcQuestionFromUpload from "./KbcQuestionFromUpload";

interface gameOverview {
  id: number | null | string;
  gameType: any;
  variationName: string;
  mobileBanner: string;
  siteBanner: string;
  isNewGame: boolean;
  productImage: string;
  additionalDetails: {
    backgroundImage: string;
    trainerBackgroundImage: string;
    playerBackgroundImage: string;
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

function ActiveVariation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [gameListData, setGameListData] = React.useState([]);
  const [selectedValue, setSelectedValue] = useState(null);


  const { Option } = Select;

  const [openedGame, setOpenedGame] = React.useState<gameOverview>({
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



  const handleGameTypeInputChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("e.target.value", e.target.value);
    setOpenedGame((prevState:any) => ({
      ...prevState,
      gameType: e.target.value,
    }));
  };


  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const rowsPerPage = 10;
  const totalPages = Math.ceil(gameListData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = gameListData.slice(indexOfFirstRow, indexOfLastRow);

  const fetchGamesList = async () => {
    try {
      const gamelistResponse = await GetGamesListAPi();

      setGameListData(gamelistResponse?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGamesList();
  }, []);

  const openGameDetails = (game: any) => {
    setOpenedGame({
      id: game.id,
      gameType: game.gameType,
      variationName: game.variationName,
      mobileBanner: game.mobileBanner,
      siteBanner: game.siteBanner,
      isNewGame: false,
      productImage: game.productImage,
      additionalDetails: {
        backgroundImage: game.additionalDetails.backgroundImage,
        trainerBackgroundImage: game.additionalDetails.trainerBackgroundImage,
        playerBackgroundImage: game.additionalDetails.playerBackgroundImage,
        img2: game.additionalDetails.img2,
        img6: game.additionalDetails.img6,
        img12: game.additionalDetails.img12,
        img16: game.additionalDetails.img16,
        img21: game.additionalDetails.img21,
        img25: game.additionalDetails.img25,
        img28: game.additionalDetails.img28,
        img33: game.additionalDetails.img33,
        img38: game.additionalDetails.img38,
        img41: game.additionalDetails.img41,
        img45: game.additionalDetails.img45,
        img48: game.additionalDetails.img48,
        img51: game.additionalDetails.img51,
        img58: game.additionalDetails.img58,
      },
    });
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex gap-4">
        <div>
          <div className="flex direction-row justify-end items-center mb-4">
            <Button
              // onClick={handleAddUserClick}
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
                      <th className="min-w-[120px] py-4 px-4  font-medium text-black dark:text-white">
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
                    {currentRows &&
                      currentRows?.map((row: any, index) => (
                        <tr key={index}>
                          <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark text-left">
                            {/* <p className="inline-flex py-1 px-3 text-sm font-medium text-left"> */}
                            {index + 1}
                            {/* </p> */}
                          </td>
                          <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark  text-left">
                            {/* <h5 className="font-medium text-black dark:text-white"> */}
                            {row?.id}
                            {/* </h5> */}
                          </td>
                          <td className="border-b border-[#eee] pl-10 dark:border-strokedark ">
                            {/* <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success"> */}
                            {row.variationName}
                            {/* </p> */}
                          </td>
                          <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark  text-left">
                            {row?.mobileBanner}
                          </td>

                          <td className="flex gap-4 border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                            <IoEyeOutline
                              className="text-lg cursor-pointer"
                              onClick={() => openGameDetails(row)}
                            />
                            <AiOutlineDelete
                              className="text-lg cursor-pointer"
                              // onClick={() => handleOpenConfirmDelete(row?.id)}
                            />
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
            <div className="">No opened Game</div>
          ) : (
            <>
              <div className="w-full">
                <div className="flex direction-row justify-end items-center mb-4">
                  <Button
                    // onClick={handleAddUserClick}
                    className="text-sm bg-black text-white font-bold hover:bg-blue-700 px-4 rounded-md"
                  >
                    Save
                  </Button>
                  <Button
                    // onClick={handleAddUserClick}
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
                      <Form.Item
                        label="VARIATION NAME
                      "
                      >
                        <Input
                          placeholder="Enter something..."
                          value={openedGame?.variationName}
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
                    </Form>
                    {openedGame.gameType === "snl" ? (
                      <>
                        <UploadAndViewVariationForm />
                      </>
                    ) : (
                      <>
                        <KbcQuestionFromUpload />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveVariation;
