import request from "@/utils/request-custom";
import { AxiosPromise } from "axios";
import { ShiCiData } from "./types";

/**
 * 注销API
 */
export function getShiCi(): AxiosPromise<ShiCiData> {
  return request({
    url: "https://v1.jinrishici.com/all.json",
    method: "get",
  });
}
