import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  Skeleton,
  Stack,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// Local Imports
import { addItem, updateItem } from '../features/cartSlice';

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
    isAddOn,
    dishIdentifier,
  } = props;

  const dispatch = useDispatch();

  // qty is shared by the dish chosen and the side chosen
  const [qty, setQty] = useState(quantity);

  // sides only stores 1 side id
  const [sideId, setSideId] = useState(
    isEditPopup ? (side === 'NoSide' ? ['NoSide'] : [side.id.toString()]) : []
  );

  const handleChange = (e) => {
    //if the side is chosen, remove it from array
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
        (s) => s.id.toString() === sideId[0].toString()
      );
      // add qty property to the obj
      sideObj = { ...sideObj, qty: qty };

      console.log(dishId.toString() + sideId.toString());
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
          side: sideObj,
        })
      );
    }
    // if "NoSide" is chosen
    if (sideId.length > 0 && sideId[0] === 'NoSide') {
      handleClose();
      console.log(dishId.toString() + sideId.toString());
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
        (s) => s.id.toString() === sideId[0].toString()
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
        (s) => s.id.toString() === sideId[0].toString()
      );
      sideObj = { ...sideObj, qty };
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

  // 3 => 3.00
  const formatNumber = (n) => {
    n = n.toString();
    if (n.includes('.') && !n.endsWith('0')) {
      n += '0';
    } else {
      n += '.00';
    }
    return n;
  };

  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}

        {!isAddOn && (
          <Stack direction="column">
            <FormControl>
              <Stack direction="row" sx={{ alignItems: 'center' }}>
                <FormLabel
                  sx={{ flexGrow: 1, fontWeight: 'bolder', color: 'black' }}
                >
                  Choose Your Side
                </FormLabel>
                <Typography variant="subtitle1" component="span">
                  Required
                </Typography>
              </Stack>

              <FormGroup>
                {sidesData?.map((s) => (
                  <Stack direction="row" key={s.id}>
                    <FormControlLabel
                      sx={{ flexGrow: 1 }}
                      label={s.name}
                      value={s.id.toString()}
                      control={
                        <Checkbox
                          checked={sideId.includes(s.id.toString())}
                          onChange={handleChange}
                          disabled={
                            sideId.length === 1 &&
                            !sideId.includes(s.id.toString())
                          }
                        />
                      }
                    />
                    <Typography variant="subtitle1" component="span">
                      {s.isFree ? '-' : '$' + formatNumber(s.price)}
                    </Typography>
                  </Stack>
                ))}

                <FormControlLabel
                  sx={{ flexGrow: 1 }}
                  label="No side"
                  value="NoSide"
                  control={
                    <Checkbox
                      checked={sideId.includes('NoSide')}
                      onChange={handleChange}
                      disabled={
                        sideId.length === 1 && !sideId.includes('NoSide')
                      }
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
          <Button variant="contained" color="secondary" onClick={handleAddItem}>
            Add To Order
          </Button>
        )}

        {isEditPopup && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpdateCart}
          >
            Update Cart
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
