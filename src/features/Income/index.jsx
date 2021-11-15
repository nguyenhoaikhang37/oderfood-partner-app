import clsx from 'clsx';
import { useState } from 'react';

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
        <li className="mr-1">
          <a
            onClick={() => setIsTab('year')}
            className={clsx(
              'bg-white inline-block  py-2 px-4 cursor-pointer  hover:text-purple-500 focus:outline-none',
              {
                'border-l border-t border-r rounded-t font-semibold text-purple-500':
                  isTab == 'year',
              }
            )}
          >
            Doanh thu theo năm
          </a>
        </li>
      </ul>
      <div
        className="
    container
    w-full
    p-20
    mx-auto
    text-center
    bg-white
    border-2 border-t-0 border-gray-300 border-dashed
    h-96
    rounded-xl rounded-t-none
  "
      >
        <p className="mt-20 italic text-gray-500 text-md">-- Content of your page --</p>
      </div>
    </div>
  );
};

export default Income;
