import React from 'react'
import { usePagination } from '../../../hooks/usePagination';

const MyPagination = ({totalPage, page, changePage}) => {
  let pagesArray = usePagination(totalPage);
  return (
    <div className='page-wrapper'>
    {pagesArray.map((p) => (
      <span
        onClick={() => changePage(p)}
        key={p}
        className={page === p ? 'page page-active' : 'page'}
      >
        {p}
      </span>
    ))}
  </div>
  )
}

export default MyPagination