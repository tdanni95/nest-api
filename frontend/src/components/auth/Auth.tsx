import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { username: string; password: string }) => Promise<void>;
  children: React.ReactNode
}

const Auth = ({ submitLabel, onSubmit, children }: AuthProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: {
          xs: "70%",
          md: "30%",
        },
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="text"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={() => onSubmit({ username, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
