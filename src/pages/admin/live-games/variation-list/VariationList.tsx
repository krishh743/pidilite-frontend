import React, { useCallback, useEffect, useState } from "react";
import { GetGamesListAPi } from "../../../../services/ApiServices";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { Config } from "../../../../services/Config";

function VariationList() {
  const [gameListData, setGameListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewImageSrc, setPreviewImageSrc] = React.useState("");
  const [gameId, setGameId] = React.useState<number | null | string>(null);

  const [previewedGame, setPreviewedGame] = React.useState<any>({
    id: null,
    gameType: "",
    variationName: "",
    additionalDetails: {
      backgroundImage: "",
    },
  });

  const [openedGame, setOpenedGame] = React.useState<any>({
    id: null,
    gameType: "",
    variationName: "",
    additionalDetails: {
      backgroundImage: "",
    },
  });

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

  const rowsPerPage = 10;
  const totalPages = Math.ceil(gameListData.length / rowsPerPage);
  const currentRows = gameListData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handlePreviewGame = async (game: any) => {
    const image = await fetch(
      `${Config.BASE_API_URL}/download/${game.additionalDetails.backgroundImage}`,
      {
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    const imageBlob = await image.blob();
    setPreviewImageSrc(URL.createObjectURL(imageBlob));

    setPreviewedGame({
      id: game.id,
      gameType: game.gameType,
      variationName: game.variationName,
      additionalDetails: {
        backgroundImage: game.additionalDetails.backgroundImage,
      },
    });
  };

  const openGameDetails = async (game: any) => {
    handlePreviewGame(game);
    setGameId(null); // Reset QR
    if (previewedGame.id !== null) {
      setPreviewedGame({
        id: null,
        gameType: "",
        variationName: "",
        additionalDetails: {
          backgroundImage: "",
        },
      });
    }
    setOpenedGame({
      id: game.id,
      gameType: game.gameType,
      variationName: game.variationName,
      additionalDetails: {
        backgroundImage: game.additionalDetails.backgroundImage,
      },
    });
  };

  return (
    <div className="flex  gap-2">
      <div className=" overflow-x-auto w-1/2">
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

      {openedGame.id === null ? (
        <div className="">No opened Game</div>
      ) : (
        <>hello</>
      )}
    </div>
  );
}

export default VariationList;
