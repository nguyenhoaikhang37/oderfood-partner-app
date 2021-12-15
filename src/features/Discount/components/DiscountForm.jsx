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
  // img
  const [image, setImage] = useState();
  const [errorLoadImg, setErrorLoadImg] = useState(false);

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

  const handleChangeFile = (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    console.log('1', file);

    //Tạo đối tượng để đọc file
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    setErrorLoadImg(false);
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
    if (!image && !discountNeedUpdate) {
      setErrorLoadImg(true);
      return;
    }

    const formatFormValues = {
      ...formValues,
      photo: image ? image : discountNeedUpdate.photo,
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
      {discountNeedUpdate ? 'Sửa' : 'Thêm'} khuyến mãi <ion-icon name="qr-code-outline"></ion-icon>
      </div>
      <Box component="form" onSubmit={handleSubmit(handleDiscountSubmit)} noValidate sx={{ mt: 1 }}>
        <div className="grid max-w-xl grid-cols-2 gap-2 m-auto mb-4">
          <div className="col-span-2">
            <InputField name="nameDiscount" control={control} label="Tên khuyến mãi" />
          </div>
          <div className="col-span-2 mt-4">
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
            {!image && !discountNeedUpdate ? (
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
                src={image ? image : discountNeedUpdate.photo}
              />
            )}
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
                    inputFormat="dd/MM/yyyy"
                    value={valueStart ? valueStart : discountNeedUpdate.discountDetail[0].start}
                    onChange={handleChangeStart}
                    renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                  />
                </div>
                <div className="col-span-2 lg:col-span-1 mt-2">
                  <DesktopDatePicker
                    label="Ngày kết thúc"
                    inputFormat="dd/MM/yyyy"
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
          {discountNeedUpdate ? 'Sửa' : 'Thêm'}
        </button>
      </Box>
    </Fragment>
  );
};

export default memo(DiscountForm);
