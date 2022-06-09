import { useState } from 'react';
// Local Imports
import {
  useGetDishesQuery,
  useDeleteDishMutation,
  useUpdateDishMutation,
} from '../features/dishesApi';
import Dish from '../components/Dish';

const RQDishes = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');

  const { data, error, isError, isLoading, isFetching, isSuccess } =
    useGetDishesQuery();

  return (
    <main className="main">
      {isLoading && <h2>Loading</h2>}
      {isError && <h2>{error.message}</h2>}
      {data?.map((d) => (
        <Dish key={d.id} name={d.name} price={d.price} />
      ))}
    </main>
  );
};

export default RQDishes;
