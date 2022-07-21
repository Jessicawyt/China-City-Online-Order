import { Grid, Stack, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
// Local Imports
import { useGetDishesQuery } from '../features/dishesApi';
import { useGetCategoriesQuery } from '../features/categoriesApi';
import Dish from '../components/Dish';
import OrderSummary from '../components/OrderSummary';
import CategoryTabs from '../components/CategoryTabs';

const Menu = () => {
  // In order to show all dishes and all categories data, 2 seperate api calls are needed
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

  // get side categoryId for customization in Popup
  const sideCategoryId = dataCategory?.find((c) => c.category === 'Side')._id;

  const filterCategories = dataCategory?.filter(
    (c) => c._id !== sideCategoryId
  );
  const filteredDataDishes = dataDishes?.filter(
    (d) => d.category !== sideCategoryId
  );

  const [val, setVal] = useState(0);
  const [categorizedDishes, setCategorizedDishes] = useState(
    filteredDataDishes ? filteredDataDishes : []
  );

  const categorizeDishes = (id) => {
    // filter dataDishes by categoryId
    if (id !== sideCategoryId) {
      const filteredDishes = filteredDataDishes?.filter(
        (d) => d.category === id
      );
      setCategorizedDishes(filteredDishes);
    }
  };

  return (
    <Stack direction="column" sx={{ width: '100%' }}>
      <CategoryTabs
        filterCategories={filterCategories}
        val={val}
        handleOnChange={(e, newVal) => setVal(newVal)}
        setCategorizedDishes={() => setCategorizedDishes(dataDishes)}
        categorizeDishes={categorizeDishes}
      />

      <Stack direction="row" className="Menu-And-Order">
        <Grid
          container
          spacing={1}
          sx={{ paddingLeft: '10px', paddingRight: '10px', width: '69%' }}
        >
          {val !== 0 &&
            categorizedDishes?.map((d) => (
              <Grid item key={d._id} xs={6} sm={6} md={4}>
                <Dish
                  dishId={d._id}
                  name={d.name}
                  price={d.price}
                  image={d.image}
                  description={d.description}
                  isVegan={d.isVegan}
                  ContainsAllergy={d.ContainsAllergy}
                  glutenFree={d.glutenFree}
                  spicyLevel={d.spicyLevel}
                  sideCategoryId={sideCategoryId}
                  comesWithSide={d.comesWithSide}
                />
              </Grid>
            ))}
          {/* Rendering all the dishes when tab All is chosen, including the first rendering */}
          {val === 0 &&
            filteredDataDishes?.map((d) => (
              <Grid item key={d._id} xs={6} sm={6} md={4}>
                <Dish
                  dishId={d._id}
                  name={d.name}
                  price={d.price}
                  image={d.image}
                  description={d.description}
                  isVegan={d.isVegan}
                  ContainsAllergy={d.ContainsAllergy}
                  glutenFree={d.glutenFree}
                  spicyLevel={d.spicyLevel}
                  sideCategoryId={sideCategoryId}
                  comesWithSide={d.comesWithSide}
                />
              </Grid>
            ))}
        </Grid>

        <OrderSummary sideCategoryId={sideCategoryId} />
      </Stack>
    </Stack>
  );
};

export default Menu;
