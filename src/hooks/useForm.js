import { useContext, useState } from "react";
import commonContext from "../contexts/common/commonContext";
import axios from "axios";

const useForm = () => {
  const { toggleForm, setFormUserInfo } = useContext(commonContext);
  const [inputValues, setInputValues] = useState({});

  // handling input-values
  const handleInputValues = (e) => {
    const { name, value } = e.target;

    setInputValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  // handling form-submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValues);
    let loggedUserInfo;
    try {
      const response = await axios.post(
        "http://127.0.0.1:4445/v4/auth/login-with-password",
        {
          phone_number: inputValues.phone,
          password: inputValues.password,
        }
      );
      loggedUserInfo = response.data.customer.fullname;

      // Assuming the token is in response.data.token
      // Store the token in local storage or context
      localStorage.setItem("data", JSON.stringify(response.data));

      // Redirect or update UI
      console.log("Login successful", response.data);
    } catch (err) {
      console.log(err);
    }
    console.log(loggedUserInfo);
    setInputValues({});
    setFormUserInfo(loggedUserInfo);
    toggleForm(false);
    alert(`Xin chào ${loggedUserInfo}, chúc mừng bạn đã đăng nhập thành công.`);
  };

  return { inputValues, handleInputValues, handleFormSubmit };
};

export default useForm;
