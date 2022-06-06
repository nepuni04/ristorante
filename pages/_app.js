import '../styles/globals.css'
import { AuthProvider } from '../lib/auth'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@/components/MDXComponents';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <MDXProvider components={MDXComponents}>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </MDXProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
