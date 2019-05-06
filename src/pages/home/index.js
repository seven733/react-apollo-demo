import React, { useEffect, useState } from 'react';
import { gql } from "apollo-boost";
import styles from './Home.module.scss';
import Article from 'components/Article';
import { Input, Pagination } from 'antd';
import { Query }from '@/api/index.js'
import * as R from 'ramda';

const Search = Input.Search;
const PageSize = 10;

const GET_ARTICLES_AND_TAGS = gql`
  query fetchData( $tags: Boolean!, $title: String, $tag: String, $start: Int) {
    articleList( title: $title, tag: $tag, start: $start ) {
      totalCount
      articles {
        _id
        title
        url
        tags
        description
      }
    }
    tags: tagStatistics @include(if: $tags) {
      name
      count
    }
  }
`;

function Tag ({ data, onTagClick }) {
  return (
    <div className={ styles.tag } onClick={() => onTagClick({ tags: false, tag: data.name })}>
      <span className={ styles.tagName }>{ data.name }</span>
      <span className={ styles.tagCount }>({ data.count })</span>
    </div>
  )
}

function Home() {
  const [ articles, setArticles ] = useState([]);
  const [ total, setTotal ] = useState(0);
  const [ tags, setTags ] = useState([]);
  const [ query, setQuery ] = useState({ tags: true });
  const queryChange = v => setQuery(R.merge(query, v));

  useEffect(() => {
    const fetchData = async () => {
      const data = await Query(GET_ARTICLES_AND_TAGS, query);
      setArticles(data.articleList.articles);
      setTotal(data.articleList.totalCount);
      if (data.tags) {
        setTags(data.tags);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className={ styles.home }>
      <div className={ styles.homeList }>
        { articles.map(item => (<Article key={item._id.toString()} data={item} />)) }
        <Pagination defaultCurrent={1} total={total} onChange={ page  =>  queryChange({ start: (page - 1) * PageSize })}/>
      </div>

      <div className={ styles.homeSearch }>
        <div className={ styles.query }>
          <Search
            placeholder="请输入文章名称"
            onSearch={ value => queryChange({ tags: false, title: value }) }
          />
        </div>
        <div>
          {
            tags.map(o => (<Tag key={o.name} data={o} onTagClick={ value => queryChange(value)}></Tag>))
          }
        </div>
      </div>
    </div>
  )
}

export default Home;