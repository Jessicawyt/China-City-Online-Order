import { Tabs, Tab } from '@mui/material';
import { useState } from 'react';

const CategoryTabs = ({
  val,
  filterCategories,
  handleOnChange,
  setCategorizedDishes,
  categorizeDishes,
}) => {
  return (
    <div className="Category-Tabs">
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        value={val}
        onChange={handleOnChange}
      >
        <Tab
          label="All"
          sx={{ fontSize: '15px' }}
          onClick={setCategorizedDishes}
        />
        {filterCategories?.map((d) => (
          <Tab
            key={d.id}
            label={d.category}
            sx={{ fontSize: '15px' }}
            onClick={() => categorizeDishes(d.id)}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
