import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from 'lucide-react';
import { HOTEL_GALLERY } from '../hotelConfig';
import { GalleryPhoto } from '../types';

/* ==========================================================================
   GALLERY COMPONENT
   Admin note: Replace these placeholder images with actual hotel photographs.
   Photos can be updated directly in src/hotelConfig.ts (HOTEL_GALLERY array).
   ========================================================================== */

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'bathroom', label: 'Bathroom' },
    { id: 'exterior', label: 'Exterior' },
    { id: 'reception', label: 'Reception' },
    { id: 'common', label: 'Common Area' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? HOTEL_GALLERY
    : HOTEL_GALLERY.filter((photo) => photo.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
            Visual Tour
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Hotel Gallery & Photos
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Take a look inside our 16 AC rooms, bathrooms, corridors, and reception in Rohini Sector-25.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`gallery-filter-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              id={`gallery-item-${photo.id}`}
              onClick={() => openLightbox(index)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-slate-800 border border-slate-700/80 shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={photo.imageUrl}
                alt={photo.altText}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              
              {/* Category Pill Tag */}
              <div className="absolute top-3 left-3">
                <span className="bg-slate-900/80 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-slate-700">
                  {photo.category}
                </span>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-500 text-slate-950 p-2 rounded-lg shadow">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-medium text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Real photo notice pill in gallery */}
        <div className="mt-8 text-center text-xs text-slate-400">
          ✨ Verified hotel photos of New Amazing House in Rohini Sector-25, Delhi (16 AC Rooms, Reception & Floor Corridors).
        </div>

      </div>

      {/* Lightbox / Fullscreen Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Modal Container */}
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90 text-white">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider mr-2">
                  {filteredPhotos[lightboxIndex].category}
                </span>
                <span className="text-sm font-semibold text-white">
                  {filteredPhotos[lightboxIndex].title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  {lightboxIndex + 1} of {filteredPhotos.length}
                </span>
                <button
                  id="close-lightbox-btn"
                  onClick={closeLightbox}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Main Image */}
            <div className="relative h-[60vh] sm:h-[70vh] bg-black flex items-center justify-center">
              <img
                src={filteredPhotos[lightboxIndex].imageUrl}
                alt={filteredPhotos[lightboxIndex].altText}
                className="max-h-full max-w-full object-contain"
              />

              {/* Nav Arrows */}
              <button
                id="lightbox-prev-btn"
                onClick={prevLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                id="lightbox-next-btn"
                onClick={nextLightbox}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption bar */}
            <div className="p-3 bg-slate-900 text-center text-xs text-slate-400 border-t border-slate-800">
              {filteredPhotos[lightboxIndex].altText}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
