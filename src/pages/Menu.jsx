import { Grid, Stack, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
// Local Imports
import { useGetDishesQuery } from '../features/dishesApi';
import { useGetCategoriesQuery } from '../features/categoriesApi';
import Dish from '../components/Dish';

const Menu = () => {
  const {
    data: dataCategory,
    error: errorCategory,
    isError: isErrorCategory,
    isLoading: isLoadingCategory,
  } = useGetCategoriesQuery();
  const {
    data: dataDishes,
    error: errorDishes,
    isError: isErrorDishes,
    isLoading: isLoadingDishes,
  } = useGetDishesQuery();

  const [val, setVal] = useState(0);
  const [categorizedDishes, setCategorizedDishes] = useState(
    dataDishes ? dataDishes : []
  );

  const categorizeDishes = (id) => {
    // filter dataDishes by categoryId
    if (dataDishes) {
      const filteredDishes = dataDishes.filter((d) => d.categoryId === id);
      setCategorizedDishes(filteredDishes);
    }
  };

  console.log(dataDishes);

  return (
    <Stack direction="column">
      <Tabs
        position="sticky"
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        value={val}
        onChange={(e, newVal) => setVal(newVal)}
      >
        <Tab
          label="All"
          sx={{ fontSize: '10px' }}
          onClick={() => setCategorizedDishes(dataDishes)}
        />
        {dataCategory?.map((d) => (
          <Tab
            key={d.id}
            label={d.category}
            sx={{ fontSize: '10px' }}
            onClick={() => categorizeDishes(d.id)}
          />
        ))}
      </Tabs>

      <Grid
        container
        spacing={3}
        sx={{ paddingLeft: '10px', paddingRight: '10px' }}
      >
        {categorizedDishes.length > 0
          ? categorizedDishes.map((d) => (
              <Grid item key={d.id} xs={6} sm={4} md={3}>
                <Dish
                  name={d.name}
                  price={d.price}
                  image={d.image}
                  description={d.description}
                  isVegan={d.isVegan}
                  ContainsAllergy={d.ContainsAllergy}
                  glutenFree={d.glutenFree}
                  spicyLevel={d.spicyLevel}
                />
              </Grid>
            ))
          : dataDishes?.map((d) => (
              <Grid item key={d.id} xs={6} sm={4} md={3}>
                <Dish
                  name={d.name}
                  price={d.price}
                  image={d.image}
                  description={d.description}
                  isVegan={d.isVegan}
                  ContainsAllergy={d.ContainsAllergy}
                  glutenFree={d.glutenFree}
                  spicyLevel={d.spicyLevel}
                />
              </Grid>
            ))}
      </Grid>
    </Stack>
  );
};

export default Menu;
