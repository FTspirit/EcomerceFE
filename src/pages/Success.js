// src/PaymentSuccess.js
import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
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
        <CheckCircleIcon style={{ fontSize: 100, color: "green" }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Thanh toán thành công
        </Typography>
        <Typography variant="h6" component="h2" color="textSecondary" paragraph>
          Thanh toán thành công. Cảm ơn bạn đã mua hàng.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => alert("Dẫn bạn về trang chủ")}
        >
          <Link to="/">Trở về trang chủ</Link>
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentSuccess;
