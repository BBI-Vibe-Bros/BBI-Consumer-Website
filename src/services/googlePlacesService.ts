import axios from 'axios';

interface Review {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface PlaceDetails {
  name: string;
  rating: number;
  reviews: Review[];
  user_ratings_total: number;
}

class GooglePlacesService {
  private static instance: GooglePlacesService;
  private readonly placeId: string = 'ChIJNQ3iDiBMh4gRcWsH39hKHp4';
  private placesService: google.maps.places.PlacesService | null = null;

  private constructor() {
    // Initialize the Places service when the Google Maps script loads
    if (window.google && window.google.maps) {
      this.placesService = new google.maps.places.PlacesService(
        document.createElement('div')
      );
    }
  }

  public static getInstance(): GooglePlacesService {
    if (!GooglePlacesService.instance) {
      GooglePlacesService.instance = new GooglePlacesService();
    }
    return GooglePlacesService.instance;
  }

  async getPlaceReviews(): Promise<PlaceDetails> {
    return new Promise((resolve, reject) => {
      if (!this.placesService) {
        reject(new Error('Places service not initialized'));
        return;
      }

      const request = {
        placeId: this.placeId,
        fields: ['name', 'rating', 'reviews', 'user_ratings_total']
      };

      this.placesService.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          resolve({
            name: place.name || '',
            rating: place.rating || 0,
            reviews: place.reviews || [],
            user_ratings_total: place.user_ratings_total || 0
          });
        } else {
          reject(new Error('Failed to fetch place details'));
        }
      });
    });
  }
}

export default GooglePlacesService; 