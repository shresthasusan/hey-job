import React from "react";
import Filter from "../filter";

const ExpertiseFilter = () => {
  return (
    <div>
      <p>Expertise Level </p>
      <ul>
        <li>
          <Filter Experience="Entry" />
        </li>
        <li>
          <Filter Experience="Intermediate" />
        </li>
        <li>
          <Filter Experience="Expert" />
        </li>
      </ul>
    </div>
  );
};

export default ExpertiseFilter;
