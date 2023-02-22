import * as React from 'react'

import { Box } from '@mui/material'

import createEmotionServer from '@emotion/server/create-instance'
import Document, {
  DocumentInitialProps, Head, Html, Main, NextScript
} from 'next/document'

import createEmotionCache from '@/styles/utils/createEmotionCache'

export default class MyDocument extends Document<{emotionStyleTags: JSX.Element[] }> {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          {this.props.emotionStyleTags}
        </Head>
        <Box component="body">
          <Main />
          <NextScript />
        </Box>
      </Html>
    )
  }
}

type IntitialProps = DocumentInitialProps & {emotionStyleTags: JSX.Element[]}

MyDocument.getInitialProps = async (ctx): Promise<IntitialProps> => {
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = (): any => originalRenderPage({
    enhanceApp: (App) => function EnhanceApp(props) {
      // @ts-ignore
      return <App emotionCache={cache} {...props} />
    }
  })

  const initialProps = await Document.getInitialProps(ctx)

  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags
  }
}
