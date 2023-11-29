import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Internal Identity Associate</title>
          <meta
            property="og:title"
            content="test-page - Internal Identity Associate"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_iaditi) => (
            <>
              <h1>{context_iaditi?.Name}</h1>
            </>
          )}
          initialData={props.contextIaditiProp}
          persistDataDuringLoading={true}
          key={props?.contextIaditiProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextIaditiProp = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextIaditiProp: contextIaditiProp?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
