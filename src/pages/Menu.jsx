import { Grid } from '@mui/material';
// Local Imports
import {
  useGetDishesQuery,
  useDeleteDishMutation,
  useUpdateDishMutation,
} from '../features/dishesApi';
import Dish from '../components/Dish';

const Menu = () => {
  const { data, error, isError, isLoading } = useGetDishesQuery();

  return (
    <>
      <Grid container spacing={4.5}>
        {isLoading && <h2>Loading</h2>}
        {isError && <h2>{error.message}</h2>}
        {data?.map((d) => (
          <Grid item key={d.id} xs={6} sm={4} md={3}>
            <Dish
              name={d.name}
              price={d.price}
              image={d.image}
              description={d.description}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Menu;
