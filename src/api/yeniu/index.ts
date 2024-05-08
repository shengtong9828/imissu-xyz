import request from "@/utils/request-custom";
import { AxiosPromise } from "axios";

/**
 * 获取精选打卡
 */
export function getSpecialList(id: string): AxiosPromise<any> {
  return request({
    url: `/data/${id}.json`,
    method: "get",
  });
}

/**
 * 获取精选打卡
 */
export function getExhibitionList(): AxiosPromise<any> {
  return request({
    url: `/response.json`,
    method: "get",
  });
}

/**
 * 获取精选打卡
 */
export function getCommentList(): AxiosPromise<any> {
  return request({
    url: `/comment_list/2023-12-31.json`,
    method: "get",
  });
}
