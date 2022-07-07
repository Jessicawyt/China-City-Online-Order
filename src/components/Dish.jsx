import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { GiChiliPepper } from 'react-icons/gi';
// How to import FontAwesomeIcon:
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSave } from '@fortawesome/free-regular-svg-icons';

// Local Imports
import { addItem, removeItem } from '../features/cartSlice';
import Popup from './Popup';
import { useGetDishesByCategoryQuery } from '../features/dishesApi';

const Dish = (props) => {
  const {
    name,
    price,
    image,
    description,
    isVegan,
    ContainsAllergy,
    glutenFree,
    spicyLevel,
    sideCategoryId,
    dishId,
  } = props;

  const [qty, setQty] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const { data } = useGetDishesByCategoryQuery(sideCategoryId);

  // useEffect(() => {
  //   // if user resets the cart, qty should be set to zero
  //   if (cartItems.length === 0) {
  //     setQty(0);
  //   }
  //   // If there are already dishes in the cart, qty should start with it's qty saved in the store
  //   for (var i = 0; i < cartItems.length; i++) {
  //     if (name === cartItems[i].name) {
  //       setQty(cartItems[i].qty);
  //     }
  //   }
  //   return () => {};
  // }, [cartItems, name]);

  // const handleAddItem = () => {
  //   setQty((prev) => prev + 1);
  //   dispatch(addItem({ name, price, qty: 1 }));
  // };

  // const handleRemoveItem = () => {
  //   if (qty >= 1) {
  //     setQty((prev) => prev - 1);
  //     dispatch(removeItem({ name, price, qty: 1 }));
  //   }
  // };

  const renderPeppers = () => {
    let peppers = [];
    for (let index = 0; index < spicyLevel; index++) {
      peppers.push(<GiChiliPepper key={index} color="#d50000" />);
    }
    return peppers;
  };

  // jsx is essentially just js object
  // storing them would be easy for future icon add-ons
  const allergyJsx = <img src="/allergy.png" className="allergy" />;
  const gfJsx = <img src="/glutenfree.png" className="gf" />;
  // draw connection between boolean variables with their corresponding jsx
  const iconsArr = [
    [ContainsAllergy, allergyJsx],
    [glutenFree, gfJsx],
  ];
  // reduce iconsArr to an array of jsx that needs rendering
  const filnalIcons = iconsArr.reduce((result, current) => {
    if (current[0]) {
      result.push(current[1]);
    }
    return result;
  }, []);

  const renderIcon = (iconIndex, jsx) => {
    return (
      <div
        key={iconIndex}
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          // if it is the first icon, iconindex would be 0
          // if it is the second icon, iconindex would be 1
          // ...
          top: iconIndex * 32 + 6,
          left: 5,
          borderRadius: '50% 50% 50% 50% / 50% 50% 50% 51% ',
          padding: '4px',
        }}
      >
        <Stack direction="column">{jsx}</Stack>
      </div>
    );
  };

  const renderIcons = () => {
    // If there is only one icon needs to be rendered
    if (filnalIcons.length === 1) {
      return renderIcon(0, filnalIcons[0]);
    }
    // If more than one icon needs to be rendered
    // we need to keep each icon jsx inside one parent element and keep track of the current index of icon
    if (filnalIcons.length > 1) {
      return (
        <>
          {filnalIcons?.map((jsx, index) => {
            return renderIcon(index, jsx);
          })}
        </>
      );
    }
  };

  // Better readability, but needs rewrite if there is need of add-ons in the future:

  // const renderIcons = () => {
  // if (ContainsAllergy && !glutenFree) {
  //   return renderIcon(0, allergyJsx);
  // }
  // if (glutenFree && !ContainsAllergy) {
  //   return renderIcon(0, gfJsx);
  // }
  // if (ContainsAllergy && glutenFree) {
  //   return (
  //     <>
  //       {renderIcon(0, allergyJsx)}
  //       {renderIcon(1, gfJsx)}
  //     </>
  //   );
  // }

  return (
    <>
      <Card sx={{ marginTop: '8px', paddingTop: '0px' }}>
        {/* set text overlay on top of  CardMedia component */}
        <div style={{ position: 'relative' }}>
          <CardMedia
            component="img"
            width="120"
            height="150"
            image={image}
            alt={name}
            sx={{ '&:hover': { cursor: 'pointer' } }}
            onClick={() => setPopupOpen(true)}
          />
          {renderIcons()}
        </div>

        <Box>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // whiteSpace: 'nowrap',
              gap: '.4rem',
            }}
          >
            <Typography
              variant="subtitle2"
              component="span"
              noWrap={true}
              sx={{
                letterSpacing: '-0.5px',
                fontWeight: 'bolder',
              }}
            >
              {name}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Typography variant="subtitle1" component="span">
                {price}
              </Typography>
              <Stack direction="row">{renderPeppers()}</Stack>
            </Stack>
          </CardContent>
        </Box>
      </Card>

      {/* QUESTION: Is it considered Prop Drilling here if the properties are passed down again??? Is it better to fetch single dish data in Popup level?*/}
      {popupOpen && (
        <Popup
          openPopup={popupOpen}
          handleClose={() => setPopupOpen(false)}
          name={name}
          price={price}
          description={description}
          isVegan={isVegan}
          ContainsAllergy={ContainsAllergy}
          glutenFree={glutenFree}
          spicyLevel={spicyLevel}
          sidesData={data}
          isEditPopup={!popupOpen}
          dishId={dishId}
          quantity={1}
        />
      )}
    </>
  );
};

export default Dish;
