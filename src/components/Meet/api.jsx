import axios from "axios";
import React, { useEffect, useState } from "react";

const [responseData, setResponseData] = useState([]);

const fetchData = async () => {
  try {
    const response = await axios.get("https://api.xbt.kg/ru/index");
    // console.log(response.data);
  } catch (error) {
    // console.error(error);
  }
};

useEffect(() => {
  fetchData();
});
