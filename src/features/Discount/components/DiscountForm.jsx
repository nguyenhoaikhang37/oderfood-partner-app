import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Checkbox, CircularProgress, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { Fragment, memo, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField } from '../../../components/FormFields/index';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useSelector } from 'react-redux';
import { selectDiscountFood } from '../discountSlice';

const schema = yup.object().shape({
  nameDiscount: yup.string().required('Tên khuyến mãi không được bỏ trống!'),
  // discount: yup
  //   .number()
  //   .required('Giá món không được để trống')
  //   .min(1, '% khuyến mãi tối thiếu là 1')
  //   .max(100, '% khuyến mãi tối đa là 100')
  //   .positive('Trường này phải là một số dương')
  //   .integer('Trường này phải là một số nguyên')
  //   .typeError('Trường này phải là một số'),
});

const DiscountForm = ({
  error,
  existFood,
  onAddDiscount,
  discountNeedUpdate,
  onUpdateDiscount,
  loadingAdd,
}) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: discountNeedUpdate,
  });
  // useSelector
  const foodDiscounts = useSelector(selectDiscountFood);
  // state
  const [valueStart, setValueStart] = useState(new Date());
  const [valueEnd, setValueEnd] = useState(new Date());
  const [foodChecked, setFoodChecked] = useState([]);
  // Lấy những món ăn chưa nằm trong ds khuyến mãi nào
  const foodNoDiscount = useMemo(() => {
    return foodDiscounts.filter((item) => !existFood.some((idFood) => idFood === item._id));
  }, [foodDiscounts, existFood]);

  const [inputCheckedList, setInputCheckedList] = useState([]);

  const handleChangeStart = (newValue) => {
    setValueStart(newValue);
  };

  const handleChangeEnd = (newValue) => {
    setValueEnd(newValue);
  };

  const handleCheckFood = (id) => {
    setInputCheckedList((prev) => {
      const newPrev = [...prev];
      return newPrev.filter((x) => x.id !== id);
    });

    setFoodChecked((prev) => {
      const isChecked = foodChecked.includes(id);

      if (isChecked) {
        return foodChecked.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleDiscountSubmit = async (formValues) => {
    const formatFormValues = {
      ...formValues,
      start: valueStart,
      end: valueEnd,
      arrayFood: inputCheckedList,
    };

    if (discountNeedUpdate) {
      onUpdateDiscount?.(formatFormValues);
    } else {
      onAddDiscount?.(formatFormValues);
    }
  };

  const handleInputChecked = ({ e, foodId }) => {
    console.log('🚀 ~ file: DiscountForm.jsx ~ line 96 ~ handleInputChecked ~ e', e.target.value);

    setInputCheckedList((prev) => {
      const newInputList = [...prev];
      const findIndex = newInputList.findIndex((x) => x.id === foodId);
      if (findIndex === -1) {
        return [...newInputList, { id: foodId, discount: Number(e.target.value) }];
      } else {
        newInputList[findIndex].discount = Number(e.target.value);
        return newInputList;
      }
    });
  };

  return (
    <Fragment>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        Thêm khuyến mãi <ion-icon name="qr-code-outline"></ion-icon>
      </div>
      <Box component="form" onSubmit={handleSubmit(handleDiscountSubmit)} noValidate sx={{ mt: 1 }}>
        <div className="grid max-w-xl grid-cols-2 gap-2 m-auto mb-4">
          <div className="col-span-2">
            <InputField name="nameDiscount" control={control} label="Tên khuyến mãi" />
          </div>
          {/* <div className="col-span-2 lg:col-span-1">
            <InputField name="discount" control={control} label="% khuyến mãi" />
          </div> */}
          {!discountNeedUpdate && (
            <>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="col-span-2 lg:col-span-1 mt-2">
                  <DesktopDatePicker
                    label="Ngày bắt đầu"
                    inputFormat="MM/dd/yyyy"
                    value={valueStart ? valueStart : discountNeedUpdate.discountDetail[0].start}
                    onChange={handleChangeStart}
                    renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                  />
                </div>
                <div className="col-span-2 lg:col-span-1 mt-2">
                  <DesktopDatePicker
                    label="Ngày kết thúc"
                    inputFormat="MM/dd/yyyy"
                    value={valueEnd ? valueEnd : discountNeedUpdate.discountDetail[0].end}
                    onChange={handleChangeEnd}
                    renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                  />
                </div>
              </LocalizationProvider>

              <div className="col-span-2 mt-2">
                <p className="mb-2">Danh sách món ăn:</p>
                <div className="discount-food-list">
                  {foodNoDiscount?.map((food) => (
                    <div key={food._id} className="discount-food-item">
                      {foodChecked.includes(food._id) && (
                        <input
                          className="border border-black w-10 px-2"
                          onChange={(e) => handleInputChecked({ e, foodId: food._id })}
                        />
                      )}
                      <Checkbox
                        id={food._id}
                        checked={foodChecked.includes(food._id)}
                        onChange={() => handleCheckFood(food._id)}
                      />
                      <div className="flex space-x-2 items-center">
                        <img className="h-8 w-8 rounded-full object-cover" src={food?.photo} />
                        <label className="text-gray-900 text-sm cursor-pointer" htmlFor={food._id}>
                          {food?.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        {error && (
          <Alert variant="standard" severity="error">
            {error}
          </Alert>
        )}
        <button
          disabled={loadingAdd}
          type="submit"
          className="py-2 px-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          {loadingAdd && <CircularProgress size="1rem" color="inherit" />}
          Thêm
        </button>
      </Box>
    </Fragment>
  );
};

export default memo(DiscountForm);
