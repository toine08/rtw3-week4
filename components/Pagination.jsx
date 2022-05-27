import React from 'react'

const styles = {
  navBar: 'mx-auto mt-7 flex w-2/4 justify-center',
  activePageNumber: 'text-gray-200',
  pageNumber: 'text-gray-500 ',
  numberContainer:
    'flex justify-center gap-4 rounded-xl border-2 bg-transparent py-3 px-7 border-gray-400',
}

const Pagination = ({ nftsPerPage, totalNFTs, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNFTs / nftsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav className={styles.navBar}>
      <ul className={styles.numberContainer}>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => {
                paginate(number)
              }}
              href="#"
              className={
                currentPage === number
                  ? styles.activePageNumber
                  : styles.pageNumber
              }
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination