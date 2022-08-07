import { Grid, Typography } from '@mui/material';

const CalculateTotal = ({ total }) => {
  return (
    <Grid container mt={1} spacing={2} textAlign="center">
      <Grid item sm={6} md={6}>
        <Typography sx={{ fontWeight: 'bold' }}>Tax</Typography>
      </Grid>
      <Grid item sm={6} md={6}>
        <Typography>$0.00</Typography>
      </Grid>
      <Grid item sm={6} md={6}>
        <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
      </Grid>
      <Grid item sm={6} md={6}>
        <Typography>${total}</Typography>
      </Grid>
    </Grid>
  );
};

export default CalculateTotal;
