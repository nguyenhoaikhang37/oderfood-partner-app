import clsx from 'clsx';
import moment from 'moment';
import { useState } from 'react';
import { ExportCSV } from '../../ExportCSV';
import IncomeWithDay from './components/IncomeWithDay';
import IncomeWithMonth from './components/IncomeWithMonth';

const Income = () => {
  const [isTab, setIsTab] = useState('Doanh thu theo ngày');
  const [incomeDay, setIncomeDay] = useState([]);
  const [excelDay, setExcelDay] = useState([]);

  const [incomeMonth, setIncomeMonth] = useState([]);
  console.log("🚀 ~ file: index.jsx ~ line 14 ~ Income ~ incomeMonth", incomeMonth)

  const fileName = isTab === 'Doanh thu theo ngày' ? `Doanh thu theo ngày ${moment(incomeDay?.[0]?.updatedAt).format("DD/MM/YYYY")}` : `Doanh thu theo tháng ${moment(incomeMonth?.[0]?.createdAt).format("MM")}`;


  return (
    <div>
      <div className="flex justify-between">
        <ul className="list-reset flex border-b">
          <li className="-mb-px mr-1">
            <a
              onClick={() => setIsTab('Doanh thu theo ngày')}
              className={clsx(
                'bg-white inline-block  py-2 px-4 cursor-pointer  hover:text-purple-500 focus:outline-none',
                {
                  'border-l border-t border-r rounded-t font-semibold text-purple-500':
                    isTab == 'Doanh thu theo ngày',
                }
              )}
            >
              Doanh thu theo ngày
            </a>
          </li>
          <li className="mr-1">
            <a
              onClick={() => setIsTab('Doanh thu theo tháng')}
              className={clsx(
                'bg-white inline-block  py-2 px-4 cursor-pointer  hover:text-purple-500 focus:outline-none',
                {
                  'border-l border-t border-r rounded-t font-semibold text-purple-500':
                    isTab == 'Doanh thu theo tháng',
                }
              )}
            >
              Doanh thu theo tháng
            </a>
          </li>
        </ul>
        <ExportCSV
          csvData={isTab === 'Doanh thu theo ngày' ? excelDay : incomeMonth}
          fileName={fileName}
        />
      </div>
      <div
        className="
    container
    w-full
    mx-auto
    bg-white
    border-2 border-t-0 border-gray-300 border-dashed
    rounded-xl rounded-t-none
  "
      >
        {isTab === 'Doanh thu theo ngày' ? (
          <IncomeWithDay
            incomeDay={incomeDay}
            setIncomeDay={setIncomeDay}
            setExcelDay={setExcelDay}
          />
        ) : (
          <IncomeWithMonth incomeMonth={incomeMonth} setIncomeMonth={setIncomeMonth} />
        )}
      </div>
    </div>
  );
};

export default Income;
