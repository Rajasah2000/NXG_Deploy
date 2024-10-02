import React from "react";

const Footer = () => {
  return (
    <>
      <footer id="footer" class="footer">
        <div class="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>Admin Dashboard</span>
          </strong>
          . All Rights Reserved
        </div>
        <div class="credits">
          Designed by{" "}
          <a target="_blank" href="javascript:">
            Lorem Ipsum
          </a>
        </div>
      </footer>
      <a
        href="#"
        class="back-to-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};

export default Footer;
