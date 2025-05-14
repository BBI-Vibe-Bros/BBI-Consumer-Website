export const SITE_CONFIG = {
  name: 'Bobby Brock Insurance',
  url: 'https://www.bobbybrockinsurance.com',
  description: 'Your trusted source for Medicare information and guidance in Tupelo, MS',
  defaultLocale: 'en-US',
  social: {
    facebook: 'https://www.facebook.com/bobbybrockinsurance',
    twitter: 'https://twitter.com/BobbyBrockIns',
    linkedin: 'https://linkedin.com/company/bobbybrockinsurance',
  },
  contact: {
    phone: '(662) 642-1512',
    email: 'info@bobbybrockinsurance.com',
    address: {
      street: '499 Air Park Rd',
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