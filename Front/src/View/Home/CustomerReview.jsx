import React from "react";
import pro_pic from "../../Images/profile_pic.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CustomerCard from "./CustomerCard";
function CustomerReview() {

    let settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
        
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
       
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
    
            }
          }
        ]
      };


  const customer_review = [
    {
      hotel: "Hotel Equatorial Melaka",
      desc: "Our family was traveling via bullet train between cities in Japan with our luggage - the location for this hotel made that so easy. Agoda price was fantastic.",
      image:pro_pic,
      deg:"Web designer",
      name:"Courtney Henry"
    },
    {
        hotel: "Hotel Equatorial Melaka",
        desc: "Our family was traveling via bullet train between cities in Japan with our luggage - the location for this hotel made that so easy. Agoda price was fantastic.",
        image:pro_pic,
        deg:"Web designer",
        name:"Courtney Henry"
      },
      {
        hotel: "Hotel Equatorial Melaka",
        desc: "Our family was traveling via bullet train between cities in Japan with our luggage - the location for this hotel made that so easy. Agoda price was fantastic.",
        image:pro_pic,
        deg:"Web designer",
        name:"Courtney Henry"
      },
      {
        hotel: "Hotel Equatorial Melaka",
        desc: "Our family was traveling via bullet train between cities in Japan with our luggage - the location for this hotel made that so easy. Agoda price was fantastic.",
        image:pro_pic,
        deg:"Web designer",
        name:"Courtney Henry"
      },
      {
        hotel: "Hotel Equatorial Melaka",
        desc: "Our family was traveling via bullet train between cities in Japan with our luggage - the location for this hotel made that so easy. Agoda price was fantastic.",
        image:pro_pic,
        deg:"Web designer",
        name:"Courtney Henry"
      }
  ];

  return (
        <div className="customer_review_main">
           <Slider {...settings}>
                {
                    customer_review.map((ele,i)=>{
                        return(
                          <CustomerCard key={i} data={{...ele}}/>
                        )
                    })
                }
           </Slider>
        </div>
        )
}

export default CustomerReview;
