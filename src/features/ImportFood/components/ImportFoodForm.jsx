import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import { InputField } from '../../../components/FormFields/InputField';
import { Checkbox } from '@mui/material';
import { useState } from 'react';

const schema = yup.object().shape({
  quantity: yup
    .number()
    .required('Trường này không được để trống')
    .min(1, '% khuyến mãi tối thiếu là 1')
    .positive('Trường này phải là một số dương')
    .integer('Trường này phải là một số nguyên')
    .typeError('Trường này phải là một số'),
});

const ImportFoodForm = ({ foodList, onAddImportFood }) => {
  const [checkedFood, setCheckedFood] = useState([]);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImportSubmit = ({ quantity }) => {
    onAddImportFood({ quantity, checkedFood });
  };

  const handleCheckedFood = (id) => {
    const isChecked = checkedFood.includes(id);
    if (!isChecked) {
      setCheckedFood([...checkedFood, id]);
    } else {
      setCheckedFood(checkedFood.filter((x) => x !== id));
    }
  };

  return (
    <div>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        Thêm số lượng món<ion-icon name="basket-outline"></ion-icon>
      </div>
      <Box component="form" onSubmit={handleSubmit(handleImportSubmit)} noValidate sx={{ mt: 1 }}>
        <div className="grid max-w-xl grid-cols-2 gap-2 m-auto">
          <div className="col-span-2">
            <InputField name="quantity" control={control} label="Số lượng món ăn" />
          </div>
          <div className="col-span-2 mt-2">
            <p className="mb-2">Danh sách món ăn:</p>
            <div className="discount-food-list">
              {foodList?.map((food) => (
                <div key={food?._id} className="discount-food-item">
                  <Checkbox
                    checked={checkedFood.includes(food?._id)}
                    onChange={() => handleCheckedFood(food?._id)}
                  />
                  <div className="flex space-x-2 items-center">
                    <img className="h-8 w-8 rounded-full object-cover" src={food?.photo} />
                    <label className="text-gray-900 text-sm cursor-pointer">{food?.name}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="py-2 px-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Thêm
        </button>
      </Box>
    </div>
  );
};

export default ImportFoodForm;
