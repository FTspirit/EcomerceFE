import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export const footMenu = [
  {
    id: 1,
    title: "Trợ giúp",
    menu: [
      {
        id: 1,
        link: "Câu hỏi thường gặp",
        path: "/",
      },
      {
        id: 2,
        link: "Theo dõi đơn hàng",
        path: "/",
      },
      {
        id: 3,
        link: "Hủy đơn hàng",
        path: "/",
      },
      {
        id: 4,
        link: "Đổi - trả sản phẩm",
        path: "/",
      },
      {
        id: 5,
        link: "Thông tin bảo hành",
        path: "/",
      },
    ],
  },
  {
    id: 2,
    title: "Điều khoản dịch vụ",
    menu: [
      {
        id: 1,
        link: "Điều khoản đổi trả",
        path: "/",
      },
      {
        id: 2,
        link: "Bảo mật",
        path: "/",
      },
      {
        id: 3,
        link: "Sitemap",
        path: "/",
      },
      {
        id: 4,
        link: "Điều khoản cá nhân",
        path: "/",
      },
      {
        id: 5,
        link: "Giới hạn và điều kiện",
        path: "/",
      },
    ],
  },
  {
    id: 3,
    title: "Công ty",
    menu: [
      {
        id: 1,
        link: "Về chúng tôi",
        path: "/",
      },
      {
        id: 2,
        link: "Liên hệ với chúng tôi",
        path: "/",
      },
      {
        id: 3,
        link: "Liên hệ dịch vụ",
        path: "/",
      },
      {
        id: 4,
        link: "Tuyển dụng",
        path: "/",
      },
      {
        id: 5,
        link: "Affiliates",
        path: "/",
      },
    ],
  },
];

export const footSocial = [
  {
    id: 1,
    icon: <FaFacebookF />,
    path: "/",
  },
  {
    id: 2,
    icon: <FaTwitter />,
    path: "/",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    path: "/",
  },
  {
    id: 4,
    icon: <FaLinkedinIn />,
    path: "/",
  },
];
