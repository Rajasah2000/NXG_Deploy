import React from 'react'

const Loader = () => {
  return (
    <>
      <div class="card">
        <div class="card-body">
    
  

          <button class="btn btn-outline-primary" type="button" disabled="">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"
            style={{marginRight:"10px"}}
            ></span>
            Loading...
          </button>


        </div>
      </div>
    </>
  )
}

export default Loader
