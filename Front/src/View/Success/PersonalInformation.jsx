import React from 'react'

function PersonalInformation({data}) {
    
  return (
    <div className='personal_info-main'>
      {
        data.map((ele,i)=>{
            let {qus,ans}=ele
            return(
                <div key={i} className='person_information'>
                    <p className='person-qus'>{qus}</p>
                    <p className='person-ans'>{ans}</p>
                </div>
            )
        })
      }
    </div>
  )
}

export default PersonalInformation
