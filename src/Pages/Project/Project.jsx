import React from "react";
import { useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();

  const { customerEmail, categoryId, category } = location.state;
  return (
    <div>
      <p> {customerEmail}</p>
      <p>{categoryId}</p>
      <br />
      <p>{category?.categoryData?.title}</p>
    </div>
  );
};

export default Project;
