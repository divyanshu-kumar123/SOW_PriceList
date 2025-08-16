import React from 'react';
import './Tag.css';

const Tag = ({ value }) => {
  return (
    <span className="data-tag">
      {value}
    </span>
  );
};

export default Tag;