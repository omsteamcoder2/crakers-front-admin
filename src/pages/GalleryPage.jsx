"use client"

import { useState } from "react"
import CTASection from "../components/CTASection"
import TopSection from "../components/TopSection"

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState(null)

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "residential", name: "Residential" },
    { id: "commercial", name: "Commercial" },
    { id: "industrial", name: "Industrial" },
    { id: "interior", name: "Interior Design" },
  ]

  const projects = [
    {
      id: 1,
      title: "Modern Villa",
      category: "residential",
      description: "Luxury villa with modern architecture and premium finishes.",
      location: "Chennai, Tamil Nadu",
      year: "2022",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    },
    {
      id: 2,
      title: "Office Complex",
      category: "commercial",
      description: "Modern office complex with open workspaces and collaborative areas.",
      location: "Coimbatore, Tamil Nadu",
      year: "2021",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 3,
      title: "Manufacturing Plant",
      category: "industrial",
      description: "State-of-the-art manufacturing facility with advanced infrastructure.",
      location: "Madurai, Tamil Nadu",
      year: "2020",
      image:
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80",
    },
    {
      id: 4,
      title: "Luxury Apartment",
      category: "residential",
      description: "High-end apartment complex with premium amenities and finishes.",
      location: "Chennai, Tamil Nadu",
      year: "2021",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 5,
      title: "Shopping Mall",
      category: "commercial",
      description: "Modern shopping mall with retail spaces, food court, and entertainment areas.",
      location: "Salem, Tamil Nadu",
      year: "2019",
      image:
        "https://images.unsplash.com/photo-1581112877490-facb4fc326dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 6,
      title: "Warehouse Facility",
      category: "industrial",
      description: "Large-scale warehouse with modern logistics infrastructure.",
      location: "Trichy, Tamil Nadu",
      year: "2020",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 7,
      title: "Modern Kitchen Design",
      category: "interior",
      description: "Contemporary kitchen with premium appliances and custom cabinetry.",
      location: "Chennai, Tamil Nadu",
      year: "2022",
      image:
        "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 8,
      title: "Luxury Bathroom",
      category: "interior",
      description: "Spa-like bathroom with high-end fixtures and premium materials.",
      location: "Coimbatore, Tamil Nadu",
      year: "2021",
      image:
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 9,
      title: "Corporate Headquarters",
      category: "commercial",
      description: "Modern corporate headquarters with innovative design and sustainable features.",
      location: "Chennai, Tamil Nadu",
      year: "2020",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    },
    {
      id: 10,
      title: "Beachfront Villa",
      category: "residential",
      description: "Luxury beachfront villa with panoramic ocean views and premium amenities.",
      location: "Pondicherry",
      year: "2019",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 11,
      title: "Food Processing Plant",
      category: "industrial",
      description: "State-of-the-art food processing facility with advanced equipment and clean room technology.",
      location: "Erode, Tamil Nadu",
      year: "2021",
      image:
        "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 12,
      title: "Modern Living Room",
      category: "interior",
      description: "Contemporary living room design with custom furniture and premium finishes.",
      location: "Chennai, Tamil Nadu",
      year: "2022",
      image:
        "https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  const openLightbox = (project) => {
    setSelectedImage(project)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <TopSection heading1={"Our Project Gallery"} heading2={"Explore our portfolio of completed construction projects"} />


      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
            <div className="w-20 h-1 bg-red-800 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">Browse through our portfolio of successful construction projects</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-red-800 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                onClick={() => openLightbox(project)}
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 capitalize">{project.category}</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {project.location} | {project.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div
            className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-red-800 text-white rounded-full p-2 z-10"
              onClick={closeLightbox}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="md:w-2/3">
              <img
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-1/3 p-6 overflow-y-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
              <p className="text-red-800 font-medium capitalize mb-4">{selectedImage.category}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Description</h4>
                  <p className="text-gray-600">{selectedImage.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Location</h4>
                  <p className="text-gray-600">{selectedImage.location}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Year Completed</h4>
                  <p className="text-gray-600">{selectedImage.year}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <CTASection />
    </>
  )
}

export default GalleryPage
