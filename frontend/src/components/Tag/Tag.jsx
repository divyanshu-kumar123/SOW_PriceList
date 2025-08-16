import React from 'react';
import './Tag.css';

const Tag = ({ value, onClick }) => {
  return (
    <div className="data-tag" onClick={onClick}>
      {value}
    </div>
  );
};

export default Tag;