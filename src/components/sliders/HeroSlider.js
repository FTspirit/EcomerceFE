import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import axios from "axios";
import { displayMoney } from "../../helpers/utils";

import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";

const HeroSlider = () => {
  const [heroProducts, setHeroProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroProducts = async () => {
      try {
        const response = await axios.get(
          "https://api-staging.gofa.vn/ecomerce/api/v4/product/list-product"
        );
        const products = response.data.filter(
          (product) => product.tag === "hero-product"
        );
        setHeroProducts(products);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchHeroProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading hero products</div>;
  }

  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      loop={true}
      speed={400}
      spaceBetween={100}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {heroProducts.map((item, i) => {
        const {
          id,
          title,
          tag_line,
          hero_image,
          final_price,
          original_price,
          path,
        } = item;
        const newPrice = displayMoney(final_price);
        const oldPrice = displayMoney(original_price);

        return (
          <SwiperSlide
            key={id}
            className={`wrapper hero_wrapper hero_slide-${i}`}
          >
            <div className="hero_item_txt">
              <h3>{title}</h3>
              <h1>{tag_line}</h1>
              <h2 className="hero_price">
                {newPrice} &nbsp;
                <small>
                  <del>{oldPrice}</del>
                </small>
              </h2>
              <Link to={`${path}${id}`} className="btn">
                Mua ngay
              </Link>
            </div>
            <figure className="hero_item_img">
              <img src={hero_image} alt="product-img" />
            </figure>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
