import { createModel } from '@/models/core';
import request from 'umi-request';

type Author = {
  loginname: string;
  avatar_url: string;
};

type Topic = {
  id: string;
  author_id: string;
  tab: string;
  content: string;
  title: string;
  last_reply_at: string;
  good: boolean;
  top: boolean;
  reply_count: number;
  visit_count: number;
  create_at: string;
  author: Author;
}

type Category = {
  hasMore: boolean;
  loading: boolean;
  pageIndex: number;
  dataSource: Topic[];
};

type Tab = 'all' | 'ask' | 'share' | 'job' | 'good';

type State = {
  tab: Tab;
  all: Category;
  ask: Category;
  share: Category;
  job: Category;
  good: Category;
}

const pageSize = 10;

const initCategory: Category = {
  hasMore: true,
  loading: false,
  pageIndex: 0,
  dataSource: [],
};

export default createModel<State>({
  name: 'topics',

  state: {
    tab: 'all',
    all: initCategory,
    ask: initCategory,
    share: initCategory,
    job: initCategory,
    good: initCategory,
  },

  actions: {
    async getList(newTab: Tab, rootState: { topics: State }) {
      const { topics } = rootState;
      const tab = newTab || topics.tab;
      const pageIndex = topics[tab].pageIndex + 1;
      this.setState({
        tab,
        [tab]: {
          ...topics[tab],
          loading: true,
        }
      });
      const { success, data } = await request('https://cnodejs.org/api/v1/topics', {
        params: {
          tab,
          page: pageIndex,
          limit: pageSize,
          mdrender: false,
        }
      });
      if (success) {
        const { dataSource } = topics[tab];
        this.setState({
          [tab]: {
            pageIndex,
            loading: false,
            hasMore: data.length === pageSize,
            dataSource: [...dataSource, ...data],
          },
        });
      }
    },
  },
});
