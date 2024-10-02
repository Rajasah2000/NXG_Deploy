import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from "../../Images/helicopter-banner2.jpg";
import img2 from "../../Images/helicopter-banner3.jpg";
import img3 from "../../Images/helicopter-banner4.jpg";
import ban1 from "../../";
import { fetchhotelBanner } from "../../Components/API";
function BannerSlider() {
  const [BannerData, setBannerData] = useState([]);
  // console.log('hjhhjhjhjhj', BannerData);

  useEffect(() => {
    BannerDataFetch();
  }, []);

  async function BannerDataFetch() {
    let res = await fetchhotelBanner();
    if (res && res?.status) {
      setBannerData(res?.data?.data?.images);
    }
  }
  const banner = [
    {
      Backimg:
        "https://d18jakcjgoan9.cloudfront.net/s/img/home/dj.jpg!d=v1NTZ1",
      event: "Birthday",
    },
    {
      Backimg:
        "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
      event: "Bar",
    },

    {
      Backimg:
        "https://cdn.pixabay.com/photo/2022/06/02/15/01/music-7238254_640.jpg",
      event: "Festivals",
    },
    {
      Backimg:
        "https://cdn.pixabay.com/photo/2024/04/05/05/17/concert-8676557_640.jpg",
      event: "ClubMix",
    },
    {
      Backimg:
        "https://cdn.pixabay.com/photo/2023/10/28/11/52/dj-8347229_640.jpg",
      event: "Weddings",
    },
    {
      Backimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4gTehzc5nC-uQkEMbaIvoZaozIebN3yzdVQ&s",
      event: "BizGroove",
    },
    {
      Backimg:
        "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
      event: "BassBash",
    },
  ];
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    autoplay: {
      delay: 5000,
    },
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="banner-slider">
      <Slider {...settings}>
        {banner?.map((item, index) => {
          return (
            <div
              key={index}
              className="banner_image_box"
              //  style={{ backgroundImage: `url(${item.Backimg})` }}
            >
              <img src={item?.Backimg} className="img-fluid" alt="image" />
              <div className="cust-box1">
                {/* <p className="carousel-text">tour Experience</p> */}
                <p className="carousel-title">
                  Find the{" "}
                  <span
                    style={{
                      fontSize: "6vw", // Adjust font size relative to viewport width
                      color: "yellow",
                      fontWeight: "bold", // Optional: makes the text bold
                      lineHeight: "1.2", // Optional: adjust line height for better readability
                      whiteSpace: "nowrap", // Optional: prevents text from wrapping
                    }}
                  >
                    perfect DJ
                  </span>{" "}
                  for your {item?.event}
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default BannerSlider;
