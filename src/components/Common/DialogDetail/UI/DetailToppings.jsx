import { Button, TextField } from '@mui/material';
import React from 'react';
import { generate } from 'shortid';

const DetailToppings = ({ topping, toppings, setToppings }) => {
  return (
    <div style={{ textAlign: 'right' }}>
      <Button
        style={{ margin: '10px 0' }}
        variant="outlined"
        size="small"
        onClick={() => {
          setToppings((currentToppings) =>
            currentToppings.map((item) => {
              if (item.idDetail == topping.idDetail) {
                return {
                  ...item,
                  toppings: [
                    ...item.toppings,
                    { idTopping: generate(), nameTopping: '', priceTopping: '' },
                  ],
                };
              } else return item;
            })
          );
        }}
      >
        Thêm chi tiết <ion-icon name="add-outline"></ion-icon>
      </Button>
      {topping.toppings?.map((t, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <TextField
            className="w-full"
            onChange={(e) => {
              const nameTopping = e.target.value;
              setToppings((currentToppings) =>
                currentToppings.map((x) => {
                  return {
                    ...x,
                    toppings: x.toppings?.map((y) =>
                      y.idTopping == t.idTopping ? { ...y, nameTopping } : y
                    ),
                  };
                })
              );
            }}
            size="small"
            value={t.nameTopping}
            label="Tên chi tiết"
          />
          <TextField
            type="number"
            className="w-full"
            onChange={(e) => {
              const priceTopping = e.target.value;
              setToppings((currentToppings) =>
                currentToppings.map((x) => {
                  return {
                    ...x,
                    toppings: x.toppings?.map((y) =>
                      y.idTopping == t.idTopping ? { ...y, priceTopping: +priceTopping } : y
                    ),
                  };
                })
              );
            }}
            size="small"
            value={t.priceTopping}
            label="Giá chi tiết"
          />
        </div>
      ))}
    </div>
  );
};

export default DetailToppings;
