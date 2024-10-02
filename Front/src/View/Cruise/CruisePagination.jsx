import React from 'react'

function CruisePagination() {
  return (
    <>
       <div className="card-pagination-main">
                    <div className="pagination-arrow pagination-left-box">
                      &lt;
                    </div>
                    <ul className="page-list-box">
                      <li className="card-page">1</li>
                      <li className="card-page">2</li>
                      <li className="card-page active">3</li>
                      <li className="card-page">4</li>
                      <li className="card-page">5</li>
                      <p className="pagination-divisor">.......</p>
                      <li className="card-page">20</li>
                    </ul>
                    <div className="pagination-arrow pagination-right-box">
                      &gt;
                    </div>
                  </div>
                  <div className="pagination-text">
                    <p className="fw-light fs-6 w-100 text-center p-5">
                      1 – 20 of 300+ Helicopters found
                    </p>
                  </div>
    </>
  )
}

export default CruisePagination
