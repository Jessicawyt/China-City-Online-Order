import { Grid, Stack, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// Local Imports
import { useGetDishesQuery } from '../features/dishesApi';
import { useGetCategoriesQuery } from '../features/categoriesApi';
import Dish from '../components/Dish';

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

  const [val, setVal] = useState(0);
  const [categorizedDishes, setCategorizedDishes] = useState(
    dataDishes ? dataDishes : []
  );

  // get side categoryId for customization in Popup
  const sideCategoryId = dataCategory?.find((c) => c.category === 'Side').id;

  const categorizeDishes = (id) => {
    // filter dataDishes by categoryId
    if (dataDishes) {
      const filteredDishes = dataDishes.filter((d) => d.categoryId === id);
      setCategorizedDishes(filteredDishes);
    }
  };

  const { itemCount, cartItems } = useSelector((state) => state.cart);

  // Calculate the total price
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].price * cartItems[i].qty;
  }
  // round it up to 2 decimal place(just being cautious)
  total = total.toFixed(2);

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

      <Stack direction="row">
        <Grid
          container
          spacing={3}
          sx={{ paddingLeft: '10px', paddingRight: '10px' }}
        >
          {val !== 0 &&
            categorizedDishes?.map((d) => (
              <Grid item key={d.id} xs={6} sm={6} md={4}>
                <Dish
                  name={d.name}
                  price={d.price}
                  image={d.image}
                  description={d.description}
                  isVegan={d.isVegan}
                  ContainsAllergy={d.ContainsAllergy}
                  glutenFree={d.glutenFree}
                  spicyLevel={d.spicyLevel}
                  sideCategoryId={sideCategoryId}
                />
              </Grid>
            ))}
          {/* Rendering all the dishes when tab All is chosen, including the first rendering */}
          {val === 0 &&
            dataDishes?.map((d) => (
              <Grid item key={d.id} xs={6} sm={4} md={4}>
                <Dish
                  name={d.name}
                  price={d.price}
                  image={d.image}
                  description={d.description}
                  isVegan={d.isVegan}
                  ContainsAllergy={d.ContainsAllergy}
                  glutenFree={d.glutenFree}
                  spicyLevel={d.spicyLevel}
                  sideCategoryId={sideCategoryId}
                />
              </Grid>
            ))}
        </Grid>

        <div className="cart-page">
          <section className="cart-header">
            <h3>My Cart</h3>
          </section>
          <div className="cart-main">
            <section className="cart-list">
              {cartItems.length > 0 &&
                cartItems.map((i) => (
                  <div className="cart-list-item" key={i.name}>
                    {<span>{i.name}</span>}
                    {<span>x</span>}
                    {<span>{i.qty}</span>}
                  </div>
                ))}
            </section>
            <section className="cart-bottom">
              <p className="cart-item-count">{itemCount} Items</p>
              <div className="cart-total">
                <p>Total</p>
                <p>{total}</p>
              </div>
            </section>
          </div>
        </div>
      </Stack>
    </Stack>
  );
};

export default Menu;
