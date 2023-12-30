import React from 'react';
import TableRow from './TableRow';

const TableCell = ({ label, value, isBold }) => {
  return (
    <TableRow>
      <td width={'10%'} className="tb__td--cell-label">
        {label}
      </td>
      <td colSpan={2} className={`tb__td--cell-value ${isBold ? 'tb__td--cell-value--bold' : ''}`}>
        {value}
      </td>
    </TableRow>
  );
};

export default TableCell;
