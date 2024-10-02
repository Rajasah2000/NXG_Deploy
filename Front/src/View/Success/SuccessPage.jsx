import React from 'react'
import SuccessUpper from './SuccessUpper'
import OrderDetails from './OrderDetails'
import PersonalInformation from './PersonalInformation'


function SuccessPage() {


  const person_data=[
    {
      qus:"First name",
      ans:"System"
    },
    {
      qus:"Last name",
      ans:"Admin"
    },
    {
      qus:"Email",
      ans:"admin@guyvip.test"
    },    
    {
      qus:"Phone",
      ans:"112 666 888"
    },
    {
      qus:"Address line 1",
      ans:""
    },
    {
      qus:"Address line 2",
      ans:""
    },
    {
      qus:"City",
      ans:"Guyana"
    },
    {
      qus:"State/Province/Region",
      ans:""
    },
    {
      qus:"ZIP code/Postal code",
      ans:""
    },
    {
      qus:"Country",
      ans:"Guyana"
    },
    {
      qus:"Special Requirements",
      ans:""
    }  
  ]


  return (
    <>
    <div className="" style={{    background: '#000',
    height: '90px'}}/>
    <div className='success_page_section'>
      <div className="container">
        <div className="success_upper_box">
            <SuccessUpper/>
        </div>
        <div className="success_order-details">
          <OrderDetails/>
        </div>
        <div className="personal_information_section">
          <p className='form_text'>Your Information</p>
          <PersonalInformation data={[...person_data]}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default SuccessPage
