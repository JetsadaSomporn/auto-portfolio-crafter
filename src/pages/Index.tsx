
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PortfolioForm from "@/components/forms/PortfolioForm";
import PortfolioPreview from "@/components/preview/PortfolioPreview";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col items-center text-center">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary mb-4 animate-fade-in opacity-0 animation-delay-100 animation-fill-mode-forwards">
                Customize • Preview • Export
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight md:leading-tight max-w-4xl animate-slide-up opacity-0 animation-delay-200 animation-fill-mode-forwards">
                Create a stunning portfolio without writing code
              </h1>
              
              <p className="mt-6 text-lg md:text-xl text-primary/70 max-w-2xl animate-slide-up opacity-0 animation-delay-300 animation-fill-mode-forwards">
                A beautiful, customizable portfolio generator for developers, designers, and creatives. Get a professional portfolio in minutes.
              </p>
              
              <div className="mt-10 animate-slide-up opacity-0 animation-delay-400 animation-fill-mode-forwards">
                <button 
                  onClick={scrollToForm}
                  className="button-primary bg-primary text-white px-8 py-3 rounded-lg text-lg"
                >
                  Get Started
                </button>
              </div>
              
              <div className={`mt-16 ${isScrolled ? 'opacity-0' : 'opacity-70'} transition-opacity`}>
                <button 
                  onClick={scrollToForm}
                  className="p-3 rounded-full bg-white/80 border border-neutral-200/50 shadow-sm animate-bounce"
                  aria-label="Scroll down"
                >
                  <ArrowDown className="h-5 w-5 text-primary/60" />
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Form & Preview Section */}
        <section ref={formSectionRef} className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Form */}
              <div className="w-full lg:w-1/2 form-section">
                <PortfolioForm />
              </div>
              
              {/* Preview */}
              <div className="w-full lg:w-1/2 preview-section">
                <PortfolioPreview />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 px-4 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
                Why use Portfolio Crafter?
              </h2>
              <p className="mt-4 text-lg text-primary/70 max-w-2xl mx-auto">
                The easiest way to create a professional portfolio without writing code
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200/50">
                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Easy to Use</h3>
                <p className="text-primary/70">
                  Simply fill out a form with your information and see your portfolio come to life in real-time.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200/50">
                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Live Preview</h3>
                <p className="text-primary/70">
                  See changes immediately as you edit your information, with a beautiful live preview.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200/50">
                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Export & Deploy</h3>
                <p className="text-primary/70">
                  Export your portfolio as a static site that you can deploy anywhere, or use our one-click deploy options.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PortfolioProvider>
  );
};

export default Index;
