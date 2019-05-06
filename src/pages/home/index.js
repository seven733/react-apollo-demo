import React, { useEffect, useState } from 'react';
import { gql } from "apollo-boost";
import styles from './Home.module.scss';
import Article from 'components/Article';
import { Input } from 'antd';
import { Query }from '@/api/index.js'
import * as R from 'ramda';

const Search = Input.Search;

const GET_ARTICLES_AND_TAGS = gql`
  query fetchData( $tags: Boolean!, $title: String, $tag: String) {
    articleList( title: $title, tag: $tag ) {
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
  const [ tags, setTags ] = useState([]);
  const [ query, setQuery ] = useState({ tags: true });

  useEffect(() => {
    const fetchData = async () => {
      const data = await Query(GET_ARTICLES_AND_TAGS, query);
      setArticles(data.articleList.articles);
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
      </div>

      <div className={ styles.homeSearch }>
        <div className={ styles.query }>
          <Search
            placeholder="请输入文章名称"
            onSearch={ value => setQuery(R.merge(query, { tags: false, title: value })) }
          />
        </div>
        <div>
          {
            tags.map(o => (<Tag key={o.name} data={o} onTagClick={ value => setQuery(R.merge(query, value))}></Tag>))
          }
        </div>
      </div>
    </div>
  )
}

export default Home;