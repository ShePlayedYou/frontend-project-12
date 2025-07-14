import { useTranslation } from 'react-i18next'

const BuildP404Page = () => {
  const { t } = useTranslation()
  return (
    <div className="text-center">
      <img alt={t('page404.pageNotFound')} className="img-fluid" style={{ maxHeight: '300px' }} src="/imgs/Page404.svg" />
      <h1 className="h4 text-muted">{t('page404.pageNotFound')}</h1>
      <p className="text-muted">
        {t('page404.redirectHint')}
        {' '}
        <a href="/">{t('page404.redirectHintLink')}</a>
      </p>
    </div>
  )
}

export const Page404 = () => BuildP404Page()
