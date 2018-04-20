import * as React from 'react';
import keep from './keep';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IProps extends RouteComponentProps<any> {
  // 活动DOm的样式名
  scroll?: string;
  // 需要缓存的信息
  cacheData?: any;
  // 触发缓存渲染时回调函数
  onCacheRenderBack?: (data: any) => void;
}

export interface IState {
}

class KeepAlive extends React.Component<IProps, IState> {
  static defaultProps = {
    cacheData: {},
  };

  scrollNode: HTMLElement;

  componentWillMount() {
    const cache = this.getCahche();
    const { onCacheRenderBack } = this.props;
    if (cache.children && onCacheRenderBack) {
      onCacheRenderBack(cache.data);
    }
  }

  componentDidUpdate() {
    const cache = this.getCahche();
    const node = this.getScrollNodeScroll();
    if (node && cache.top) {
      setTimeout(() => {
        node.scrollTop = cache.top;
      }, 20);
    }
  }

  /**
   * 实例销毁前
   */
  componentWillUnmount() {
    const node = this.getScrollNodeScroll();

    keep.set(
      this.props.location.pathname,
      this.props.children,
      this.props.cacheData,
      node ? node.scrollTop : 0,
    );
  }

  /**
   * 获取滚动的高度
   */
  getScrollNodeScroll() {
    if (!this.scrollNode) {
      const scroll = this.props.scroll;
      if (scroll) {
        this.scrollNode = document.querySelector(scroll) as HTMLElement;
      }
    }

    return this.scrollNode;
  }

  /**
   * 获取缓存cache
   */
  getCahche() {
    return keep.get(this.props.location.pathname);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(KeepAlive);
