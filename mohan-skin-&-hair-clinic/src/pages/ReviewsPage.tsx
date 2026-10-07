import React from 'react';
import { ReviewsSection } from '../components/ReviewsSection';
import { PatientReview } from '../types';

interface ReviewsPageProps {
  reviews: PatientReview[];
  onReviewAdded: (newReview: PatientReview) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  reviews,
  onReviewAdded
}) => {
  return (
    <div className="pt-24 pb-20 bg-[#FAF9F5]">
      {/* Top Banner */}
      <div className="border-b border-[#E6E4DC] bg-[#F7F5EE] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#2A5E50]">
              <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
              <span>TESTIMONIALS & TRUST</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141F1A] leading-tight mb-4 tracking-[-0.01em]">
              Patient Experiences & Feedback
            </h1>
            <p className="text-base sm:text-lg text-[#4E5C56] leading-relaxed">
              Rated 4.9/5 across 400+ public reviews in Mysuru. Read verified patient thoughts on our diagnostic thoroughness, clinic hygiene, and ethical communication.
            </p>
          </div>
        </div>
      </div>

      <ReviewsSection reviews={reviews} onReviewAdded={onReviewAdded} />
    </div>
  );
};
