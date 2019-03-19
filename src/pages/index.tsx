import React, { useEffect, FunctionComponent } from 'react';
import { List, Avatar, Spin, Tabs } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { useModel, UseModel, RootState } from '@/models';
import styles from './index.less';

const { TabPane } = Tabs;

const tabs = [{
  key: 'all',
  tab: '全部',
}, {
  key: 'good',
  tab: '精华',
}, {
  key: 'ask',
  tab: '问答',
}, {
  key: 'share',
  tab: '分享',
}, {
  key: 'job',
  tab: '招聘',
}];

const Topics: FunctionComponent = () => {
  const mapState = (state: RootState) => state.topics;
  const { dispatch, tab, ...rest } = useModel<UseModel<ReturnType<typeof mapState>>>(mapState);

  const onLoad = (newTab?) => {
    dispatch.topics.getList(newTab);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const renderItem = (item) => (
    <List.Item key={item.id}>
      <List.Item.Meta
        avatar={<Avatar src={item.author.avatar_url} />}
        title={item.title}
        description={item.author.loginname}
      />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: item.content}}
      />
    </List.Item>
  );

  return (
    <Tabs defaultActiveKey={tab} onChange={onLoad}>
      {tabs.map((i) => {
        const current = rest[i.key];
        return (
          <TabPane className={styles.container} tab={i.tab} key={i.key}>
            <div className={styles.list}>
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={() => onLoad()}
                hasMore={!current.loading && current.hasMore}
                useWindow={false}
              >
                <List
                  dataSource={current.dataSource}
                  footer={<div><b>ant design</b> footer part</div>}
                  renderItem={renderItem}
                >
                  {current.loading && current.hasMore && (
                    <div className={styles.loading}>
                      <Spin />
                    </div>
                  )}
                </List>
              </InfiniteScroll>
            </div>
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default Topics;
