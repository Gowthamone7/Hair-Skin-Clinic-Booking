import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { clinicImages } from '../assets';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Clinic' | 'Consultation' | 'Treatment' | 'Facilities';
  image: string;
  caption: string;
}

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Consultation Suite',
      category: 'Consultation',
      image: clinicImages.hero,
      caption: 'Quiet, private medical consultation room designed for patient comfort and thorough diagnostic dialogue.'
    },
    {
      id: 'g-2',
      title: 'Reception & Waiting Lounge',
      category: 'Clinic',
      image: clinicImages.reception,
      caption: 'Calm and spacious reception area on Kalidasa Road, Vijayanagar 1st Stage, Mysuru.'
    },
    {
      id: 'g-3',
      title: 'Clinical Procedure Room',
      category: 'Treatment',
      image: clinicImages.treatmentRoom,
      caption: 'Sterile procedure setting equipped for dermatological treatments and examinations.'
    },
    {
      id: 'g-4',
      title: 'Trichology & Scalp Unit',
      category: 'Treatment',
      image: clinicImages.hairScalpSuite,
      caption: 'Dedicated station for clinical scalp examinations and hair care evaluations.'
    },
    {
      id: 'g-5',
      title: 'Doctor Workstation',
      category: 'Consultation',
      image: clinicImages.consultationDesk,
      caption: 'Organized clinical desk where diagnoses and personalized skincare protocols are reviewed.'
    }
  ];

  const filteredItems = activeTab === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category.toLowerCase() === activeTab.toLowerCase());

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FAF9F5] border-t border-[#E6E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Category Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#2A5E50]">
              <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
              <span>CLINIC ENVIRONMENT</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#141F1A] leading-tight tracking-[-0.01em]">
              Inside the Clinic
            </h2>
            <p className="text-sm sm:text-base text-[#52605A] mt-2 max-w-lg">
              Explore our modern facilities, consultation suites, and hygienic procedure environments located in Vijayanagar 1st Stage, Mysuru.
            </p>
          </div>

          {/* Clean Segmented Filter */}
          <div className="flex items-center gap-1 p-1 bg-[#EBE8DF] rounded-md self-start sm:self-auto overflow-x-auto">
            {['All', 'Clinic', 'Consultation', 'Treatment'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.toLowerCase()
                    ? 'bg-white text-[#141F1A] shadow-xs'
                    : 'text-[#586660] hover:text-[#141F1A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer rounded-lg overflow-hidden border border-[#E6E4DC] bg-[#EAE8E0] relative aspect-[4/3]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 text-[#141F1A] flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                <div className="text-[11px] font-medium text-emerald-300 uppercase tracking-wider">
                  {item.category}
                </div>
                <h4 className="font-serif text-lg leading-tight mt-0.5">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Medical disclaimer regarding clinic and any photographic displays */}
        <p className="mt-8 text-xs text-[#707E78] text-center max-w-2xl mx-auto">
          All images reflect our real clinical consultation and procedure environments in Mysuru. Individual clinical treatments are conducted following personal medical evaluation.
        </p>

        {/* Lightbox Modal */}
        {activeImageIndex !== null && filteredItems[activeImageIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm animate-in fade-in duration-150">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Close image lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
              <img
                src={filteredItems[activeImageIndex].image}
                alt={filteredItems[activeImageIndex].title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-md shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="text-center mt-4 text-white max-w-lg">
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                  {filteredItems[activeImageIndex].category}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl mt-0.5">
                  {filteredItems[activeImageIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                  {filteredItems[activeImageIndex].caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
