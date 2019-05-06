import React from 'react';
import { useApolloClient, useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styles from './Home.module.scss';
import Article from 'components/Article';
import { Input } from 'antd';

const Search = Input.Search;

const GET_ARTICLES_AND_TAGS = gql`
  query fetchData($tags: Boolean!) {
    articleList {
      totalCount
      articles {
        _id
        title
        url
        tags
        description
      }
    }
    tagStatistics @include(if: $tags) {
      name
      count
    }
  }
`;

function Tag ({ data }) {
  return (
    <div className={ styles.tag }>
      <span className={ styles.tagName }>{ data.name }</span>
      <span className={ styles.tagCount }>({ data.count })</span>
    </div>
  )
}

function Home() {
  const client = useApolloClient();
  const { data } = useQuery(GET_ARTICLES_AND_TAGS, {
    suspend: true,
    variables: { tags: true }
  });

  return (
    <div className={ styles.home }>
      <div className={ styles.homeList }>
        { data.articleList.articles.map(item => (<Article key={item._id} data={item} />)) }
      </div>

      <div className={ styles.homeSearch }>
        <div className={ styles.query }>
          <Search
            placeholder="请输入文章名称"
            onSearch={ ()=> client.query({
              query: GET_ARTICLES_AND_TAGS,
              variables: { tags: false }
            })}
          />
        </div>
        <div>
          {
            data.tagStatistics.map(o => (<Tag key={o.name} data={o}></Tag>))
          }
        </div>
      </div>
    </div>
  )
}

export default Home;