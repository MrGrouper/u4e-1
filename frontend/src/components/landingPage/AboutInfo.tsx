import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function AboutInfo() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        height:'100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 5, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
        <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            About U4
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
              }}
            >
              Education
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="seconday.main"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Currently funded by Wilson Bright
          </Typography>
          <Typography
            textAlign="center"
            color="seconday.main"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Built by: Nick Usaha
          </Typography>

        </Stack>
      </Container>
    </Box>
  );
}