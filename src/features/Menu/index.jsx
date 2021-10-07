import { LinearProgress } from '@mui/material';
import menuApi from '../../apis/menuApi';
import Dialog from '../../components/Common/Dialog';
import { selectLoginUser } from '../../features/Login/loginSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MenuForm from './components/MenuForm';
import MenuTable from './components/MenuTable';
import { fetchMenuList, selectMenuList, selectMenuLoading } from './menuSlice';
import Swal from 'sweetalert2';

const Menu = () => {
  const dispatch = useDispatch();
  const menuList = useSelector(selectMenuList);
  const loading = useSelector(selectMenuLoading);
  const user = useSelector(selectLoginUser);
  //Dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setMenuById(null);
  };
  //menu state
  const [menuById, setMenuById] = useState();

  React.useEffect(() => {
    dispatch(fetchMenuList());
  }, []);

  const handleAddMenuSubmit = async (formValues) => {
    try {
      await menuApi.addMenu(formValues);
      toast.success('Thêm menu thành công');
      dispatch(fetchMenuList());
      setOpen(false);
    } catch (error) {
      console.log('Failed to add menu', error);
    }
  };

  const handleRemoveMenu = async (menuId) => {
    try {
      Swal.fire({
        title: 'Bạn muốn xoá menu này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#F87171',
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Có, tôi chắc chắn!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await menuApi.deleteMenu(menuId);
          if (!data.success) {
            Swal.fire({
              icon: 'error',
              title: `${data.message}`,
            });
            return;
          }

          Swal.fire('Deleted!', 'Bạn đã xoá menu thành công.', 'success');
          dispatch(fetchMenuList());
        }
      });
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 41 ~ handleRemoveMenu ~ error', error);
    }
  };

  const handleGetMenuById = async (menu) => {
    setOpen(true);
    setMenuById(menu);
  };

  const handleUpdateMenu = async (formValues) => {
    try {
      await menuApi.updateMenu(formValues);
      toast.success('Sửa menu thành công');
      dispatch(fetchMenuList());
      setOpen(false);
    } catch (error) {
      console.log('Failed to add menu', error);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <div>
      <button
        onClick={handleOpen}
        type="button"
        className="py-2 px-4 flex justify-center items-center  bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-4"
      >
        <ion-icon name="add-circle-outline"></ion-icon>
        &nbsp; Thêm menu
      </button>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-min sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <MenuTable
                onGetMenuById={handleGetMenuById}
                onRemoveMenu={handleRemoveMenu}
                menuList={menuList}
                user={user}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <MenuForm
          menuById={menuById}
          onUpdateMenu={handleUpdateMenu}
          onAddMenuSubmit={handleAddMenuSubmit}
        />
      </Dialog>
    </div>
  );
};

export default Menu;
