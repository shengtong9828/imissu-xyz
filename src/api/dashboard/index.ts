import request from "@/utils/request-custom";
import { AxiosPromise } from "axios";
import { ShiCiData, WeatherData } from "./types";

/**
 * 古诗词
 */
export function getShiCi(): AxiosPromise<ShiCiData> {
  return request({
    url: "https://v1.jinrishici.com/all.json",
    method: "get",
  });
}

/**
 * 天气
 */
export function GetWeather(): AxiosPromise<WeatherData> {
  return request({
    url: "https://api.oioweb.cn/api/weather/GetWeather",
    method: "get",
  });
}
