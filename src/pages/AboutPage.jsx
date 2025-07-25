import TestimonialsSection from "../components/TestimonialsSection"
import CTASection from "../components/CTASection"
import TopSection from "../components/TopSection"

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Rajesh Sharma",
      position: "Founder & CEO",
      avatar: "👨🏽",
    },
    {
      id: 2,
      name: "Priya Venkatesh",
      position: "Chief Architect",
      avatar: "👩🏽",
    },
    {
      id: 3,
      name: "Suresh Kumar",
      position: "Project Manager",
      avatar: "👨🏽",
    },
    {
      id: 4,
      name: "Lakshmi Devi",
      position: "Interior Designer",
      avatar: "👩🏽",
    },
  ]

  const milestones = [
    {
      year: "2010",
      title: "Company Founded",
      description:
        `${import.meta.env.VITE_COMPANY_NAME} was established with a vision to provide quality construction services in Tamil Nadu.`,
    },
    {
      year: "2013",
      title: "First Major Project",
      description: "Completed our first major commercial project, a shopping complex in Chennai.",
    },
    {
      year: "2015",
      title: "Expansion",
      description: "Expanded our services to include interior design and architectural planning.",
    },
    {
      year: "2018",
      title: "ISO Certification",
      description: "Received ISO 9001 certification for our quality management systems.",
    },
    {
      year: "2020",
      title: "10 Year Anniversary",
      description: "Celebrated 10 years of excellence with over 200 successful projects.",
    },
  ]

  return (
    <>
      <TopSection heading1={`About ${import.meta.env.VITE_COMPANY_NAME}`} heading2={"Building excellence in Tamil Nadu for over a decade"} />

      {/* Company Overview */}
      <section className="py-10 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">Our Story</h2>
              <div className="w-16 sm:w-20 h-1 bg-red-800 mb-4 sm:mb-6"></div>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Founded in 2010, {import.meta.env.VITE_COMPANY_NAME} has grown from a small local contractor to one of the leading
                construction companies in Tamil Nadu. Our journey has been marked by a commitment to quality,
                innovation, and customer satisfaction.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                We specialize in a wide range of construction services, from residential buildings to commercial
                complexes and industrial facilities. Our team of experienced professionals brings expertise, dedication,
                and creativity to every project.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                At {import.meta..env.VITE_COMPANY_NAME}, we believe in building not just structures, but relationships. Our client-centered
                approach ensures that we understand and fulfill the unique needs and vision of each client.
              </p>
            </div>

            <div className="relative mt-6 md:mt-0">
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-16 sm:w-24 h-16 sm:h-24 bg-red-800 rounded-lg z-0"></div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 bg-yellow-500 rounded-lg z-0"></div>

              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="Construction site"
                className="relative z-10 w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-10 sm:py-16 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Our Mission & Vision</h2>
            <div className="w-16 sm:w-20 h-1 bg-red-800 mx-auto mb-4 sm:mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <div className="bg-white rounded-lg shadow-lg p-5 sm:p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-red-800 rounded-full p-2 sm:p-3 mr-3 sm:mr-4">
                  <svg
                    className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                To deliver exceptional construction services that exceed client expectations, while maintaining the
                highest standards of quality, safety, and sustainability. We are committed to building structures that
                stand the test of time and contribute positively to the communities we serve.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-5 sm:p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-red-800 rounded-full p-2 sm:p-3 mr-3 sm:mr-4">
                  <svg
                    className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                To be the most trusted and respected construction company in Tamil Nadu, known for our innovation,
                integrity, and excellence. We aspire to set new benchmarks in the construction industry through
                sustainable practices, cutting-edge technology, and a client-centered approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-10 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Our Journey</h2>
            <div className="w-16 sm:w-20 h-1 bg-red-800 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">Key milestones in our company's history</p>
          </div>

          <div className="relative">
            {/* Timeline Line - Hidden on mobile, visible on larger screens */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-800"></div>

            {/* Timeline Items */}
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative md:flex md:items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="md:flex-1"></div>

                  {/* Timeline Point - Hidden on mobile */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-red-800 rounded-full items-center justify-center z-10">
                    <span className="text-white text-xs sm:text-sm md:text-base font-bold">{milestone.year}</span>
                  </div>

                  {/* Content */}
                  <div className="md:flex-1 p-3 sm:p-4 md:p-6">
                    {/* Mobile year display */}
                    <div className="md:hidden bg-red-800 text-white text-sm font-bold inline-block px-3 py-1 rounded-full mb-2">
                      {milestone.year}
                    </div>

                    <div
                      className={`bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6 transform transition-all duration-300 hover:shadow-xl ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
                    >
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 sm:py-16 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Our Leadership Team</h2>
            <div className="w-16 sm:w-20 h-1 bg-red-800 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Meet the experts behind {import.meta.env.VITE_COMPANY_NAME}'s success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="p-4 sm:p-6 md:p-8 text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 mx-auto">{member.avatar}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-red-800 font-medium">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </>
  )
}

export default AboutPage
