import { ROUTES } from "./routes";
import axios from "axios";
import { changeUrlKeys } from "../helpers";
import { API_KEY } from "@env";
import { ENDPOINTS_MAP, ROUTE_NAME } from "../types";

const endpoints = {} as ENDPOINTS_MAP;

Object.keys(ROUTES).forEach((key) => {
  const { url, method } = ROUTES[key as ROUTE_NAME];

  endpoints[key as ROUTE_NAME] = ({ urlKeys }) => {
    const finalURL = `${changeUrlKeys(url, urlKeys)}?key=${API_KEY}`;
    return axios[method](finalURL).catch((err) => {
      console.log(err);

      throw err;
    });
  };
});

export default endpoints;
