import ContactSection from "../components/ContactSection"
import TopSection from "../components/TopSection"

const ContactPage = () => {
  return (
    <>
      <TopSection heading1={"Contact Us"} heading2={"Get in touch with our team for your construction needs"} />

      {/* Map Section */}
      <section className="py-10 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Location</h2>
            <div className="w-16 sm:w-20 h-1 bg-red-800 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Visit our office or contact us through the form below
            </p>
          </div>

          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg h-64 sm:h-80 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d80.06892754483383!3d13.047525288790662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1628152245238!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="RF Construction Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />
    </>
  )
}

export default ContactPage
