import React, { useState, useEffect, useCallback } from "react"

const Lightbox = ({ images, initialIndex, onClose, apiBaseUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isLoading, setIsLoading] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const totalImages = images.length

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1))
    setIsLoading(true)
  }, [totalImages])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1))
    setIsLoading(true)
  }, [totalImages])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      } else if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [goToPrevious, goToNext, onClose])

  // Prevent body scrolling when lightbox is open and add lightbox-active class
  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.body.classList.add("lightbox-active")

    return () => {
      document.body.style.overflow = "auto"
      document.body.classList.remove("lightbox-active")
    }
  }, [])

  // Handle touch events for swiping on mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }
  }

  // Get previous, current, and next image indexes
  const prevIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1
  const nextIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button - Improved for mobile */}
      <button
        onClick={onClose}
        className="absolute top-2 sm:top-4 right-2 sm:right-4 z-50 text-white bg-red-800 rounded-full p-1.5 sm:p-2 hover:bg-red-700 transition-colors"
        aria-label="Close lightbox"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image counter - Improved for mobile */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-white bg-black bg-opacity-50 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
        {currentIndex + 1} / {totalImages}
      </div>

      {/* Main lightbox content */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Previous image (left side) - Hidden on mobile */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/5 hidden md:flex items-center justify-start pl-4 cursor-pointer opacity-50 hover:opacity-80 transition-opacity"
          onClick={goToPrevious}
        >
          <div className="relative h-3/5 w-full overflow-hidden">
            <img
              src={`${apiBaseUrl}/uploads/${images[prevIndex]}`}
              alt="Previous"
              className="w-full h-full object-cover rounded-lg opacity-60 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-50 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Current image (center) - Improved for mobile */}
        <div className="w-full md:w-3/5 h-full md:h-4/5 flex items-center justify-center px-2 sm:px-4">
          <div className="relative w-full h-full flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-16 sm:w-16 border-t-4 border-b-4 border-white"></div>
              </div>
            )}
            <img
              src={`${apiBaseUrl}/uploads/${images[currentIndex]}`}
              alt={`Gallery image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>

        {/* Next image (right side) - Hidden on mobile */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/5 hidden md:flex items-center justify-end pr-4 cursor-pointer opacity-50 hover:opacity-80 transition-opacity"
          onClick={goToNext}
        >
          <div className="relative h-3/5 w-full overflow-hidden">
            <img
              src={`${apiBaseUrl}/uploads/${images[nextIndex]}`}
              alt="Next"
              className="w-full h-full object-cover rounded-lg opacity-60 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-50 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows for mobile - Enhanced for better visibility */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 rounded-full p-2 text-white hover:bg-opacity-80 transition-opacity md:hidden"
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 rounded-full p-2 text-white hover:bg-opacity-80 transition-opacity md:hidden"
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Swipe instruction for mobile */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-white text-xs opacity-70 md:hidden">
          Swipe left or right to navigate
        </div>
      </div>
    </div>
  )
};

export default Lightbox;