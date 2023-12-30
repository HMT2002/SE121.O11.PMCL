import React from 'react';
import TableRow from './TableRow';

const TableTitle = ({ title }) => {
  return (
    <TableRow>
      <td width={10} className="tb__td--title-left"></td>
      <td width={500} align="center" className="tb__td--title-center">
        {title}
      </td>
      <td width={10} className="tb__td--title-right"></td>
    </TableRow>
  );
};

export default TableTitle;
