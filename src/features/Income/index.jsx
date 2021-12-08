import clsx from 'clsx';
import moment from 'moment';
import { useState } from 'react';
import { ExportCSV } from '../../ExportCSV';
import IncomeWithDay from './components/IncomeWithDay';
import IncomeWithMonth from './components/IncomeWithMonth';
import { Bar } from 'react-chartjs-2';
import TopFood from './components/TopFood';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Income = () => {
  const [isTab, setIsTab] = useState('Doanh thu theo ngày');
  const [incomeDay, setIncomeDay] = useState([]);
  const [excelDay, setExcelDay] = useState([]);

  const [incomeMonth, setIncomeMonth] = useState([]);
  const [topFood, setTopFood] = useState([]);

  const data = {
    labels: incomeMonth.sort((a, b) => a._id - b._id)?.map((income) => `Tháng ${income._id}`),
    datasets: [
      {
        label: 'Ẩn doanh thu',
        data: incomeMonth?.map((income) => income.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const fileName =
    isTab === 'Doanh thu theo ngày'
      ? `Doanh thu theo ngày ${moment(incomeDay?.[0]?.updatedAt).format('DD/MM/YYYY')}`
      : `Doanh thu theo tháng ${moment(incomeMonth?.[0]?.createdAt).format('MM')}`;

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
          {topFood.length !== 0 && (
            <li className="mr-1">
              <a
                onClick={() => setIsTab('Top food')}
                className={clsx(
                  'bg-white inline-block  py-2 px-4 cursor-pointer  hover:text-purple-500 focus:outline-none',
                  {
                    'border-l border-t border-r rounded-t font-semibold text-purple-500':
                      isTab == 'Top food',
                  }
                )}
              >
                Các món bán chạy nhất
              </a>
            </li>
          )}
        </ul>
        {isTab !== 'Top food' && (
          <ExportCSV
            csvData={isTab === 'Doanh thu theo ngày' ? excelDay : incomeMonth}
            fileName={fileName}
          />
        )}
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
        ) : isTab === 'Doanh thu theo tháng' ? (
          <>
            <IncomeWithMonth
              incomeMonth={incomeMonth}
              setIncomeMonth={setIncomeMonth}
              setTopFood={setTopFood}
            />
            <Bar className="p-8" data={data} options={options} />
          </>
        ) : (
          <div className="p-6">
            <TopFood topFood={topFood} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Income;
