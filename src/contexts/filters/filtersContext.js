import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { brandsMenu, categoryMenu } from "../../data/filterBarData";
import filtersReducer from "./filtersReducer";

// Filters-Context
const filtersContext = createContext();

// Initial State
const initialState = {
  allProducts: [],
  sortedValue: null,
  updatedBrandsMenu: brandsMenu,
  updatedCategoryMenu: categoryMenu,
  selectedPrice: {
    price: 0,
    minPrice: 0,
    maxPrice: 0,
  },
  mobFilterBar: {
    isMobSortVisible: false,
    isMobFilterVisible: false,
  },
};

// Filters-Provider Component
const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filtersReducer, initialState);

  /* Loading All Products on the initial render */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api-staging.gofa.vn/ecomerce/api/v4/product/list-product"
        );
        const products = response.data;

        // finding the Max and Min Price, & setting them into the state.
        const priceArr = products.map((item) => item.final_price);
        const minPrice = Math.min(...priceArr);
        const maxPrice = Math.max(...priceArr);

        dispatch({
          type: "LOAD_ALL_PRODUCTS",
          payload: { products, minPrice, maxPrice },
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  /* function for applying Filters - (sorting & filtering) */
  const applyFilters = () => {
    let updatedProducts = [...state.allProducts];

    /*==== Sorting ====*/
    if (state.sortedValue) {
      switch (state.sortedValue) {
        case "Latest":
          updatedProducts = updatedProducts.slice(0, 6).map((item) => item);
          break;

        case "Featured":
          updatedProducts = updatedProducts.filter(
            (item) => item.tag === "featured-product"
          );
          break;

        case "Top Rated":
          updatedProducts = updatedProducts.filter(
            (item) => item.rateCount > 4
          );
          break;

        case "Price(Lowest First)":
          updatedProducts = updatedProducts.sort(
            (a, b) => a.final_price - b.final_price
          );
          break;

        case "Price(Highest First)":
          updatedProducts = updatedProducts.sort(
            (a, b) => b.final_price - a.final_price
          );
          break;

        default:
          throw new Error("Wrong Option Selected");
      }
    }

    /*==== Filtering ====*/

    // filter by Brands
    const checkedBrandItems = state.updatedBrandsMenu
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (checkedBrandItems.length) {
      updatedProducts = updatedProducts.filter((item) =>
        checkedBrandItems.includes(item.brand.toLowerCase())
      );
    }

    // filter by Category
    const checkedCategoryItems = state.updatedCategoryMenu
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (checkedCategoryItems.length) {
      updatedProducts = updatedProducts.filter((item) =>
        checkedCategoryItems.includes(item.category.toLowerCase())
      );
    }

    // filter by Price
    if (state.selectedPrice) {
      updatedProducts = updatedProducts.filter((item) => {
        return item.final_price <= state.selectedPrice.price;
      });
    }

    dispatch({
      type: "FILTERED_PRODUCTS",
      payload: { updatedProducts },
    });
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.sortedValue,
    state.updatedBrandsMenu,
    state.updatedCategoryMenu,
    state.selectedPrice,
  ]);

  // Dispatched Actions
  const setSortedValue = (sortValue) => {
    return dispatch({
      type: "SET_SORTED_VALUE",
      payload: { sortValue },
    });
  };

  const handleBrandsMenu = (id) => {
    return dispatch({
      type: "CHECK_BRANDS_MENU",
      payload: { id },
    });
  };

  const handleCategoryMenu = (id) => {
    return dispatch({
      type: "CHECK_CATEGORY_MENU",
      payload: { id },
    });
  };

  const handlePrice = (event) => {
    const value = event.target.value;

    return dispatch({
      type: "HANDLE_PRICE",
      payload: { value },
    });
  };

  const handleMobSortVisibility = (toggle) => {
    return dispatch({
      type: "MOB_SORT_VISIBILITY",
      payload: { toggle },
    });
  };

  const handleMobFilterVisibility = (toggle) => {
    return dispatch({
      type: "MOB_FILTER_VISIBILITY",
      payload: { toggle },
    });
  };

  const handleClearFilters = () => {
    return dispatch({
      type: "CLEAR_FILTERS",
    });
  };

  // Context values
  const values = {
    ...state,
    setSortedValue,
    handleBrandsMenu,
    handleCategoryMenu,
    handlePrice,
    handleMobSortVisibility,
    handleMobFilterVisibility,
    handleClearFilters,
  };

  return (
    <filtersContext.Provider value={values}>{children}</filtersContext.Provider>
  );
};

export default filtersContext;
export { FiltersProvider };
