import * as React from 'react'

import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MainLayout from '@/components/layouts/MainLayout'
import PageTitle from '@/components/PageTitle'
import { useIsMobile } from '@/domains/hooks'

export const getStaticProps: GetStaticProps<PageProps> = async () => ({
  props: {
    ...(await serverSideTranslations('fr', [
      'common',
      'errors',
      'pages',
      'map'
    ])),
    baseUrl: process.env.NEXT_PUBLIC_BASEURL as string
  }
})

interface PageProps {
  baseUrl: string
}
interface Parameter {
  name: string
  description: string
}

const IntegrationPage: React.FC<PageProps> = ({ baseUrl }) => {
  const { t } = useTranslation([
    'common',
    'map'
  ])
  const isMobile = useIsMobile()

  const iframeCode = `<iframe
  src="${baseUrl}/map?latitude=49.1167524834301&longitude=6.173963072333283&radius=1000"
  height="400px"
  width="700px"
  style="border: none;"
/>`

  const iframeParams: Parameter[] = [
    {
      name: 'src',
      description: t('pages:integration.iframe_parameters.src')
    },
    {
      name: 'height',
      description: t('pages:integration.iframe_parameters.height')
    },
    {
      name: 'width',
      description: t('pages:integration.iframe_parameters.width')
    }
  ]

  const urlParams: Parameter[] = [
    {
      name: 'latitude',
      description: t('pages:integration.url_parameters.latitude')
    },
    {
      name: 'longitude',
      description: t('pages:integration.url_parameters.longitude')
    },
    {
      name: 'radius',
      description: t('pages:integration.url_parameters.radius')
    }
  ]

  return (
    <MainLayout>
      <PageTitle title={[t('common:integration'), t('map:the_map')]} />

      <Container maxWidth="md">
        <Typography variant="h1" mb={4}>
          {t('pages:integration.title')}
        </Typography>

        <Typography my={2}>
          {t('pages:integration.description')}
        </Typography>

        <Paper sx={{
          overflowX: 'auto', backgroundColor: 'black', p: 1, color: 'white', fontSize: '0.8rem'
        }}>
          <pre><code>{iframeCode}</code></pre>
        </Paper>

        <Typography my={2}>
          <span dangerouslySetInnerHTML={{ __html: t('pages:integration.map_description') }} />
        </Typography>

        <iframe
          src={`${baseUrl}/map?radius=1000&latitude=49.1167524834301&longitude=6.173963072333283`}
          height="400px"
          width={isMobile ? '300px' : '700px'}
          style={{ border: 'none' }}
        />

        <Divider sx={{ my: 4 }}/>

        <Typography variant='h2' id="iframeParams">
          {t('pages:integration.iframe_parameters.title')}
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('common:parameter')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('common:description')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {iframeParams.map(iframeParam => {
                return (
                  <TableRow
                    key={iframeParam.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell><code className='code'>{iframeParam.name}</code></TableCell>
                    <TableCell dangerouslySetInnerHTML={{ __html: iframeParam.description }} />
                  </TableRow>)
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 4 }}/>

        <Typography variant='h2' id="urlParams" mb={2}>
          {t('pages:integration.url_parameters.title')}
        </Typography>

        <Typography>
          <span dangerouslySetInnerHTML={{ __html: t('pages:integration.url_description') }} />
        </Typography>

        <Typography className="code" sx={{ my: 2, display: 'inline-block' }}>
          <Typography component="span">{baseUrl}/map?</Typography>
          <Typography color="warning.main" fontWeight="bold" component="span">latitude=$latitude</Typography>
          <Typography component="span">&</Typography>
          <Typography color="warning.main" fontWeight="bold" component="span">longitude=$longitude</Typography>
          <Typography component="span">&</Typography>
          <Typography color="warning.main" fontWeight="bold" component="span">radius=$radius</Typography>
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('common:parameter')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('common:description')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urlParams.map(urlParam => {
                return (
                  <TableRow
                    key={urlParam.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell><code className='code'>{urlParam.name}</code></TableCell>
                    <TableCell dangerouslySetInnerHTML={{ __html: urlParam.description }} />
                  </TableRow>)
              })}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
    </MainLayout>
  )
}

export default IntegrationPage
