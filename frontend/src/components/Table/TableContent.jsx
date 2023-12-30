import React from 'react';
import TableRow from './TableRow';

const TableContent = ({ children }) => {
  return (
    <TableRow>
      <td colSpan={3} className="tb__td--zero">
        <table>
          <tbody>
            <TableRow>
              <td colSpan={3} className="tb__td--zero"></td>
            </TableRow>

            {children}
          </tbody>
        </table>
      </td>
    </TableRow>
  );
};

export default TableContent;
