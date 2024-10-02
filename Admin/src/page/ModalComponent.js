import React, { useState } from "react";

export const ModalComponent = ({ isOpen, onClose, userData }) => {
  console.log("kkhhjhjhj", userData);

  // Data values (This could also be passed as props or fetched from an API)
  //   const userData = {
  //     name: "Rahul Singh",
  //     eventname: "School/college event",
  //     guest: "300 - 399 guests",
  //     service: "Walk in DJ using my/venue's equipment",
  //     music: ["Indian pop music"],
  //     language: ["Punjabi", "English", "Hindi"],
  //     venue: ["Hotel/Conference venue"],
  //     selectedoptiondate: "Yes",
  //     date: "2024-09-28",
  //     address: "Naskarhat Near Acropolis mall , kol - 700039",
  //     phonenumber: "7002334228",
  //     email: "rahul@gmail.com",
  //   };

  if (!isOpen) return null; // If modal is not open, return null

  return (
    <div
      style={{
        position: "fixed",
        top: "25px",
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Prevent body scroll when modal is open
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          width: "90%",
          maxWidth: "500px",
          maxHeight: "80%", // Set a max-height for the modal
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
          overflowY: "auto", // Enable scrolling for content overflow
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          <h2>Booking Details</h2>
          <button
            onClick={onClose}
            style={{
              fontSize: "40px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "red",
            }}
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ lineHeight: "1.6" }}>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {userData.phonenumber}
          </p>
          <p>
            <strong>Event Name:</strong> {userData.eventname}
          </p>
          <p>
            <strong>Guests:</strong> {userData.guest}
          </p>
          <p>
            <strong>Service:</strong> {userData.service}
          </p>
          <p>
            <strong>Music:</strong> {userData.music.join(", ")}
          </p>
          <p>
            <strong>Language:</strong> {userData.language.join(", ")}
          </p>
          <p>
            <strong>Venue:</strong> {userData.venue.join(", ")}
          </p>
          {userData?.date && (
            <p>
              <strong>Event Date:</strong> {userData.date}
            </p>
          )}
          {userData?.needdate && (
            <p>
              <strong>Event Date:</strong> {userData?.needdate}
            </p>
          )}

          <p>
            <strong>Address:</strong> {userData.address}
          </p>
        </div>
      </div>
    </div>
  );
};
