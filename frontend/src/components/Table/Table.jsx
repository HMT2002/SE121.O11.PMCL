import React from 'react';

const Table = ({ children }) => {
  return (
    <table className="tb__container">
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
