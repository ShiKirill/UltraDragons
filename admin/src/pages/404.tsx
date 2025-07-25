import { useRouter } from "next/router";

import { Box, Button, Container, Typography } from "@mui/material";

export default function Custom404() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" component="h1">
          окак
          <Typography variant="caption" color="text.secondary" component="p">
            ты что-то попутал, воли отсюда
          </Typography>
        </Typography>

        <Button
          variant="text"
          color="secondary"
          onClick={() => router.push("/")}
          sx={{ mt: 2, textTransform: "none" }}
        >
          понял, ухожу
        </Button>
      </Box>
    </Container>
  );
}
