"use client";
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { Stack } from "@mui/system";
import axios from "axios";
import { api, AuthResponse } from "@/utils/api";

interface registerType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const router = useRouter();
  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // passwordCheck를 제외한 나머지 데이터만 추출
    const { passwordCheck, ...submitData } = formData;

    try {
      const response = await api
        .post<AuthResponse>("/auth/signup", submitData)
        .then((res) => 
          
          // console.log(res.data, "dasdsadsa")
          router.push("/authentication/login")
        )
        .catch((error) => console.log(error));
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box component="form" onSubmit={handleSubmit}>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Name
          </Typography>
          <CustomTextField
            id="name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange("name")}
            required
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField
            id="email"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange("email")}
            required
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange("password")}
            required
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="passwordCheck"
            mb="5px"
            mt="25px"
          >
            Password Confirm
          </Typography>
          <CustomTextField
            id="passwordCheck"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.passwordCheck}
            onChange={handleChange("passwordCheck")}
            required
            error={
              formData.password !== formData.passwordCheck &&
              formData.passwordCheck !== ""
            }
            helperText={
              formData.password !== formData.passwordCheck &&
              formData.passwordCheck !== ""
                ? "Passwords do not match"
                : ""
            }
          />
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
