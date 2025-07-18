"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import TopSection from "../components/TopSection"
import CTASection from "../components/CTASection"
import { motion } from "framer-motion"
import Lightbox from "../components/LightBox"

const Gallery1 = () => {
  const [allImages, setAllImages] = useState([])
  const [galleryData, setGalleryData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  
  const galleryRef = useRef(null)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchGalleries = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`${API_BASE_URL}/api/galleries`)
        const galleries = res.data.galleries || []
        
        setGalleryData(galleries)

        // Extract all images without category information
        const images = galleries.flatMap((gallery) =>
          gallery.images.map((img) => ({
            url: img,
            title: gallery.title || "Gallery Image",
          }))
        )
        setAllImages(images)
        
        setError(null)
      } catch (err) {
        console.error("Error fetching galleries:", err)
        setError("Failed to load gallery images. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleries()
  }, [API_BASE_URL])

  // Always show all images without filtering
  const displayedImages = allImages

  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.classList.add("lightbox-active")
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.classList.remove("lightbox-active")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  }

  return (
    <>
      <TopSection 
        heading1="Our Gallery" 
        heading2="Explore our portfolio of construction and design projects" 
      />

      {/* Gallery Grid - Simplified */}
      <section ref={galleryRef} className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-48 sm:h-64">
              <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-red-900"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 sm:p-6 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-base sm:text-lg font-medium mb-2">Error</h3>
              <p className="text-sm sm:text-base">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Try Again
              </button>
            </div>
          ) : displayedImages.length === 0 ? (
            <div className="text-center py-8 sm:py-16">
              <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">No images found</h3>
              <p className="text-sm sm:text-base text-gray-500">No images available in the gallery.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {displayedImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="group overflow-hidden rounded-lg shadow-md cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  onClick={() => openLightbox(index)}
                  variants={item}
                >
                  <div className="relative h-40 xs:h-48 sm:h-56 md:h-64">
                    <img
                      src={`${API_BASE_URL}/uploads/${image.url}`}
                      alt={`Gallery Image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-3 sm:p-4 w-full">
                        {/* Image title can be shown here if needed */}
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-red-800 bg-opacity-70 rounded-full p-1.5 sm:p-2 md:p-3 transform transition-transform duration-300 group-hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery Stats - Simplified */}
      {!isLoading && !error && galleryData.length > 0 && (
        <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-800 mb-1 sm:mb-2">
                    {galleryData.length}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">Gallery Collections</p>
                </div>
                <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-800 mb-1 sm:mb-2">
                    {allImages.length}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">Total Images</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={allImages.map((img) => img.url)}
          initialIndex={currentImageIndex}
          onClose={closeLightbox}
          apiBaseUrl={API_BASE_URL}
        />
      )}

      <CTASection />
    </>
  )
}

export default Gallery1