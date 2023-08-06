import path from 'path'
import fs from 'fs'
import matter from 'gray-matter';

import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), 'posts')

//mdファイルを取得する関数
//mdファイルのデータを日付順に取り出す(トップページのブログ一覧出力で使う)
export function getSortedPostsData() {
    // /posts配下のファイル名を取得
    const fileNames = fs.readdirSync(postsDirectory);
    // console.log(fileNames);
    const allPostsData = fileNames.map((fileName) => {
      // idを取得するためにファイル名の拡張子を除外
      const id = fileName.replace(/\.md$/, "");
  
      //マークダウンファイルを文字列として読み取る
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
  
      //投稿のメタデータ部分を解析
      const matterResult = matter(fileContents);
  
      //idとデータを返す。
      return {
        id,
        ...matterResult.data,
      };
    });
    // console.log(allPostsData);
    //投稿を日付でソートする
    return allPostsData.sort((a, b) => {
      if (a.data < b.data) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  //getStaticPathsでreturnされる値の配列の中身を確認する関数
    export function getAllPostIds() {
        const fileNames = fs.readdirSync(postsDirectory);
        // console.log(fileNames);
        return fileNames.map((fileName) => {
            return {
                params: {
                    id: fileName.replace(/\.md$/, ""),
                },
            };
        });
    }
    //id に基づいてブログの投稿データを取得する関数
    export async function getPostData(id) {
        const fullPath = path.join(postsDirectory, `${id}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
    
        // 投稿のメタデータ部分を解析するためにgray-matterを使う
        const matterResult = matter(fileContents);
    
          // マークダウンをHTML文字列に変換するためにremarkを使う
          const processedContent = await remark()
          .use(html)
          .process(matterResult.content);
      

          const contentHTML = processedContent.toString();

        return {
            id,
            contentHTML,
            ...matterResult.data,
        };

    }
  