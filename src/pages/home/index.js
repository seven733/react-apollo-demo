import React, { useState } from 'react';
import { gql } from "apollo-boost";
import styles from './Home.module.scss';
import Article from 'components/Article';
import { Input, Pagination } from 'antd';
import { useQuery } from 'react-apollo-hooks';
import { useActions, useStore } from 'easy-peasy';

const Search = Input.Search;
const PageSize = 10;

const GET_ARTICLES_AND_TAGS = gql`
  query fetchData($title: String, $tag: String, $start: Int) {
    articleList( title: $title, tag: $tag, start: $start ) {
      totalCount
      articles {
        _id
        title
        url
        tags
        description
        star
        collect
      }
    }
  }
`;

const GET_TAGS = gql`
  {
    tags: tagStatistics {
      name
      count
    }
  }
`;

function Tag ({ checkedTag, data, setCheckedTag }) {
  const changeQuery = useActions(actions => actions.query.assign);
  const clickTag = () => {
    changeQuery({ tag: data.name });
    setCheckedTag(data.name);
  }
  return (
    <div className={ styles.tag }
      style={{ color: checkedTag === data.name ? '#95de64': ''}}
      onClick={() => clickTag()}>
      <span className={ styles.tagName } >{ data.name }</span>
      <span className={ styles.tagCount }>({ data.count })</span>
    </div>
  )
}

function ArticleList({ query, setTotal }) {
  const { data, error, loading } = useQuery(GET_ARTICLES_AND_TAGS, {
    fetchPolicy: "network-only",
    variables: query
  });

  if (loading) return <div>loading....</div>;
  if (error) {
    return <p>{error.message}</p>;
  }
  const articles = data.articleList.articles;
  setTotal(data.articleList.totalCount)

  return (
    <React.Fragment>
      { articles.map(item => (<Article key={item._id.toString()} data={item} />)) }
    </React.Fragment>
  )
}

function TagList() {
  const { data, error, loading } = useQuery(GET_TAGS);

  const [ checkedTag, setCheckedTag ] = useState(null);
  if (loading) return <div>loading....</div>;
  if (error) return <p>{error.message}</p>;
  const tags= data.tags;

  return (
    <React.Fragment>
      { tags.map(o => (<Tag key={o.name} data={o} checkedTag={checkedTag} setCheckedTag={val => setCheckedTag(val)}></Tag>)) }
    </React.Fragment>
  )

}

function Home() {
  const query = useStore(state => state.query.data);
  const changeQuery = useActions(actions => actions.query.assign);
  const [ total, setTotal ] = useState(0);

  return (
    <div className={ styles.home }>
      <div className={ styles.homeList }>
        <ArticleList query={query} setTotal={t => setTotal(t)}></ArticleList>
        <Pagination defaultCurrent={1} total={total} onChange={ page  =>  changeQuery({ start: (page - 1) * PageSize })}/>
      </div>
      <div className={ styles.homeSearch }>
        <div className={ styles.query }>
          <Search
            placeholder="请输入文章名称"
            onSearch={ value => changeQuery({title: value}) }
          />
          <TagList></TagList>
        </div>
      </div>
    </div>
  )
}

export default Home;
