import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import '../styles/globals.scss'
import { useEffect } from 'react'
import localforage from 'localforage'

function MyApp({ Component, pageProps }) {

  useEffect(() => {

    let init 
    
    (async () => {
    
      await localforage.getItem( 'gatherings' )
      .then( data => init = data )
      .catch( err => init = err )

      init === null && setDB()
    })()

    const setDB = () => {
      localforage.setItem('gatherings', [])
      .then( (data) => console.log(data) )
      .catch( err => console.log(err) )
    }

  }, [])

  return (
    <>
      <Head>
        <title>Splitter</title>
        <link rel="shortcut icon" href="/splitter.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
