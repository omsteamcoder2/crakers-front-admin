import { Link } from "react-router-dom"
import CTASection from "../components/CTASection"
import TopSection from "../components/TopSection"

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "New Building Construction",
      description:
        "We offer comprehensive building construction services for residential, commercial, and industrial projects. Our team handles everything from initial planning to final finishing touches, ensuring high-quality results that meet your specifications and budget.",
      features: [
        "Residential homes and apartments",
        "Commercial buildings and offices",
        "Industrial facilities and warehouses",
        "Institutional buildings",
        "Custom design-build solutions",
      ],
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      icon: (
        <svg
          className="w-12 h-12 text-red-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          ></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Renovation and Remodeling",
      description:
        "Transform your existing space with our expert renovation and remodeling services. Whether you're looking to update a single room or completely revamp your entire property, our skilled team can bring your vision to life.",
      features: [
        "Kitchen and bathroom remodeling",
        "Home additions and extensions",
        "Commercial space renovations",
        "Historic building restoration",
        "Energy-efficient upgrades",
      ],
      image:
        "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      icon: (
        <svg
          className="w-12 h-12 text-red-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          ></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Site Preparation and Excavation",
      description:
        "Our site preparation and excavation services ensure your construction project starts on solid ground. We handle everything from clearing and grading to excavation and foundation preparation with precision and care.",
      features: [
        "Land clearing and grubbing",
        "Site grading and leveling",
        "Excavation for foundations",
        "Trenching for utilities",
        "Erosion control measures",
      ],
      image:
        "https://images.unsplash.com/photo-1581094488379-6a10d04c0f04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      icon: (
        <svg
          className="w-12 h-12 text-red-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Foundation and Structural Work",
      description:
        "We specialize in creating strong, durable foundations and structural systems that ensure the longevity and safety of your building. Our experienced team uses quality materials and proven techniques for optimal results.",
      features: [
        "Concrete foundation installation",
        "Steel structural framing",
        "Reinforced concrete structures",
        "Structural repairs and retrofitting",
        "Seismic upgrades and reinforcements",
      ],
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      icon: (
        <svg
          className="w-12 h-12 text-red-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
          ></path>
        </svg>
      ),
    },
    {
      id: 5,
      title: "Electrical Installation",
      description:
        "Our electrical installation services cover all aspects of electrical systems for residential, commercial, and industrial buildings. We ensure safe, efficient, and code-compliant electrical solutions tailored to your needs.",
      features: [
        "Complete wiring systems",
        "Lighting design and installation",
        "Panel upgrades and circuit installation",
        "Generator installation",
        "Smart home electrical systems",
      ],
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      icon: (
        <svg
          className="w-12 h-12 text-red-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
    },
    {
      id: 6,
      title: "Interior Design and Finishing",
      description:
        "Elevate your space with our interior design and finishing services. Our team combines creativity with technical expertise to create beautiful, functional interiors that reflect your style and meet your practical needs.",
      features: [
        "Custom cabinetry and millwork",
        "Flooring installation",
        "Wall treatments and painting",
        "Lighting design",
        "Interior space planning",
      ],
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      icon: (
        <svg
          className="w-12 h-12 text-red-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
      ),
    },
    {
      id: 7,
      title: "Demolition and Dismantling",
      description:
        "Our professional demolition and dismantling services provide safe, efficient removal of structures and materials. We use specialized equipment and techniques to minimize disruption and maximize material recovery.",
      features: [
        "Complete structure demolition",
        "Selective interior demolition",
        "Concrete removal and breaking",
        "Safe material disposal",
        "Salvage and recycling services",
      ],
      image:
        "https://images.unsplash.com/photo-1626271763156-702f2aa9b8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      icon: (
        <svg
          className="w-12 h-12 text-red-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          ></path>
        </svg>
      ),
    },
    {
      id: 8,
      title: "Architectural Planning and Design",
      description:
        "Our architectural planning and design services help bring your vision to life. We work closely with you to create functional, beautiful spaces that meet your needs, preferences, and budget.",
      features: [
        "Conceptual design development",
        "Space planning and layout",
        "Building information modeling (BIM)",
        "Construction documentation",
        "Sustainable design solutions",
      ],
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80",
      icon: (
        <svg
          className="w-12 h-12 text-red-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
      ),
    },
  ]

  return (
    <>
    <TopSection heading1={"Our Services"} heading2="Comprehensive construction solutions for all your building needs" />

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Construction Services</h2>
            <div className="w-20 h-1 bg-red-800 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              We offer a comprehensive range of construction services to meet all your building needs
            </p>
          </div>

          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? "md:grid-flow-dense" : ""}`}
              >
                <div className={`space-y-6 ${index % 2 !== 0 ? "md:col-start-2" : ""}`}>
                  <div className="flex items-center">
                    <div className="mr-4">{service.icon}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{service.title}</h3>
                  </div>

                  <p className="text-gray-600 text-lg">{service.description}</p>

                  <div className="space-y-3">
                    <h4 className="text-xl font-semibold text-gray-800">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-red-800 mr-2 mt-1 flex-shrink-0"
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

                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 bg-red-800 hover:bg-red-900 text-white font-bold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                    >
                      Get a Quote
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div
                    className={`absolute ${index % 2 !== 0 ? "-top-4 -right-4" : "-top-4 -left-4"} w-24 h-24 bg-red-800 rounded-lg z-0`}
                  ></div>
                  <div
                    className={`absolute ${index % 2 !== 0 ? "-bottom-4 -left-4" : "-bottom-4 -right-4"} w-24 h-24 bg-yellow-500 rounded-lg z-0 `}
                  ></div>

                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="relative z-10 w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Construction Process</h2>
            <div className="w-20 h-1 bg-red-800 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              We follow a systematic approach to ensure successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We begin with a thorough consultation to understand your needs, preferences, and budget.",
                icon: (
                  <svg
                    className="w-12 h-12 text-red-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Planning & Design",
                description: "We develop detailed plans and designs that align with your vision and requirements.",
                icon: (
                  <svg
                    className="w-12 h-12 text-red-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Construction",
                description: "Our skilled team executes the project with precision, quality, and attention to detail.",
                icon: (
                  <svg
                    className="w-12 h-12 text-red-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                ),
              },
              {
                step: "04",
                title: "Completion & Handover",
                description: "We ensure the final project meets all specifications before handing it over to you.",
                icon: (
                  <svg
                    className="w-12 h-12 text-red-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ),
              },
            ].map((process, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-100 rounded-full p-3 mr-4">{process.icon}</div>
                    <span className="text-4xl font-bold text-red-800">{process.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
                <div className="h-1 w-0 bg-red-800 transition-all duration-300 group-hover:w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Pricing</h2>
            <div className="w-20 h-1 bg-red-800 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">Transparent and competitive pricing for our construction services</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Basic",
                price: "₹1,499",
                unit: "per sq.ft",
                description: "Standard construction with quality materials",
                features: [
                  "Basic structural design",
                  "Standard quality materials",
                  "Basic electrical and plumbing",
                  "Standard finishes",
                  "1-year warranty",
                ],
              },
              {
                title: "Premium",
                price: "₹1,999",
                unit: "per sq.ft",
                description: "Enhanced construction with premium materials",
                features: [
                  "Custom structural design",
                  "Premium quality materials",
                  "Advanced electrical and plumbing",
                  "Premium finishes",
                  "3-year warranty",
                  "Free maintenance for 6 months",
                ],
                featured: true,
              },
              {
                title: "Luxury",
                price: "₹2,499",
                unit: "per sq.ft",
                description: "Luxury construction with top-tier materials",
                features: [
                  "Architectural design consultation",
                  "Top-tier quality materials",
                  "Smart home electrical systems",
                  "Luxury finishes and fixtures",
                  "5-year warranty",
                  "Free maintenance for 1 year",
                  "Interior design consultation",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  plan.featured
                    ? "bg-red-800 text-white border-4 border-yellow-500 relative z-10 md:-mt-4 md:-mb-4 md:py-8"
                    : "bg-white"
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-gray-900 font-bold px-4 py-1">Popular</div>
                )}

                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-4 ${plan.featured ? "text-white" : "text-gray-800"}`}>
                    {plan.title}
                  </h3>

                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${plan.featured ? "text-white" : "text-red-800"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ${plan.featured ? "text-gray-200" : "text-gray-600"}`}>{plan.unit}</span>
                  </div>

                  <p className={`mb-6 ${plan.featured ? "text-gray-200" : "text-gray-600"}`}>{plan.description}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className={`w-5 h-5 mr-2 mt-1 flex-shrink-0 ${plan.featured ? "text-yellow-500" : "text-red-800"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className={plan.featured ? "text-gray-200" : "text-gray-600"}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`w-full inline-flex items-center justify-center px-6 py-3 font-bold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
                      plan.featured
                        ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                        : "bg-red-800 hover:bg-red-900 text-white"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Need a custom quote for your specific project?</p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-red-800 hover:bg-red-900 text-white font-bold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  )
}

export default ServicesPage
