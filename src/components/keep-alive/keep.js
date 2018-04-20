/**
 * 缓存数据
 */
import { ReactNode } from 'react';
const KEEPALIVE = {};

export default {
  /**
   * 设置缓存
   */
  set(key: string, children: ReactNode, data?: any, top?: number) {
    KEEPALIVE[key] = {
      children,
      data,
      top,
    };
  },
  /**
   * 获取缓存
   */
  get(key: string) {
    return KEEPALIVE[key] || {};
  },
  /**
   * 删除缓存
   */
  remove(key: string) {
    if (KEEPALIVE[key]) {
      delete KEEPALIVE[key];
    }
  },
};
