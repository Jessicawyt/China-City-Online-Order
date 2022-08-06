import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  TextField,
  Stack,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// Local Imports
import CalculateTotal from '../components/CalculateTotal';

const Checkout = () => {
  const { itemCount, cartItems } = useSelector((state) => state.cart);

  const handleChange = () => {};

  const sumUp = cartItems.reduce((sum, item) => {
    const sidePrice = item.side ? item.side.price * item.qty : 0;
    sum += item.price * item.qty + sidePrice;
    return sum;
  }, 0);

  const renderForm = () => {
    return (
      <Stack direction="column" spacing={2}>
        <TextField
          variant="standard"
          label="First Name"
          name="firstName"
          type="text"
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          label="Last Name"
          name="lastName"
          type="text"
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          label="Phone Number"
          name="phone"
          type="number"
          onChange={handleChange}
        />
      </Stack>
    );
  };

  const renderPaymentMethod = () => {};

  const renderOrderInfo = () => {
    return (
      <TableContainer>
        <Table>
          <TableBody>
            {cartItems.length > 0 &&
              cartItems.map((i) => (
                <TableRow key={i.identifier} sx={{ verticalAlign: 'text-top' }}>
                  <TableCell sx={{ border: 'none' }}>{i.qty}</TableCell>
                  <TableCell sx={{ border: 'none', paddingBottom: 0 }}>
                    <List>
                      <ListItem disablePadding>
                        <ListItemText primary={i.name} />
                      </ListItem>
                      {i.side && (
                        <ListItem disablePadding sx={{ color: '#969696fc' }}>
                          <ListItemText primary={i.side.name} />
                        </ListItem>
                      )}
                    </List>
                  </TableCell>

                  <TableCell sx={{ border: 'none' }}>
                    {i.side
                      ? `$${(
                          (Number(i.price) + Number(i.side.price)) *
                          i.qty
                        ).toFixed(2)}`
                      : `$${(Number(i.price) * i.qty).toFixed(2)}`}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Grid container justifyContent="center" alignItems="center" mt={5} mb={5}>
      {/* customer information */}
      <Grid item>
        <Stack direction="column" spacing={2}>
          <Accordion expanded={true} sx={{ width: '500px' }} disableGutters>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                backgroundColor: '#bc2626bd',
                color: 'white',
              }}
            >
              <Typography>Your Information</Typography>
            </AccordionSummary>
            <AccordionDetails>{renderForm()}</AccordionDetails>
          </Accordion>

          {/* order information */}
          <Accordion sx={{ width: '500px' }} disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ backgroundColor: '#bc2626bd', color: 'white' }}
            >
              <Typography>Payment Method</Typography>
            </AccordionSummary>
            <AccordionDetails>{renderPaymentMethod()}</AccordionDetails>
          </Accordion>
          {/* Order Info */}
          <Accordion sx={{ width: '500px' }} disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ backgroundColor: '#bc2626bd', color: 'white' }}
            >
              <Typography>Your Order ({itemCount})</Typography>
            </AccordionSummary>
            <AccordionDetails>{renderOrderInfo()}</AccordionDetails>
          </Accordion>
          {/* submit button */}
          <Accordion sx={{ width: '500px' }} disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ backgroundColor: '#bc2626bd', color: 'white' }}
            >
              <Typography>Tip</Typography>
            </AccordionSummary>
            <AccordionDetails>{}</AccordionDetails>
          </Accordion>
          {/* CalculateTotal */}
          <CalculateTotal total={sumUp.toFixed(2)} />
          {/* Confirm */}
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: '1.5rem', width: '100%' }}
          >
            Confirm
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Checkout;
