import React, { useEffect, useState, useCallback } from "react";
import { IoEyeOutline } from "react-icons/io5";
import {
  GetArchivedListApi,
  GetGamesArchivedFromListApi,
} from "../../../../services/ApiServices";
import { ImUndo2 } from "react-icons/im";
import ConfirmDeleteDialog from "../../../../components/confirm-dialog-box/ConfirmDeleteDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ArchivedVariation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [gameListData, setGameListData] = useState([]);
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(gameListData.length / rowsPerPage);
  const currentRows = gameListData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const fetchGamesList = useCallback(async () => {
    try {
      const gamelistResponse = await GetArchivedListApi();
      setGameListData(gamelistResponse?.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchGamesList();
  }, [fetchGamesList]);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleOpenConfirmDelete = (userId: any) => {
    setSelectedUserId(userId);
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleRestoreList = async () => {
    try {
      const response = await GetGamesArchivedFromListApi(selectedUserId);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setGameListData(
        gameListData.filter((user: any) => user.id !== selectedUserId)
      );
      toast.success("Variation Restored successfully!");
      setShowConfirmDelete(false);
    } catch (error) {
      console.error("Error Variation Restored :", error);
      toast.error("Error while Variation Restored .");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex gap-4">
        <div>
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
                          {row?.gameType === "snl" ? "SNL" : "KBC"}
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
                            // onClick={() => openGameDetails(row)}
                          />
                          <ImUndo2
                            className="text-lg cursor-pointer"
                            size={16}
                            onClick={() => handleOpenConfirmDelete(row?.id)}
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
        {showConfirmDelete && (
          <ConfirmDeleteDialog
            onClose={handleCloseConfirmDelete}
            onDelete={handleRestoreList}
            Heading={"Are you sure want to Restore Variation ?"}
            ActionBtnText={"Restore"}
            cancelBtn={"Cancel"}
          />
        )}
      </div>
    </div>
  );
}

export default ArchivedVariation;
