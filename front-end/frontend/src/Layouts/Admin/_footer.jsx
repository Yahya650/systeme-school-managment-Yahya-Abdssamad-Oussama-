import React from "react";

const _footer = () => {
  return (
    <footer>
      <p>
        Copyright © {Date().split(" ")[3]} YahyaHamdy{" "}
        <small style={{ fontSize: "11px" }} className="text-body-secondary">
          skaydi
        </small>
        .
      </p>
    </footer>
  );
};

export default _footer;
