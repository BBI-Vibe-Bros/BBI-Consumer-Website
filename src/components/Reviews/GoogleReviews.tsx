import React, { useEffect, useState } from 'react';
import { Star, User, Smile } from 'lucide-react';
import GooglePlacesService from '@/services/googlePlacesService';

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

const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overallRating, setOverallRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const placesService = GooglePlacesService.getInstance();
        const data = await placesService.getPlaceReviews();
        
        setReviews(data.reviews);
        setOverallRating(data.rating);
        setTotalReviews(data.user_ratings_total);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const ProfileImage = ({ photoUrl, name }: { photoUrl: string; name: string }) => {
    const [imgError, setImgError] = useState(false);

    if (imgError || !photoUrl) {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bb-blue/10 to-bb-blue/5 flex items-center justify-center border border-bb-blue/20">
          <Smile className="w-6 h-6 text-bb-blue" />
        </div>
      );
    }

    return (
      <img
        src={photoUrl}
        alt={`${name}'s profile`}
        className="w-12 h-12 rounded-full object-cover"
        onError={() => setImgError(true)}
      />
    );
  };

  const getRatingMessage = (rating: number) => {
    if (rating >= 4.8) return "Outstanding!";
    if (rating >= 4.5) return "Excellent!";
    if (rating >= 4.0) return "Great!";
    return "Good!";
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overall Rating Summary */}
      <div className="bg-gradient-to-br from-bb-blue/5 to-white rounded-xl shadow-sm p-8 text-center max-w-3xl mx-auto border border-bb-blue/10">
        <div className="flex justify-center mb-4">
          {renderStars(overallRating)}
        </div>
        <h3 className="text-4xl font-bold text-gray-900 mb-2">
          {overallRating.toFixed(1)} out of 5
        </h3>
        <p className="text-2xl font-semibold text-bb-blue mb-3">
          {getRatingMessage(overallRating)}
        </p>
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <span className="text-lg">Based on</span>
          <span className="text-2xl font-bold text-gray-900">{totalReviews}</span>
          <span className="text-lg">verified reviews</span>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Our clients love working with us! Read their experiences below.
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.time}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 flex flex-col"
          >
            <div className="flex items-center space-x-4 mb-4">
              <ProfileImage photoUrl={review.profile_photo_url} name={review.author_name} />
              <div>
                <h4 className="font-semibold text-gray-900">
                  {review.author_name}
                </h4>
                <p className="text-sm text-gray-500">
                  {review.relative_time_description}
                </p>
              </div>
            </div>
            <div className="flex mb-3">
              {renderStars(review.rating)}
            </div>
            <p className="text-gray-700 line-clamp-4 flex-grow">{review.text}</p>
            <a
              href={review.author_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bb-blue hover:text-bb-dark-blue text-sm font-medium mt-4 inline-block"
            >
              Read full review
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleReviews; 