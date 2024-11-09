import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from './Link';

export const Logo = () => (
  <Link
    href="/"
    sx={{
      '&:hover': {
        opacity: 0.8,
      },
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      sx={{ color: 'white' }}
    >
      <Box
        component="img"
        src="/3.svg"
        alt="logo"
        sx={{
          width: {
            xs: '32px',
            md: '42px',
          },
          height: {
            xs: '32px',
            md: '42px',
          },
        }}
      />
      <Typography
        variant="h5"
        noWrap
        sx={{
          ml: 1.5,
          fontWeight: 700,
          fontSize: {
            xs: 16,
            sm: 24,
          },
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Buccaneer V3
      </Typography>
    </Stack>
  </Link>
);
