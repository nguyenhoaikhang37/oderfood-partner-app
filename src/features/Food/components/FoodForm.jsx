import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import { Fragment, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { InputField } from '../../../components/FormFields/index';
import { SelectField } from '../../../components/FormFields/SelectField';
import { selectDetailList } from '../../Detail/detailSlice';

const schema = yup.object().shape({
  name: yup.string().required('Tên món không được để trống'),
  description: yup.string().required('Mô tả không được để trống'),
  menu: yup.string().required('Vui lòng chọn menu'),
  price: yup
    .number()
    .required('Giá món không được để trống')
    .positive('Trường này phải là một số dương')
    .integer('Trường này phải là một số nguyên')
    .typeError('Trường này phải là một số'),
  quantity: yup
    .number()
    .required('Số lượng không được để trống')
    .positive('Trường này phải là một số dương')
    .integer('Trường này phải là một số nguyên')
    .typeError('Trường này phải là một số'),
});

const FoodForm = ({ onAddFoodSubmit, menuOptions }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [image, setImage] = useState(null);
  const [errorLoadImg, setErrorLoadImg] = useState(false);
  const [choose, setChoose] = useState([]);
  const detailList = useSelector(selectDetailList);

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

  const handleCheckboxChange = (event) => {
    const target = event.target;
    var value = target.value;

    if (target.checked) {
      setChoose((prev) => [...prev, value]);
    } else {
      const foundIndex = choose.findIndex((index) => index == value);
      choose.splice(foundIndex, 1);
      setChoose(choose);
    }
  };

  const handleAddFood = (formValues) => {
    if (!image) {
      setErrorLoadImg(true);
      return;
    }

    onAddFoodSubmit?.({ ...formValues, photo: image, choose });
  };

  return (
    <Fragment>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        Thêm món ăn <ion-icon name="fast-food-outline"></ion-icon>
      </div>
      <Box component="form" onSubmit={handleSubmit(handleAddFood)} noValidate sx={{ mt: 1 }}>
        <div className="grid max-w-xl grid-cols-2 gap-2 m-auto">
          <div className="col-span-2 lg:col-span-1">
            <InputField name="name" control={control} label="Tên món ăn" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <SelectField name="menu" control={control} label="Menu" options={menuOptions} />
          </div>
          <div className="col-span-2">
            <InputField name="description" control={control} label="Mô tả món ăn" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <InputField name="price" control={control} label="Giá" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <InputField name="quantity" control={control} label="Số lượng" />
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
          <label className="block text-sm font-medium text-gray-700 mt-5">Đặc điểm món ăn</label>

          <div className="flex flex-wrap gap-2 justify-center col-span-2">
            {detailList.map((detail) => (
              <div key={detail._id} className="form-check form-check-inline">
                <Checkbox
                  className="form-check-input"
                  name="choose"
                  id={detail._id}
                  value={detail._id}
                  onChange={handleCheckboxChange}
                />
                <label className="text-gray-900 text-sm" htmlFor={detail._id}>
                  {detail.name}
                </label>
              </div>
            ))}
          </div>
          {/* <div className="col-span-2 text-right my-2">
            <DialogDetail toppings={toppings} setToppings={setToppings} />
          </div> */}
          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Thêm
            </button>
          </div>
        </div>
      </Box>
    </Fragment>
  );
};

export default memo(FoodForm);
