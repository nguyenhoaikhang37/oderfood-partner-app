import clsx from 'clsx';
import { useState } from 'react';
import IncomeWithDay from './components/IncomeWithDay';
import IncomeWithMonth from './components/IncomeWithMonth';

const Income = () => {
  const [isTab, setIsTab] = useState('day');

  return (
    <div>
      <ul className="list-reset flex border-b">
        <li className="-mb-px mr-1">
          <a
            onClick={() => setIsTab('day')}
            className={clsx(
              'bg-white inline-block  py-2 px-4 cursor-pointer  hover:text-purple-500 focus:outline-none',
              {
                'border-l border-t border-r rounded-t font-semibold text-purple-500':
                  isTab == 'day',
              }
            )}
          >
            Doanh thu theo ngày
          </a>
        </li>
        <li className="mr-1">
          <a
            onClick={() => setIsTab('month')}
            className={clsx(
              'bg-white inline-block  py-2 px-4 cursor-pointer  hover:text-purple-500 focus:outline-none',
              {
                'border-l border-t border-r rounded-t font-semibold text-purple-500':
                  isTab == 'month',
              }
            )}
          >
            Doanh thu theo tháng
          </a>
        </li>
      </ul>
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
        {isTab === 'day' ? <IncomeWithDay /> : <IncomeWithMonth />}
      </div>
    </div>
  );
};

export default Income;
