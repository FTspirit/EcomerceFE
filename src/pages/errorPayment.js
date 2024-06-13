// src/PaymentError.js
import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";

const PaymentError = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
        bgcolor="#f5f5f5"
        p={4}
        borderRadius={2}
        boxShadow={3}
      >
        <ErrorOutlineIcon style={{ fontSize: 100, color: "red" }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Lỗi Thanh Toán!
        </Typography>
        <Typography variant="h6" component="h2" color="textSecondary" paragraph>
          Rất tiếc, đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại
          sau.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => alert("Quay lại trang chủ")}
        >
          <Link to="/">Trở về trang chủ</Link>
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentError;
