import React, { useState } from "react";
import cru_pic from "../../Images/th.jpg";
import Cruisecard from "./Cruisecard";
import CruisePagination from "./CruisePagination";
import CruiseCardModal from "./CruiseCardModal";
import CruiseFilter from "./CruiseFilter";
import CruiseHeading from "./CruiseHeading";

function CruiseList() {
  const [open, setOpen] = useState(false);

  const onFilter = () => {
    setOpen(true);
  };

  const filter_type = [
    {
      text: "inside",
      amount: "92",
    },
    {
      text: "Outside",
      amount: "92",
    },
    {
      text: "Suite",
      amount: "92",
    },
    {
      text: "Balcony",
      amount: "92",
    },
  ];

  const cruise_type = [
    {
      text: "Family Cruises",
      amount: "92",
    },
    {
      text: "Luxary Cruises",
      amount: "45",
    },
    {
      text: "River Cruises",
      amount: "21",
    },
  ];

  const port = [
    {
      text: "Family Cruises",
      amount: "92",
    },
    {
      text: "Luxary Cruises",
      amount: "45",
    },
    {
      text: "River Cruises",
      amount: "21",
    },
  ];
  const cruises = [
    {
      cru_image: cru_pic,
      cru_name: "GuyVip Getaway",
      rating: "4.8",
      review: "94 reviews",
      cru_journey: "Bell 412EP helicopter to the Western Guyana",
      journey_date: "18/06/2022",
      dept_place: "Guyana",
      Arive_ports: "Guyana",
      price: "US$72",
    },
    {
      cru_image: cru_pic,
      cru_name: "GuyVip Getaway",
      rating: "4.8",
      review: "94 reviews",
      cru_journey: "Bell 412EP helicopter to the Western Guyana",
      journey_date: "18/06/2022",
      dept_place: "Guyana",
      Arive_ports: "Guyana",
      price: "US$72",
    },
    {
      cru_image: cru_pic,
      cru_name: "GuyVip Getaway",
      rating: "4.8",
      review: "94 reviews",
      cru_journey: "Bell 412EP helicopter to the Western Guyana",
      journey_date: "18/06/2022",
      dept_place: "Guyana",
      Arive_ports: "Guyana",
      price: "US$72",
    },
  ];

  return (
    <>
             <div className="" style={{    background: '#000',
    height: '90px'}}/>
      {!open && (
        <div className="cruise_list1-europe-cruise">
          <div className="container">
            <CruiseHeading />
            <div className="mt-2 europe-main-box ">
              <CruiseFilter />
              <div className="europe-catagory-box">
                <div className="container">
                  <div className="catagory-upper-box">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="category-text">
                        <strong>3,269 Helicopters</strong>
                        &nbsp; in Guyana
                      </p>
                      <div className="upper_filter_sort_boxes">
                        <div className="sort-box">
                          <i className="fa-solid fa-arrow-down-up-across-line"></i>
                          <p className="sort-text">Sort</p>
                        </div>
                        <div className="sort-box filter-box" onClick={onFilter}>
                          <i className="fa-solid fa-arrow-down-up-across-line"></i>
                          <p className="sort-text">Filter</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="catagory-Lower-box">
                    {cruises.map((e, i) => {
                      return <Cruisecard key={i} data={{ ...e }} />;
                    })}
                  </div>
                  <div className="catagory-pagination-box py-5">
                    <CruisePagination />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {open && (
        <CruiseCardModal
          setOpen={setOpen}
          filter_type={filter_type}
          port={port}
          cruise_type={cruise_type}
        />
      )}
    </>
  );
}

export default CruiseList;
