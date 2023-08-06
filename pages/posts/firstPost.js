import Link from "next/link";
import Head from 'next/head';


// copilot nomal function
export default function FirstPost() {
    return (
        
        <div>
        <Head>
          <title>Next.js Blog</title>
        </Head>
        <h1>First Post</h1>
        <h2>
            <Link href="/">
            Back to home
            </Link>
        </h2>
        </div>
    )
    }