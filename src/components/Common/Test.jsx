import { produce } from 'immer';
import React from 'react';

const Test = ({ setPeople, people }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {people.map((p, index) => {
        return (
          <div key={p.id}>
            <input
              onChange={(e) => {
                const nameToppingDetails = e.target.value;
                setPeople((currentPeople) =>
                  produce(currentPeople, (v) => {
                    v[index].nameToppingDetails = nameToppingDetails;
                  })
                );
              }}
              value={p.nameToppingDetails}
              placeholder="Tên topping"
            />
            <input
              onChange={(e) => {
                const priceToppingDetails = e.target.value;
                setPeople((currentPeople) =>
                  produce(currentPeople, (v) => {
                    v[index].priceToppingDetails = priceToppingDetails;
                  })
                );
              }}
              value={p.priceToppingDetails}
              placeholder="Giá topping"
            />
            <button
              onClick={() => {
                setPeople((currentPeople) => currentPeople.filter((x) => x.id !== p.id));
              }}
            >
              x
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Test;
