import { useState } from 'react';
import { useDispatch } from 'react-redux';
// Local Imports
import {
  useGetDishesQuery,
  useDeleteDishMutation,
  useUpdateDishMutation,
} from '../features/dishesApi';
import Dish from '../components/Dish';
import { resetItems } from '../features/cartSlice';

const RQDishes = () => {
  const { data, error, isError, isLoading } = useGetDishesQuery();
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetItems());
  };

  return (
    <>
      <main className="main">
        {isLoading && <h2>Loading</h2>}
        {isError && <h2>{error.message}</h2>}
        {data?.map((d) => (
          <Dish key={d.id} name={d.name} price={d.price} />
        ))}
      </main>
      <button onClick={handleReset}>Clear Cart</button>
    </>
  );
};

export default RQDishes;
