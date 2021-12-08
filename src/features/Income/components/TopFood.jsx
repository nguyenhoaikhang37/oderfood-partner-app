const TopFood = ({ topFood }) => {
  console.log('🚀 ~ file: TopFood.jsx ~ line 2 ~ TopFood ~ topFood', topFood);
  return (
    <table className="divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Tên món ăn
          </th>
          <th
            style={{ width: '180px' }}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Số lượng đã bán
          </th>
        </tr>
      </thead>
      <tbody>
        {topFood
          .sort((a, b) => b.count - a.count)
          .map((food) => (
            <tr key={food._id}>
              <td className="px-6 py-4  max-w-xs">
                <div className="text-sm text-left">{food.nameFood}</div>
              </td>
              <td className="px-6 py-4  max-w-xs">
                <div className="text-sm text-center text-green-500">{food.count}</div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TopFood;
