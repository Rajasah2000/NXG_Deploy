import React from "react";
import i1 from "../../Images/backgrounds/1 (1).png";
import i2 from "../../Images/backgrounds/2.png";
import "animate.css";
let cardData = [
  {
    image:
      "https://cloud.cueup.io/cdn-cgi/image/width=3840,format=auto,quality=75/https://cueup.io/_next/static/media/first_wedding_dance_of_newlywed.b0a627c4.jpg",
    title: "Wedding DJs that knows how to create a magical night.",
    text: "Wedding DJs",
  },
  {
    image:
      "https://cloud.cueup.io/cdn-cgi/image/width=3840,format=auto,quality=75/https://cueup.io/_next/static/media/office_party.149df039.jpg",
    title: "DJs that knows exactly corporate event should be pulled off.",
    text: "Corporate event DJs",
  },
  {
    image:
      "https://cloud.cueup.io/cdn-cgi/image/width=3840,format=auto,quality=75/https://cueup.io/_next/static/media/birthday_party.eda3fe76.jpg",
    title: "DJs for birthdays, anniversaries, and other private events.",
    text: "Birthday party DJs",
  },
  {
    image:
      "https://cloud.cueup.io/cdn-cgi/image/width=3840,format=auto,quality=75/https://cueup.io/_next/static/media/office_party.149df039.jpg",
    title: "DJs that knows exactly corporate event should be pulled off.",
    text: "Club party DJs",
  },
];

function Inspire() {
  return (
    <div className="container animate__animated animate__fadeInLeft">
      <div className="">
        <div className=" text-center">
          <p className="ins-title">
            Get Ready to Groove at Your Next DJ Event!
          </p>
          <p className="cust-card-text">
            Experience an unforgettable night with top DJs, amazing music, and a
            party you won't want to miss!
          </p>
          <div className=" cust-card">
            {cardData.map((ele, index) => {
              return (
                <div key={index} className="cust-card-main">
                  <div className="cust-img-cont">
                    <img src={ele.image} alt="img" className="cust-card-img" />
                  </div>
                  <div className=" cust-card-body">
                    <p className="cust-card-title">{ele.text}</p>
                    <p className="cust-card-text">{ele.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inspire;
