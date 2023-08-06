import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head';
import Layout from '/components/Layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { getSortedPostsData } from '../lib/posts'
import { siteTitle } from '@/components/Layout';

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  // console.log(allPostsData);
  return {
    props: {
      allPostsData, //これをHomeに渡す
    },
  };
}


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          私は、エンジニアです。
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, date, title, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} className={utilStyles.boldText}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>

          ))}
        </div>
      </section>

    </Layout>
  )
}
