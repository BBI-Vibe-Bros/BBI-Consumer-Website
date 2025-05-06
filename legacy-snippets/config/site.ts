export const SITE_CONFIG = {
  name: 'Bobby Brock Insurance',
  url: 'https://tupelomedicareconnect.com',
  description: 'Your trusted source for Medicare information and guidance in Tupelo, MS',
  defaultLocale: 'en-US',
  social: {
    facebook: 'https://facebook.com/tupelomedicareconnect',
    twitter: 'https://twitter.com/tupelomedicare',
    linkedin: 'https://linkedin.com/company/tupelomedicareconnect',
  },
  contact: {
    phone: '(662) 123-4567',
    email: 'info@tupelomedicareconnect.com',
    address: {
      street: '123 Main Street',
      city: 'Tupelo',
      state: 'MS',
      zip: '38801',
    },
  },
  businessHours: {
    monday: '9:00 AM - 5:00 PM',
    tuesday: '9:00 AM - 5:00 PM',
    wednesday: '9:00 AM - 5:00 PM',
    thursday: '9:00 AM - 5:00 PM',
    friday: '9:00 AM - 5:00 PM',
    saturday: 'Closed',
    sunday: 'Closed',
  },
} as const; 