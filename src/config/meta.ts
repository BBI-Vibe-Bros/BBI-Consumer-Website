export const metaConfig = {
  title: {
    template: '%s | Bobby Brock Insurance',
    default: 'Medicare Insurance Plans & Coverage | Bobby Brock Insurance'
  },
  description: {
    default: 'Expert Medicare insurance guidance and plan selection in Tupelo, MS. Compare Medicare Advantage, Supplement, and Part D plans.'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    site_name: 'Bobby Brock Insurance',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bobby Brock Insurance'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BobbyBrockIns',
    creator: '@BobbyBrockIns'
  }
};

export type MetaConfig = typeof metaConfig; 