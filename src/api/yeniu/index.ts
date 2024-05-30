import request from "@/utils/request-custom";
import { AxiosPromise } from "axios";

const baseUrl = "https://qingjing-01.oss-cn-beijing.aliyuncs.com";

/**
 * 获取精选打卡
 */
export function getSpecialList(id: string): AxiosPromise<any> {
  return request({
    url: `${baseUrl}/data/${id}.json`,
    method: "get",
  });
}

/**
 * 获取精选打卡
 */
export function getExhibitionList(): AxiosPromise<any> {
  return request({
    url: `${baseUrl}/response.json`,
    method: "get",
  });
}

/**
 * 获取精选打卡
 */
export function getStudyList(): AxiosPromise<any> {
  return request({
    url: `${baseUrl}/study.json`,
    method: "get",
  });
}

/**
 * 获取精选打卡
 */
export function getCommentList(): AxiosPromise<any> {
  return request({
    url: `${baseUrl}/comment_list/2023-12-31.json`,
    method: "get",
  });
}
