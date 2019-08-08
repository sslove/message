/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-27 09:54:43
 * @LastEditTime: 2019-08-08 20:59:04
 * @LastEditors: Please set LastEditors
 */
import { get, post } from "./http";
const zhuce = p => get("/zbinteract/article/init", p); //注册的接口
const dengLu = p => get("/zbinteract/article/authorinfo", p); //登陆的接口
const yanzheng = p => get("/zbinteract/article/islogin", p); //点击发布判断是否登陆
const fabu = p => get("/zbinteract/article/artcreate", p); //发布文章
const soushu = p => get("/zbinteract/article/artsearch", p); //文章搜索
const xiugai = p => get("/zbinteract/article/authorupdate", p); //文章搜索
const shangchaun = p => post("/zbinteract/article/uploadimage", p); //图片上传
const huoquxinxi = p => get("/zbinteract/article/getuserinfo", p); //获取登陆用户信息
export {
  zhuce,
  dengLu,
  yanzheng,
  fabu,
  soushu,
  xiugai,
  shangchaun,
  huoquxinxi
};
