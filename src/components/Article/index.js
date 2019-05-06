import React from 'react';
import { Tag } from 'antd';
import styles from './Article.module.scss';

function Article (props) {
  const { data }= props;
  return (
    <div className={ styles.article }>
      <div className={ styles.articleTitle }>
        <a href={ data.url } target="blank">{ data.title }</a>
      </div>
      <div className={ styles.articleDes }>{ data.description }</div>
      <div className={ styles.articleTag }>
        {
          data.tags.map(o => <Tag color="green" key={o}>{o}</Tag>)
        }
      </div>
    </div>
  )
}

export default Article;
