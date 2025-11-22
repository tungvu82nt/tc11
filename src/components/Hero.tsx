import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-6 py-16 md:py-24">
      <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12 fade-in">
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight px-4 animate-pulse">
            Không ai tự dụng trầm cảm
          </h1>
          
          <div className="max-w-sm md:max-w-md lg:max-w-lg mx-auto px-4 hover:scale-105 transition-transform duration-500 ease-in-out">
            <img 
              src={heroImage} 
              alt="Minh họa về trầm cảm - một người ngồi đơn độc"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
