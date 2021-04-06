import React, { useState } from "react";

import "./Dropdown.css";
import { Link } from "react-router-dom";

const MenuItems = [
  {
    title: "My Courses",
    path: "/mycourses",
    cName: "dropdown-link",
  },
  {
    title: "My Paths",
    path: "/mypaths",
    cName: "dropdown-link",
  },
  {
    title: "Settings",
    path: "/profilesettings",
    cName: "dropdown-link",
  },
  {
    title: "Logout",
    path: "/",
    cName: "dropdown-link",
  },
];

function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                <p className='dropdown-li-items'>{item.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
