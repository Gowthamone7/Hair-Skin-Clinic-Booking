import React, { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle, Plus } from 'lucide-react';
import { PatientReview } from '../types';
import { api } from '../services/api';

interface ReviewsSectionProps {
  reviews: PatientReview[];
  onReviewAdded?: (newReview: PatientReview) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onReviewAdded
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Mysuru');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setSubmitting(true);
    try {
      const created = await api.addReview({
        patientName: name.trim(),
        location: location.trim() || 'Mysuru',
        rating,
        comment: comment.trim()
      });
      if (onReviewAdded) onReviewAdded(created);
      setSubmitted(true);
      setTimeout(() => {
        setShowAddModal(false);
        setSubmitted(false);
        setName('');
        setComment('');
      }, 1800);
    } catch {
      alert('Could not submit feedback at this moment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#FAF9F5] border-t border-[#E6E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Rating Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#2A5E50]">
              <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
              <span>PATIENT EXPERIENCES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#141F1A] leading-tight tracking-[-0.01em]">
              What Our Patients Say
            </h2>
            <p className="text-sm sm:text-base text-[#52605A] mt-2 max-w-xl">
              Authentic patient feedback regarding consultation clarity, clinical hygiene, and dermatological care in Vijayanagar, Mysuru.
            </p>
          </div>

          {/* Social Proof Aggregate Badge */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-[#F4F2EB] border border-[#E6E4DC] self-start md:self-auto">
            <div className="flex flex-col items-center">
              <span className="font-serif text-3xl font-bold text-[#141F1A] tabular-nums">4.9</span>
              <div className="flex text-amber-500 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="border-l border-[#DCD9CE] pl-4 text-xs">
              <div className="font-semibold text-[#141F1A]">400+ Public Reviews</div>
              <div className="text-[#64726C]">Consistently Rated Clinic</div>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-1 text-[11px] font-medium text-[#2A5E50] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Write Feedback</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((rev) => (
            <div
              key={rev.id}
              className="p-7 rounded-lg bg-[#F7F5EE]/70 border border-[#E6E4DC] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {/* Clean unboxed metadata separator */}
                  <div className="text-xs text-[#7A8782]">
                    <span>{rev.date}</span>
                  </div>
                </div>

                <p className="text-sm text-[#3E4A44] leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E6DF] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#141F1A]">
                    {rev.patientName}
                  </h4>
                  <p className="text-[11px] text-[#6E7B75]">
                    {rev.location}
                  </p>
                </div>
                {rev.verified && (
                  <div className="flex items-center gap-1 text-[11px] text-[#2A5E50] font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Visit</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for adding patient feedback */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="bg-[#FAF9F5] border border-[#E6E4DC] rounded-lg max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
              <h3 className="font-serif text-2xl text-[#141F1A] mb-1">
                Share Your Experience
              </h3>
              <p className="text-xs text-[#52605A] mb-5">
                We value honest patient perspectives to continually refine our care.
              </p>

              {submitted ? (
                <div className="py-8 text-center text-[#2A5E50]">
                  <CheckCircle className="w-10 h-10 mx-auto mb-2" />
                  <p className="font-semibold text-sm">Thank you for your feedback!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#24302A] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Sharma"
                      className="w-full px-3 py-2 text-xs rounded border border-[#D5D2C7] bg-white focus:outline-none focus:border-[#2A5E50]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24302A] mb-1">
                      Area / City
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Vijayanagar, Mysuru"
                      className="w-full px-3 py-2 text-xs rounded border border-[#D5D2C7] bg-white focus:outline-none focus:border-[#2A5E50]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24302A] mb-1">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 cursor-pointer focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-neutral-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24302A] mb-1">
                      Your Comments / Experience *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Describe the doctor's explanation, cleanliness, or consultation..."
                      className="w-full px-3 py-2 text-xs rounded border border-[#D5D2C7] bg-white focus:outline-none focus:border-[#2A5E50]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6E4DC]">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-xs font-medium text-[#52605A]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2 text-xs font-semibold text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded uppercase tracking-wider"
                    >
                      {submitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
