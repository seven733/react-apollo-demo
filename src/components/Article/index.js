import React, { useState } from 'react';
import { gql } from "apollo-boost";
import { Tag } from 'antd';
import styles from './Article.module.scss';
import { useMutation } from 'react-apollo-hooks';

const STAR_ARTICLE = gql`
  mutation star($id: String!) {
    starArticle(id: $id) {
      success
    }
  }
`;

const UNSTAR_ARTICLE = gql`
  mutation unstar($id: String!) {
    unstarArticle(id: $id) {
      success
    }
  }
`;

const COLLECT_ARTICLE = gql`
  mutation collect($id: String!) {
    collectArticle(id: $id) {
      success
    }
  }
`;

const CANCEL_COLLECT_ARTICLE = gql`
  mutation cancelCollect($id: String!) {
    cancelCollectArticle(id: $id) {
      success
    }
  }
`;

function Article ({ data }) {
  const [ starCount, setStarCount ]= useState(data.star || 0);
  const [ collectCount, setCollectCount ]= useState(data.collect || 0);
  const [ starred, setStar ] = useState(false);
  const [ collected, setCollected ] = useState(false);

  const star = useMutation(STAR_ARTICLE, { variables: { id: data._id } });
  const unstar = useMutation(UNSTAR_ARTICLE, { variables: { id: data._id } });
  const collect = useMutation(COLLECT_ARTICLE, { variables: { id: data._id } });
  const cancelCollect = useMutation(CANCEL_COLLECT_ARTICLE, { variables: { id: data._id } });

  async function clickStar() {
    star();
    setStarCount(starCount + 1);
    setStar(!starred);
  }

  function clickUnstar() {
    unstar();
    setStarCount(starCount - 1);
    setStar(!starred);
  }

  function clickCollect() {
    collect();
    setCollectCount(collectCount + 1);
    setCollected(!collected);
  }

  function clickCancelCollect() {
    cancelCollect();
    setCollectCount(collectCount - 1);
    setCollected(!collected);
  }

  const starProps = {
    onClick: starred ? clickUnstar: clickStar,
    style: {
      color: starred ? "#fadb14" : "#bfbfbf"
    }
  }

  const collectProps = {
    onClick: collected ? clickCancelCollect: clickCollect,
    style: {
      color: collected ? "#fadb14" : "#bfbfbf"
    }
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
          <i className={ styles.articleActionIcon + " iconfont" } {...starProps}>&#xe664;</i>
          <span className={ styles.articleActionCount }>{ starCount }</span>
        </span>
        <span className={ styles.articleActionCollect }>
          <i className={ styles.articleActionIcon + " iconfont" } {...collectProps}>&#xe61a;</i>
          <span className={ styles.articleActionCount }>{ collectCount }</span>
        </span>
      </div>
    </div>
  )
}

export default Article;
