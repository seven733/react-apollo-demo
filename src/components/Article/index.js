import React, { useState } from 'react';
import { gql } from "apollo-boost";
import { Tag } from 'antd';
import styles from './Article.module.scss';

const STAR_ARTICLE = gql`
  mutation star($id: String!) {
    starArticle(id: $id)
  }{
    success
  }
`;


function Article (props) {
  const { data }= props;
  const [ starCount, setStarCount ]= useState(data.star || 0);
  const [ collectCount, setCollectCount ]= useState(data.collect || 0);
  const [ starred, setStar ] = useState(false);
  const [ collected, setCollected ] = useState(false);

  async function clickStar() {
    setStarCount(starCount + 1);
    setStar(!starred);
  }

  function unstar() {
    setStarCount(starCount - 1);
    setStar(!starred);
  }

  function clickCollect() {
    setCollectCount(collectCount + 1);
    setCollected(!collected);
  }

  function cancelCollect() {
    setCollectCount(collectCount - 1);
    setCollected(!collected);
  }

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
      <div className={ styles.articleAction }>
        <span className={ styles.articleActionStar }>
          <i className={ styles.articleActionIcon + " iconfont" }
            onClick={() => starred ? unstar() : clickStar()}
            style={{ color: starred ? "#fadb14" : "#bfbfbf" }}
          >&#xe664;</i>
          <span className={ styles.articleActionCount }>{ starCount }</span>
        </span>
        <span className={ styles.articleActionCollect }>
          <i className={ styles.articleActionIcon + " iconfont" }
            onClick={() => collected ? cancelCollect() : clickCollect()}
            style={{ color: collected ? "#fadb14" : "#bfbfbf" }}
          >&#xe61a;</i>
          <span className={ styles.articleActionCount }>{ collectCount }</span>
        </span>
      </div>
    </div>
  )
}

export default Article;
