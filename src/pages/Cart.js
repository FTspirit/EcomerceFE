import React, { useContext } from "react";
import { BsCartX } from "react-icons/bs";
import axios from "axios";
import { calculateTotal, displayMoney } from "../helpers/utils";
import useDocTitle from "../hooks/useDocTitle";
import cartContext from "../contexts/cart/cartContext";
import CartItem from "../components/cart/CartItem";
import EmptyView from "../components/common/EmptyView";
import { generateRandomString } from "../helpers/utils";
// import PDFDocument from "pdfkit";
// import blobStream from "blob-stream";

const Cart = () => {
  useDocTitle("Cart");

  const { cartItems } = useContext(cartContext);

  const cartQuantity = cartItems.length;

  // total original price
  const cartTotal = cartItems.map((item) => {
    return item.original_price * item.quantity;
  });

  const calculateCartTotal = calculateTotal(cartTotal);
  const displayCartTotal = displayMoney(calculateCartTotal);

  // total discount
  const cartDiscount = cartItems.map((item) => {
    return (item.original_price - item.final_price) * item.quantity;
  });

  const calculateCartDiscount = calculateTotal(cartDiscount);
  const displayCartDiscount = displayMoney(calculateCartDiscount);

  // final total amount
  const totalAmount = calculateCartTotal - calculateCartDiscount;
  const displayTotalAmount = displayMoney(totalAmount);

  const onCheckout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/v4/zalo/create-payment`,
        {
          totalAmount,
        }
      );
      const { order_url } = response.data;

      if (order_url) {
        window.open(order_url, "_blank");
      } else {
        console.error("No order URL returned from the API");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const onCheckoutMomo = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/v4/momo/create-payment`,
        {
          amount: totalAmount,
          orderInfo: "Sound tech thanh toan cho khach hang",
        }
      );
      const { payUrl } = response.data;

      if (payUrl) {
        window.open(payUrl, "_blank");
      } else {
        console.error("No order URL returned from the API");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const onCheckoutPayOS = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/v4/payos/create-payment`,
        {
          amount: totalAmount,
          description: "Soundtech thanh toán",
          orderCode: parseInt(generateRandomString(5)),
        }
      );
      const { orderUrl } = response.data;

      if (orderUrl) {
        window.open(orderUrl, "_blank");
      } else {
        console.error("No order URL returned from the API");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const onCheckoutVNPay = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/v4/vnpay/create-payment`,
        {
          amount: totalAmount,
          bankCode: "NCB",
        }
      );
      const { orderUrl } = response.data;

      if (orderUrl) {
        window.open(orderUrl, "_blank");
      } else {
        console.error("No order URL returned from the API");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const onCreateBill = async () => {};

  return (
    <>
      <section id="cart" className="section">
        <div className="container">
          {cartQuantity === 0 ? (
            <EmptyView
              icon={<BsCartX />}
              msg="Your Cart is Empty"
              link="/all-products"
              btnText="Start Shopping"
            />
          ) : (
            <div className="wrapper cart_wrapper">
              <div className="cart_left_col">
                {cartItems.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>

              <div className="cart_right_col">
                <div className="order_summary">
                  <h3>
                    Tổng đơn giá &nbsp; ( {cartQuantity}{" "}
                    {cartQuantity > 1 ? "sản phẩm" : "sản phẩm"} )
                  </h3>
                  <div className="order_summary_details">
                    <div className="price">
                      <span>Giá gốc</span>
                      <b>{displayCartTotal}</b>
                    </div>
                    <div className="discount">
                      <span>Giảm giá</span>
                      <b>- {displayCartDiscount}</b>
                    </div>
                    <div className="delivery">
                      <span>Giao hàng</span>
                      <b>Miễn phí</b>
                    </div>
                    <div className="separator"></div>
                    <div className="total_price">
                      <b>
                        <small>Tổng tiền</small>
                      </b>
                      <b>{displayTotalAmount}</b>
                    </div>
                  </div>
                  <div
                    className="order_summary_details"
                    onClick={onCheckoutPayOS}
                  >
                    <div className="price">
                      <span>Thanh toán PayOS</span>
                      <b>
                        <img
                          src="/images/products/logo.svg"
                          alt="Example"
                          className="icon_checkout payos"
                        />
                      </b>
                    </div>
                    <div className="price" onClick={onCheckoutVNPay}>
                      <span>Thanh toán VN pay</span>
                      <b>
                        <img
                          src="/images/products/vnpay-logo-inkythuatso-01.png"
                          alt="Example"
                          className="icon_checkout vnp"
                        />
                      </b>
                    </div>
                    <div className="price" onClick={onCheckoutMomo}>
                      <span>Thanh toán MOMO</span>
                      <b>
                        <img
                          src="/images/products/momo_icon_square_pinkbg_RGB.png"
                          alt="Example"
                          className="icon_checkout momo"
                        />
                      </b>
                    </div>
                    <div className="price" onClick={onCheckout}>
                      <span>Thanh toán Zalo Pay</span>
                      <b>
                        <img
                          src="/images/products/ZaloPay-ngang.png"
                          alt="Example"
                          className="icon_checkout zalo_pay"
                        />
                      </b>
                    </div>
                    <button
                      type="button"
                      className="btn checkout_btn"
                      onClick={onCreateBill}
                    >
                      In hóa đơn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
