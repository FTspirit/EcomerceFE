import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import useActive from "../../hooks/useActive";
import ProductCard from "./ProductCard";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const { activeClass, handleActive } = useActive(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:9875/v4/product/list-product"
        );
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
        setOriginalProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching the products", error);
      }
    };

    fetchProducts();
  }, []);

  // making a unique set of product's category
  const productsCategory = [
    "All",
    ...new Set(originalProducts.map((item) => item.category)),
  ];

  // handling product's filtering
  const handleProducts = (category, i) => {
    if (category === "All") {
      setProducts(originalProducts);
      handleActive(i);
      return;
    }

    const filteredProducts = originalProducts.filter(
      (item) => item.category === category
    );
    setProducts(filteredProducts);
    handleActive(i);
  };

  return (
    <>
      <div className="products_filter_tabs">
        <ul className="tabs">
          {productsCategory.map((item, i) => (
            <li
              key={i}
              className={`tabs_item ${activeClass(i)}`}
              onClick={() => handleProducts(item, i)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="wrapper products_wrapper">
        {products.slice(0, 11).map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
        <div className="card products_card browse_card">
          <Link to="/all-products">
            Xem toàn bộ <br /> sản phẩm <BsArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopProducts;
