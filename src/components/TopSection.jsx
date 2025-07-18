import PageHeaderWaveDivider from "./PageHeaderWaveDivider";

const TopSection = ({heading1,heading2}) => {
  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-gray-900 to-red-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6">{heading1}</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200">{heading2}</p>
        </div>
      </div>

      {/* Smaller wave divider for page header */}
      <PageHeaderWaveDivider color="#ffffff" height={80} />

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-0"></div>
    </section>
  );
};
export default TopSection;
