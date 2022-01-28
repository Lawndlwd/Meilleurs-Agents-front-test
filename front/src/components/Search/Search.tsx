/* eslint-disable no-unused-vars */
import './Search.css';

import React from 'react';
import { v4 } from 'uuid';

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
  const uid = v4();
  return (
    <>
      <div className="w-full Search ">
        <div className="Search_input ">
          <input
            className=" Search_input-input"
            id={`form-${label}--${uid}`}
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
