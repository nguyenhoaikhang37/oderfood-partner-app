import React from 'react';

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

export const ExportCSV = ({ csvData, fileName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const fileExtension = '.xlsx';

  const exportToCSV = (csvData, fileName) => {
    if (csvData.length === 0) {
      toast.info('Bạn vui lòng chọn doanh thu trước khi xuất file excel');
      return;
    }

    let ws = XLSX.utils.json_to_sheet(csvData);

    ws['!cols'] = [
      { width: 20 },
      { width: 20 },
      { width: 30 },
      { width: 100 },
      { width: 100 },
      { width: 20 },
    ];

    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="flex items-center space-x-2 hover:text-indigo-500"
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      <ion-icon name="print-outline"></ion-icon> Xuất file excel
    </button>
  );
};
