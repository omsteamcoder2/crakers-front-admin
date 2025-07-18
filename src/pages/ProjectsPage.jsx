"use client"

import { useState } from "react"
import CTASection from "../components/CTASection"
import TopSection from "../components/TopSection"

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all")

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
      description:
        "A luxurious modern villa featuring 5 bedrooms, 6 bathrooms, a swimming pool, and a home theater. Built with premium materials and energy-efficient systems.",
      location: "Chennai, Tamil Nadu",
      year: "2022",
      client: "Private Owner",
      area: "4,500 sq.ft",
      cost: "₹1.8 Crore",
      features: [
        "Contemporary architecture",
        "Smart home automation",
        "Solar power integration",
        "Rainwater harvesting",
        "Landscaped gardens",
      ],
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1153&q=80",
      ],
    },
    {
      id: 2,
      title: "Office Complex",
      category: "commercial",
      description:
        "A modern office complex with 10 floors, featuring open workspaces, meeting rooms, and collaborative areas. Designed for optimal productivity and employee well-being.",
      location: "Coimbatore, Tamil Nadu",
      year: "2021",
      client: "Tech Solutions Ltd.",
      area: "25,000 sq.ft",
      cost: "₹12 Crore",
      features: [
        "LEED Gold certified",
        "Floor-to-ceiling windows",
        "Rooftop garden",
        "EV charging stations",
        "Advanced security systems",
      ],
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      ],
    },
    {
      id: 3,
      title: "Manufacturing Plant",
      category: "industrial",
      description:
        "A state-of-the-art manufacturing facility with advanced infrastructure, designed for efficient production and worker safety. Features include automated systems and sustainable design elements.",
      location: "Madurai, Tamil Nadu",
      year: "2020",
      client: "Industrial Innovations Pvt. Ltd.",
      area: "40,000 sq.ft",
      cost: "₹18 Crore",
      features: [
        "Automated production lines",
        "Energy-efficient lighting",
        "Waste management systems",
        "Employee wellness areas",
        "Advanced ventilation systems",
      ],
      images: [
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1533630018502-93712bf9a307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      ],
    },
    {
      id: 4,
      title: "Luxury Apartment Complex",
      category: "residential",
      description:
        "A high-end apartment complex featuring 50 units with premium amenities including a swimming pool, fitness center, and landscaped gardens. Built with a focus on luxury and comfort.",
      location: "Chennai, Tamil Nadu",
      year: "2021",
      client: "Urban Living Developers",
      area: "75,000 sq.ft",
      cost: "₹35 Crore",
      features: [
        "24/7 security",
        "Clubhouse with entertainment facilities",
        "Children's play area",
        "Underground parking",
        "Rooftop garden with BBQ area",
      ],
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      ],
    },
    {
      id: 5,
      title: "Shopping Mall",
      category: "commercial",
      description:
        "A modern shopping mall with retail spaces, food court, and entertainment areas. Designed to provide an exceptional shopping experience with a focus on accessibility and comfort.",
      location: "Salem, Tamil Nadu",
      year: "2019",
      client: "Retail Ventures Ltd.",
      area: "100,000 sq.ft",
      cost: "₹45 Crore",
      features: [
        "Multi-level parking",
        "Food court with international cuisines",
        "Cinema multiplex",
        "Children's play area",
        "Central air conditioning",
      ],
      images: [
        "https://images.unsplash.com/photo-1581112877490-facb4fc326dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1567449303078-57ad995bd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      ],
    },
    {
      id: 6,
      title: "Warehouse Facility",
      category: "industrial",
      description:
        "A large-scale warehouse with modern logistics infrastructure, designed for efficient storage and distribution. Features include advanced inventory management systems and sustainable design elements.",
      location: "Trichy, Tamil Nadu",
      year: "2020",
      client: "Logistics Solutions Inc.",
      area: "60,000 sq.ft",
      cost: "₹22 Crore",
      features: [
        "High-bay racking systems",
        "Loading docks with levelers",
        "RFID-enabled inventory tracking",
        "Solar-powered lighting",
        "Fire suppression systems",
      ],
      images: [
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1553413077-0cc2a3cc5d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      ],
    },
    {
      id: 7,
      title: "Modern Kitchen Design",
      category: "interior",
      description:
        "A contemporary kitchen renovation featuring premium appliances, custom cabinetry, and high-end finishes. Designed for both functionality and aesthetic appeal.",
      location: "Chennai, Tamil Nadu",
      year: "2022",
      client: "Private Residence",
      area: "400 sq.ft",
      cost: "₹18 Lakh",
      features: [
        "Custom cabinetry",
        "Quartz countertops",
        "Energy-efficient appliances",
        "LED lighting",
        "Smart kitchen technology",
      ],
      images: [
        "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1600607687644-a59a4789a0d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      ],
    },
    {
      id: 8,
      title: "Luxury Bathroom",
      category: "interior",
      description:
        "A spa-like bathroom renovation featuring high-end fixtures, premium materials, and a focus on relaxation and comfort. Includes custom tilework and ambient lighting.",
      location: "Coimbatore, Tamil Nadu",
      year: "2021",
      client: "Private Residence",
      area: "150 sq.ft",
      cost: "₹12 Lakh",
      features: [
        "Rainfall shower system",
        "Freestanding soaking tub",
        "Heated flooring",
        "Custom vanity",
        "Smart mirrors with LED lighting",
      ],
      images: [
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      ],
    },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <>
    <TopSection heading1={"Our Projects"} heading2="Explore our portfolio of successful construction and design projects" />

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-red-800 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              Browse through our portfolio of completed construction projects across Tamil Nadu
            </p>
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

          <div className="space-y-24">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-80 md:h-auto">
                    <div className="absolute inset-0 bg-black/50 md:hidden flex items-center justify-center">
                      <h3 className="text-2xl font-bold text-white px-4 text-center">{project.title}</h3>
                    </div>
                    <img
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{project.title}</h3>
                      <p className="text-red-800 font-medium capitalize">{project.category}</p>
                    </div>

                    <p className="text-gray-600">{project.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{project.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-medium">{project.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Client</p>
                        <p className="font-medium">{project.client}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Area</p>
                        <p className="font-medium">{project.area}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Project Cost</p>
                        <p className="font-medium">{project.cost}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Features</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-red-800 mr-2 mt-0.5 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Project Gallery</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {project.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Image ${idx + 1}`}
                        className="w-full h-40 object-cover rounded-lg shadow-md hover:opacity-90 transition-opacity"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  )
}

export default ProjectsPage
