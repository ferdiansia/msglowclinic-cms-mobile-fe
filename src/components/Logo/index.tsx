import { Box } from '@mui/material';

function Logo() {
  return (
    <Box
      component="img"
      sx={{
        width: 250
      }}
      alt="Msclinic Logo"
      src="/static/images/logo/msclinic-logo.png"
    />
  );
}

export default Logo;
