import React from 'react'
import BookRankingTable from '../../../../components/table-list/TableList'
import { tableData } from '../../../../components/data'

function AddusersPage() {
  return (
    <div className='flex direction-row justify-between'>
      
      <BookRankingTable data={tableData?.data} setPage={function (value: number): void {
        throw new Error('Function not implemented.')
      } } currentPage={0} totalPages={0} fromDate={''} toDate={''}                       
                    />
    </div>
  )
}

export default AddusersPage
