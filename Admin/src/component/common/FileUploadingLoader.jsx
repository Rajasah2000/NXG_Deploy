import React from 'react'

const FileUploadingLoader = () => {
    return (
        <>
            {/* <button class="btn btn-outline-primary" type="button" disabled=""> */}
            <div>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"
                    style={{ margin: "0 10px" }}
                ></span>
                Uploading...
                </div>
            {/* </button> */}
        </>
    )
}

export default FileUploadingLoader
