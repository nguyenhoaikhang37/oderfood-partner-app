import { Button, TextField } from '@mui/material';
import { produce } from 'immer';
import React from 'react';
import { generate } from 'shortid';
import DetailToppings from './DetailToppings';

export default function Toppings({ toppings, setToppings }) {
  return (
    <div>
      <div style={{ textAlign: 'center', display: 'flex', gap: '10px' }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            setToppings((currentToppings) => [
              ...currentToppings,
              {
                idDetail: generate(),
                nameDetail: '',
                choose: true,
                toppings: [{ idTopping: generate(), nameTopping: '', priceTopping: '' }],
              },
            ]);
          }}
        >
          Thêm đặc điểm món (chọn nhiều)
          <ion-icon name="add-outline"></ion-icon>
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            setToppings((currentToppings) => [
              ...currentToppings,
              {
                idDetail: generate(),
                nameDetail: '',
                choose: false,
                toppings: [{ idTopping: generate(), nameTopping: '', priceTopping: '' }],
              },
            ]);
          }}
        >
          Thêm đặc điểm món (chọn một)
          <ion-icon name="add-outline"></ion-icon>
        </Button>
      </div>
      {toppings?.map((topping, index) => {
        return (
          <div
            style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '10px' }}
            key={topping.idDetail}
          >
            <div
              style={{
                margin: '20px 0 10px',
                textAlign: 'center',
                fontSize: '16px',
                color: '#6366F1',
              }}
            >
              {topping.choose
                ? `Đặc điểm chọn nhiều: ${index + 1}`
                : `Đặc điểm chọn một: ${index + 1}`}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                className="w-full "
                size="small"
                onChange={(e) => {
                  const nameDetail = e.target.value;
                  setToppings((currentToppings) =>
                    produce(currentToppings, (v) => {
                      v[index].nameDetail = nameDetail;
                    })
                  );
                }}
                value={topping.nameDetail}
                label="Tên đặc điểm"
              />
              <a
                style={{
                  fontSize: '20px',
                  marginLeft: '10px',
                  color: '#EF4444',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setToppings((currentToppings) =>
                    currentToppings.filter((x) => x.idDetail !== topping.idDetail)
                  );
                }}
              >
                <ion-icon name="trash-outline"></ion-icon>
              </a>
            </div>
            <DetailToppings topping={topping} toppings={toppings} setToppings={setToppings} />
          </div>
        );
      })}
    </div>
  );
}
