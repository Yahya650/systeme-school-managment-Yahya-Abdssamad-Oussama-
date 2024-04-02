import React from "react";
import "../../../public/assets/css/guestStyle.css";
import { Link } from "react-router-dom";

const IndexGuest = () => {
  return (
    <div className="containerDiv flex-wrap">
      {/* super admin */}
      <Link to={"/super-admin/login"} className="custmCard">
        <div className="profileImage">
          <center>
            <img
              height="180px"
              src="https://img.icons8.com/plasticine/100/manager.png"
              alt="manager"
            />
          </center>
        </div>
        <div className="textContainer">
          <div className="name">Directeur</div>
          <div className="profile"></div>
        </div>
      </Link>
      {/*  admin */}
      <Link to={"/admin/login"} className="custmCard">
        <div className="profileImage">
          <center>
            <img
              height="160px"
              src="https://img.icons8.com/stickers/100/administrator-male.png"
              alt="administrator-male"
            />
          </center>
        </div>
        <div className="textContainer">
          <div className="name">Membre de la direction</div>
          <div className="profile"></div>
        </div>
      </Link>
      {/* teacher */}
      <Link to={"/teacher/login"} className="custmCard">
        <div className="profileImage">
          <center>
            <img
              height="160px"
              src="https://img.icons8.com/stickers/100/training.png"
              alt="training"
            />
          </center>
        </div>
        <div className="textContainer">
          <div className="name">Professor</div>
          <div className="profile"></div>
        </div>
      </Link>
      {/* students  */}
      <Link to={"/student/login"} className="custmCard">
        <div className="profileImage">
          <center>
            <img
              height="180px"
              src="https://img.icons8.com/plasticine/100/student-male.png"
              alt="student-male"
            />
          </center>
        </div>
        <div className="textContainer">
          <div className="name">Etudiant</div>
          <div className="profile"></div>
        </div>
      </Link>
      {/* parents */}
      <Link to={"/student-parent/login"} className="custmCard">
        <div className="profileImage">
          <center>
            <img
              height="160px"
              src="https://img.icons8.com/stickers/100/children.png"
              alt="children"
            />
          </center>
        </div>
        <div className="textContainer">
          <div className="name">Parent</div>
          <div className="profile"></div>
        </div>
      </Link>
    </div>
  );
};

export default IndexGuest;
