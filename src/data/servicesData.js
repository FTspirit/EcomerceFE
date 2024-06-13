import {
  FaShippingFast,
  FaShieldAlt,
  FaTags,
  FaCreditCard,
} from "react-icons/fa";

const servicesData = [
  {
    id: 1,
    icon: <FaShippingFast />,
    title: "Giao hàng nhanh",
    info: "Ship 24/7",
  },
  {
    id: 2,
    icon: <FaShieldAlt />,
    title: "Bảo hành của hãng",
    info: "100% sản phẩm của hãng",
  },
  {
    id: 3,
    icon: <FaTags />,
    title: "Giá cả hợp lý",
    info: "Trong tất cả mọi sản phẩm",
  },
  {
    id: 4,
    icon: <FaCreditCard />,
    title: "Thanh toán an toàn",
    info: "Sử dụng bảo mật",
  },
];

export default servicesData;
