import React from 'react'
import styles from './index.css'
import { Link } from 'umi'

const BasicLayout: React.FC = (props) => {
  return (
    <div className={styles.normal}>
      <Link to={{ pathname: '/basic' }}>basic</Link> |{' '}
      <Link to={{ pathname: '/plugin-store' }}>plugin-store</Link> |{' '}
      <Link to={{ pathname: '/with-reuse-model' }}>reuse-model-config</Link>
      {props.children}
    </div>
  )
}

export default BasicLayout
