/* eslint-disable no-unused-vars */
import './Search.css';

import React from 'react';

export const Search = ({
  label,
  placeHolder,
  handleChange,
  searchTerm,
}: {
  label: string;
  placeHolder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}) => {
  return (
    <>
      <div className="w-full Search ">
        <div className="Search_input ">
          <input
            className=" Search_input-input"
            id={`form-${label}`}
            type="search"
            placeholder={placeHolder}
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};
