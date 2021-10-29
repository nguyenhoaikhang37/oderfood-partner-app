import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import { InputField } from '../../../components/FormFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert, Checkbox } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectDiscountFood } from '../../Discount/discountSlice';

const schema = yup.object().shape({
  nameCombo: yup.string().required('Tên combo không được bỏ trống!'),
  discountCombo: yup
    .number()
    .required('Trường này không được để trống')
    .min(1, '% khuyến mãi tối thiếu là 1')
    .max(100, '% khuyến mãi tối đa là 100')
    .positive('Trường này phải là một số dương')
    .integer('Trường này phải là một số nguyên')
    .typeError('Trường này phải là một số'),
});

const ComboForm = (props) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  // img
  const [image, setImage] = useState(null);
  const [errorLoadImg, setErrorLoadImg] = useState(false);
  // useSelector
  const foodDiscounts = useSelector(selectDiscountFood);
  // state
  const [foodChecked, setFoodChecked] = useState([]);
  console.log(foodChecked);
  // function
  const handleChangeFile = (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];

    //Tạo đối tượng để đọc file
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    setErrorLoadImg(false);
  };

  const handleCheckFood = (id) => {
    setFoodChecked((prev) => {
      const isChecked = foodChecked.some((item) => item.id === id);
      if (isChecked) {
        return foodChecked.filter((item) => item.id !== id);
      }
      return [...prev, { id, sl: 1 }];
    });
  };

  const handleInsertSl = (id) => {
    setFoodChecked((prev) => {
      return prev.map((item) => (item.id === id ? { ...item, sl: item.sl + 1 } : item));
    });
  };

  const handleMinusSl = (id) => {
    setFoodChecked((prev) => {
      const isNegative = foodChecked.some((item) => item.sl === 1);
      if (isNegative) {
        return foodChecked.filter((item) => item.sl > 1);
      }
      return prev.map((item) => (item.id === id ? { ...item, sl: item.sl - 1 } : item));
    });
  };

  const handleComboSubmit = (formValues) => {
    console.log(formValues, foodChecked);
  };

  return (
    <Fragment>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        Thêm combo món ăn<ion-icon name="basket-outline"></ion-icon>
      </div>
      <Box component="form" onSubmit={handleSubmit(handleComboSubmit)} noValidate sx={{ mt: 1 }}>
        <div className="grid max-w-xl grid-cols-2 gap-2 m-auto">
          <div className="col-span-2 lg:col-span-1">
            <InputField name="nameCombo" control={control} label="Tên combo món ăn" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <InputField name="discountCombo" control={control} label="% khuyến mãi" />
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex gap-2">
            <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span className="underline">Upload a file</span>
                <input
                  id="file-upload"
                  name="a"
                  type="file"
                  className="sr-only"
                  name="photo"
                  onChange={handleChangeFile}
                  accept="image/png, image/jpeg, image/gif"
                />
              </label>
            </div>
          </div>
          {errorLoadImg && (
            <Alert variant="standard" severity="error">
              Hình ảnh không được để trống
            </Alert>
          )}
          {!image ? (
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          ) : (
            <img
              style={{ width: '100%', height: '150px', marginTop: '15px' }}
              className="object-cover"
              src={image}
            />
          )}
        </div>
        <div className="col-span-2 mt-2">
          <p className="mb-2">Danh sách món ăn:</p>
          <div className="discount-food-list">
            {foodDiscounts?.map((food) => (
              <>
                <div key={food._id} className="discount-food-item">
                  {foodChecked.some((item) => item.id === food._id) && (
                    <div className="flex items-center icon-box">
                      {foodChecked.map((item) => {
                        if (item.id === food._id)
                          return (
                            <div className="flex items-center" key={item.id}>
                              <ion-icon
                                onClick={() => handleMinusSl(item.id)}
                                name="remove-outline"
                              ></ion-icon>
                              <span className="mx-2">{item.sl}</span>
                              <ion-icon
                                onClick={() => handleInsertSl(item.id)}
                                name="add-outline"
                              ></ion-icon>
                            </div>
                          );
                      })}
                    </div>
                  )}
                  <Checkbox
                    id={food._id}
                    checked={foodChecked.some((item) => item.id === food._id)}
                    onChange={() => handleCheckFood(food._id)}
                  />
                  <div className="flex space-x-2 items-center justify-between">
                    <img className="h-8 w-8 rounded-full object-cover" src={food?.photo} />
                    <label className="text-gray-900 text-sm cursor-pointer" htmlFor={food._id}>
                      {food?.name}
                    </label>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="py-2 px-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Thêm
        </button>
      </Box>
    </Fragment>
  );
};

ComboForm.propTypes = {};

export default ComboForm;