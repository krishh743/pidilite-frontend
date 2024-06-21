import React from "react";
// import {Datum} from "../../pages/book-rankings/models/BookRankingResponseModel"
import {GrView} from "react-icons/gr";
import {useNavigate} from "react-router-dom";
interface TableThreeProps {
    data: any;
    setPage: (value: number) => void;
    currentPage: number;
    totalPages: number;
    fromDate: string; // Add fromDate prop
    toDate: string; // Add toDate prop
}
// @ts-ignore
const BookRankingTable: React.FC<TableThreeProps> = ({
                                               data,
                                               setPage,
                                           
                                                         // fromDate, // Receive fromDate prop
                                                         // toDate, // Receive toDate prop
                                           }) => {
    const navigate =useNavigate()
    // const filteredData = data.filter((row) => {
    //     const rowDate = new Date(row.created_at).toISOString().split("T")[0];
    //     return rowDate >= fromDate && rowDate <= toDate;
    // });

    return (
        <div
            className="rounded-sm border border-stroke bg-white px-5  pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark-text-white">
                            S.No
                        </th>
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark-text-white xl:pl-11">
                            Products
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark-text-white">
                            Type
                        </th>
                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark-text-white">
                            Total Sales
                        </th>
                        <th className="py-4 px-4 font-medium text-black dark-text-white">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    {data?.map((row:any) => (
                        <tr key={row.id} >
                            <td className="border-b border-[#eee]  py-4 px-4 dark-border-strokedark">
                                <p className="inline-flex py-1 px-3 text-sm font-medium">
                                    {row.id}
                                </p>
                            </td>
                            <td className="border-b border-[#eee] py-4 px-4 pl-9 dark-border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark-text-white">
                                    {row.name}
                                </h5>
                            </td>
                            <td className="border-b border-[#eee] py-4 px-4 dark-border-strokedark">
                                <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                    {row?.type}{" "}
                                    {row?.sub_type && `(${row?.sub_type})`}
                                </p>
                            </td>
                            <td className="border-b border-[#eee] py-4 px-4 pl-9 dark-border-strokedark xl:pl-11">
                            {row.name}
                            </td>

                            <td className="border-b border-[#eee] py-4 px-4 dark-border-strokedark " >
                                <GrView className=" font-lg cursor-pointer" onClick={()=> {
                                    navigate(`/rankings/product-views/${row.id}`)
                                }
                                }/>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end gap-x-2 pb-2 mt-4">
                <button
                    className="text-sm bg-meta-5 p-2 text-white rounded-md disabled:cursor-not-allowed disabled:bg-body hover:text-blue-700 cursor-pointer"
                    disabled={currentPage === 1}
                    onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                >
                    Previous Page
                </button>
                <button
                    className="text-sm bg-meta-5 p-2 text-white rounded-md disabled:cursor-not-allowed disabled:bg-body hover:text-blue-700 cursor-pointer"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        currentPage !== totalPages && setPage(currentPage + 1)
                    }
                >
                    Next Page
                </button>
            </div>

        </div>
    );
};
export default BookRankingTable;