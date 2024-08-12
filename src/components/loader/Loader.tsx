import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box
      alignItems="center"
      display="flex"
      height="100vh"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
}
