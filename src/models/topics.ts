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

type Pagination = {
  current: number;
  pageSize: number;
};

type Category = {
  dataSource: Topic[];
  pagination: Pagination;
};

type State = {
  tab: 'all' | 'ask' | 'share' | 'job' | 'good';
  all: Category;
  ask: Category;
  share: Category;
  job: Category;
  good: Category;
}

const initCategory: Category = {
  dataSource: [],
  pagination: {
    current: 1,
    pageSize: 10,
  },
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
    async getList({ tab, page, limit }) {
      const list = await request('https://cnodejs.org/api/v1/topics', {
      });
      this.setState({
        list,
      });
    },
  },

  // actions: (dispatch) => ({
  //   async getList() {
  //     const list = await request('/api/v1/topics', {
  //       baseUrl: 'https://cnodejs.org',
  //     });
  //     dispatch.topics.setState({
  //       list,
  //     });
  //   },
  // }),
});
