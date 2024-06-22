import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, Input, Modal } from "antd";
import { GrFormClose } from "react-icons/gr";
import {
  CreateUserListAPi,
  DeleteUserListAPi,
  GetUserListAPi,
} from "../../../../services/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDeleteDialog from "../../../../components/confirm-dialog-box/ConfirmDeleteDialog";

interface User {
  id: string;
  name: string;
  type: string;
  phoneNumber: string;
}

function AddusersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userListData, setUserListData] = useState<User[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const rowsPerPage = 10;
  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    uniqueId: generateUniqueId(),
    type: "2",
    status: "1",
  });

  const totalPages = Math.ceil(userListData.length / rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleAddUserClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenConfirmDelete = (userId: any) => {
    setSelectedUserId(userId);
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      uniqueId: generateUniqueId(),
      type: "2",
      status: "1",
    });
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await GetUserListAPi();
      setUserListData(response?.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const submitForm = async () => {
    try {
      await CreateUserListAPi(formData);
      toast.success("User created successfully!");
      setModalOpen(false);
      fetchUserList();
    } catch (error) {
      console.error("Error creating new user:", error);
      toast.error("Error creating new user.");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await DeleteUserListAPi(selectedUserId);

      toast.error("User deleted successfully!!");
      setShowConfirmDelete(false);
      fetchUserList();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error while deleting user.!");
    }
  };

  console.log(modalOpen, "dell");

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = Array.isArray(userListData)
    ? userListData.slice(indexOfFirstRow, indexOfLastRow)
    : [];
  // const currentRows = userListData.slice(indexOfFirstRow, indexOfLastRow);
  console.log(currentRows, "currentRows");

  return (
    <>
      <div className="flex direction-row justify-between items-center mb-4 w-1/2">
        <h2 className="text-xl font-bold">User Table</h2>
        <Button
          onClick={handleAddUserClick}
          className="text-sm bg-black text-white font-bold hover:bg-blue-700 px-4 rounded-md"
        >
          Add User
        </Button>
      </div>
      <ToastContainer />
      <div className="w-1/2 overflow-x-auto">
        <div className="rounded-sm border border-stroke bg-white px-4 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    S.No
                  </th>
                  <th className="min-w-[120px] py-4 px-4  font-medium text-black dark:text-white">
                    ID
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Products
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Type
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Total Sales
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
                      <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                        <p className="inline-flex py-1 px-3 text-sm font-medium">
                          {index + 1}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-4 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {row?.id}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                        <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                          {row.name}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-4 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        {row?.phoneNumber}
                      </td>
                      <td className="border-b border-[#eee] py-4 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        {row.type}
                      </td>
                      <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                        <AiOutlineDelete
                          className="text-lg cursor-pointer"
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
      <Modal
        open={modalOpen}
        onOk={submitForm}
        closeIcon={<></>}
        closable={false}
        width={730}
        centered
        footer={<></>}
      >
        <div className="">
          <div className="px-6 py-6 rounded-t-xl">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <b className="text-2xl">Add User</b>
                <b className="text-base text-graydark">
                  Fill Details for Creating Trainer.
                </b>
              </div>
              <GrFormClose
                onClick={handleCloseModal}
                style={{ fontSize: "40px", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 py-4">
          <div className="flex flex-col gap-3 px-6">
            <b className="text-lg text-[#4B4B4B]">Name </b>
            <Input
              placeholder="Enter Name"
              className="h-10 text-base focus:border-primary hover:border-primary"
              onChange={handleChange}
              value={formData.name}
              name="name"
            />
          </div>
          <div className="flex flex-col gap-3 px-6">
            <b className="text-lg text-[#4B4B4B]">Phone Number</b>
            <Input
              showCount
              maxLength={10}
              placeholder="Enter phone number"
              className="h-10 text-base focus:border-primary hover:border-primary"
              onChange={handleChange}
              value={formData.phoneNumber}
              name="phoneNumber"
            />
          </div>{" "}
          <div className="flex flex-col gap-3 px-6">
            <b className="text-lg text-[#4B4B4B]">Password</b>
            <Input
              placeholder="Enter Password"
              className="h-10 text-base focus:border-primary hover:border-primary"
              onChange={handleChange}
              value={formData.password}
              name="password"
            />
          </div>{" "}
          <div className="flex flex-col gap-3 px-6">
            <b className="text-lg text-[#4B4B4B]">Unique ID:</b>
            <Input
              showCount
              maxLength={100}
              className="h-10 text-base focus:border-primary hover:border-primary"
              onChange={handleChange}
              value={formData.uniqueId}
              name="status"
            />
          </div>{" "}
          <div className="flex flex-col gap-3 px-6">
            <b className="text-lg text-[#4B4B4B]">Type</b>
            <Input
              className="h-10 text-base focus:border-primary hover:border-primary"
              onChange={handleChange}
              value={formData.type}
              name="type"
            />
          </div>
        </div>
        <div className="flex items-center p-6 space-x-2 border-gray-200 rounded-b dark:border-gray-600">
          <button
            type="button"
            className="w-1/3 text-black border rounded-xl p-3 font-bold hover:border-primary hover:text-primary"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-full text-white bg-black rounded-xl p-3 font-bold"
            onClick={submitForm}
          >
            Add User
          </button>
        </div>
      </Modal>
      {showConfirmDelete && (
        <ConfirmDeleteDialog
          onClose={handleCloseConfirmDelete}
          onDelete={handleDeleteUser}
          Heading={"Are you sure want to delete ?"}
          ActionBtnText={"Delete"}
          cancelBtn={"Cancel"}
        />
      )}
    </>
  );
}

export default AddusersPage;
