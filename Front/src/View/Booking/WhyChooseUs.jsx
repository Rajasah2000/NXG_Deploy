import React from "react";

function WhyChooseUs({data}) {
  console.log(data)
  return (
    <div className="why_choose_us_main">
      <div className="our_content_box">
        {
          data.map((ele,i)=>{
            let {img,title,text}=ele
            return(
              <div key={i} className="our_contents">
                  <div className="content_img_box">
                    <img src={img} alt="" />
                  </div>
                  <p className="content_title">{title}</p>
                  <p className="content_text">{text}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default WhyChooseUs;
