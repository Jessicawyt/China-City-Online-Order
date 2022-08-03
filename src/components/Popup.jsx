import React from 'react';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  Skeleton,
  Stack,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
  DialogActions,
  Button,
  IconButton,
  Radio,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// Local Imports
import { addItem, updateItem } from '../features/cartSlice';
import { theme } from '../constants';
import { transition } from '../constants';

const Popup = (props) => {
  const {
    openPopup,
    handleClose,
    name,
    price,
    description,
    isVegan,
    ContainsAllergy,
    glutenFree,
    spicyLevel,
    sidesData,
    isEditPopup,
    dishId,
    side,
    quantity,
    comesWithSide,
    dishIdentifier,
  } = props;

  const dispatch = useDispatch();

  // qty is shared by the dish chosen and the side chosen
  const [qty, setQty] = useState(quantity);

  // sides only stores 1 side id
  const [sideId, setSideId] = useState(
    isEditPopup ? (side === 'NoSide' ? ['NoSide'] : [side._id.toString()]) : []
  );

  const handleChange = (e) => {
    // if the side is chosen, remove it from array
    if (sideId.includes(e.target.value)) {
      setSideId([]);
    }
    // if the side is not chosen, add it
    else {
      setSideId([e.target.value]);
    }
  };

  const handleAddItem = () => {
    // if there is side chosen
    if (sideId.length > 0 && sideId[0] !== 'NoSide') {
      handleClose();
      // find the side chosed by its id(local state side)
      let sideObj = sidesData.find(
        (s) => s._id.toString() === sideId[0].toString()
      );
      // add qty property to the obj
      sideObj = { ...sideObj, qty: qty };

      dispatch(
        addItem({
          identifier: dishId.toString() + sideId.toString(),
          id: dishId,
          name,
          price,
          qty,
          description,
          isVegan,
          ContainsAllergy,
          glutenFree,
          spicyLevel,
          comesWithSide,
          side: sideObj,
        })
      );
    }
    // if "NoSide" is chosen
    // OR a sideless dish is chosen
    if (
      (sideId.length > 0 && sideId[0] === 'NoSide') ||
      (sideId.length === 0 && !comesWithSide)
    ) {
      handleClose();
      const identifier = !comesWithSide
        ? dishId.toString() + 'NoSide'
        : dishId.toString() + sideId.toString();
      console.log(qty);
      dispatch(
        addItem({
          identifier,
          id: dishId,
          name,
          price,
          qty,
          description,
          isVegan,
          ContainsAllergy,
          glutenFree,
          spicyLevel,
          comesWithSide,
        })
      );
    }
  };

  const incrementItem = () => {
    setQty((prev) => prev + 1);
  };

  const decrementItem = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const handleUpdateCart = () => {
    handleClose();
    // if there is a side and the side is not the same, and it's 'NoSide', find the new itentifier
    if (
      sideId.length > 0 &&
      sideId[0] === 'NoSide' &&
      dishId.toString() + sideId[0] !== dishIdentifier
    ) {
      dispatch(
        updateItem({
          identifier: dishIdentifier,
          id: dishId,
          name,
          price,
          qty,
        })
      );
    }
    // if there is a side and the side is the same, and it's 'NoSide', update qty
    if (
      sideId.length > 0 &&
      sideId[0] === 'NoSide' &&
      dishId.toString() + sideId[0] === dishIdentifier
    ) {
      console.log('same no side');
      dispatch(
        updateItem({
          identifier: dishIdentifier,
          id: dishId,
          name,
          price,
          qty,
        })
      );
    }
    // if there is a side and the side stays the same, add the side, update the qty
    if (sideId.length > 0 && dishId.toString() + sideId[0] === dishIdentifier) {
      let sideObj = sidesData.find(
        (s) => s._id.toString() === sideId[0].toString()
      );
      sideObj = { ...sideObj, qty };
      dispatch(
        updateItem({
          identifier: dishIdentifier,
          id: dishId,
          name,
          price,
          qty,
          side: sideObj,
        })
      );
    }
    // if there is a side and the side is not the same, pass the old itentifier, add the new side
    if (
      sideId.length > 0 &&
      sideId[0] !== 'NoSide' &&
      dishId.toString() + sideId[0] !== dishIdentifier
    ) {
      let sideObj = sidesData.find(
        (s) => s._id.toString() === sideId[0].toString()
      );
      sideObj = { ...sideObj, qty };
      console.log(sideObj);
      dispatch(
        updateItem({
          identifier: dishIdentifier,
          id: dishId,
          qty,
          name,
          price,
          side: sideObj,
        })
      );
    }
  };

  return (
    <Dialog
      open={openPopup}
      onClose={handleClose}
      TransitionComponent={transition}
      keepMounted
    >
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}

        {comesWithSide && (
          <Stack direction="column">
            <FormControl>
              <Stack direction="row" sx={{ alignItems: 'center' }}>
                <FormLabel
                  sx={{
                    flexGrow: 1,
                    fontWeight: 'bolder',
                    color: 'primary',
                    '&.Mui-focused': { color: theme.palette.secondary.norm },
                  }}
                >
                  Choose Your Side
                </FormLabel>
                <Typography variant="subtitle1" component="span">
                  Required
                </Typography>
              </Stack>

              <FormGroup>
                {sidesData?.map((s) => (
                  <Stack direction="row" key={s._id} alignItems="center">
                    <FormControlLabel
                      sx={{ flexGrow: 1 }}
                      label={s.name}
                      value={s._id.toString()}
                      control={
                        <Radio
                          checked={sideId.includes(s._id.toString())}
                          onChange={handleChange}
                          sx={{
                            '&.Mui-checked': {
                              color: theme.palette.secondary.main,
                            },
                          }}
                        />
                      }
                    />
                    <Typography variant="subtitle1" component="span">
                      {s.isFree ? '-' : '$' + s.price.toFixed(2)}
                    </Typography>
                  </Stack>
                ))}

                <FormControlLabel
                  sx={{ flexGrow: 1 }}
                  label="No side"
                  value="NoSide"
                  control={
                    <Radio
                      checked={sideId.includes('NoSide')}
                      onChange={handleChange}
                      sx={{
                        '&.Mui-checked': {
                          color: theme.palette.secondary.main,
                        },
                      }}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            flexGrow: 1,
          }}
        >
          {qty === 1 ? (
            <IconButton disabled>
              <RemoveCircleIcon sx={{ opacity: '0.9' }} />
            </IconButton>
          ) : (
            <RemoveCircleIcon
              onClick={decrementItem}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            />
          )}

          <Typography variant="h6" component="h6">
            {qty}
          </Typography>

          <AddCircleIcon
            onClick={incrementItem}
            sx={{ '&:hover': { cursor: 'pointer' } }}
          />
        </Box>

        {!isEditPopup && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddItem}
            disabled={sideId.length === 0 && comesWithSide}
          >
            Add To Order
          </Button>
        )}

        {isEditPopup && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpdateCart}
            disabled={sideId.length === 0 && comesWithSide}
          >
            Update Cart
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
