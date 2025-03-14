import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PortfolioForm from "@/components/forms/PortfolioForm";
import PortfolioPreview from "@/components/preview/PortfolioPreview";
import { PortfolioProvider, usePortfolio } from "@/contexts/PortfolioContext";
import { ArrowDown, Sparkles, Zap, Globe, Code, Laptop, Palette, Layout, Layers, CheckCircle, Users, RefreshCw, Download, FileText, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

// Create a wrapper component that efficiently tracks portfolio changes
const LivePreviewWrapper = ({ children }) => {
  const { portfolio } = usePortfolio();
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const previousPortfolioRef = useRef(null);

  // Use effect to detect real changes to portfolio data
  useEffect(() => {
    // Only trigger update if portfolio data has actually changed
    if (JSON.stringify(portfolio) !== JSON.stringify(previousPortfolioRef.current)) {
      setIsUpdating(true);
      setLastUpdateTime(Date.now());
      
      // Clear updating state after animation
      const timer = setTimeout(() => setIsUpdating(false), 800);
      
      // Store current portfolio for next comparison
      previousPortfolioRef.current = JSON.parse(JSON.stringify(portfolio));
      
      return () => clearTimeout(timer);
    }
  }, [portfolio]);

  return (
    <div className="relative">
      {/* Preview header with update indicator */}
      <div className="p-4 border-b border-neutral-100 bg-neutral-50/80 flex justify-between items-center">
        <h3 className="font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> Live Preview
        </h3>
        <div className="flex items-center gap-3">
          <span className={`text-xs flex items-center gap-1.5 px-2 py-1 rounded-full ${
            isUpdating ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-500'
          }`}>
            <RefreshCw className={`h-3 w-3 ${isUpdating ? 'animate-spin' : ''}`} /> 
            {isUpdating ? 'Updating...' : 'Live'}
          </span>
          <ExportButton />
        </div>
      </div>

      {/* Preview content with highlight effect */}
      <div className="p-6 relative">
        <div className={`preview-container border border-neutral-100 rounded-lg overflow-hidden shadow-inner bg-white transition-all duration-300 ${
          isUpdating ? 'border-primary/30 shadow-[0_0_0_1px_rgba(var(--primary-color),0.1)]' : ''
        }`}>
          {children}
        </div>
      </div>
      
      {/* Live indicator tooltip */}
      <div className="absolute bottom-4 right-4">
        <div className="px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-neutral-100 text-xs max-w-xs">
          <div className="font-medium mb-1 flex items-center gap-1.5 text-primary">
            <Zap className="h-3.5 w-3.5" /> Real-time Updates
          </div>
          <p className="text-neutral-600">
            {lastUpdateTime && `Last updated: ${new Date(lastUpdateTime).toLocaleTimeString()}`}
          </p>
        </div>
      </div>
    </div>
  );
};

// Enhanced ExportButton component with PDF support
const ExportButton = () => {
  const { portfolio } = usePortfolio();
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<"html" | "pdf">("html");
  const [showOptions, setShowOptions] = useState(false);

  const exportAsHTML = useCallback(() => {
    setIsExporting(true);
    setExportType("html");
    
    // Generate a basic HTML file with the portfolio content
    setTimeout(() => {
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolio.name} - Portfolio</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="bg-gray-50">
  <div class="max-w-4xl mx-auto my-10 px-4 py-8 bg-white rounded-lg shadow-md">
    <header class="mb-8 text-center">
      ${portfolio.avatar ? `<img src="${portfolio.avatar}" alt="${portfolio.name}" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover">` : ''}
      <h1 class="text-3xl font-bold">${portfolio.name}</h1>
      <p class="text-xl text-gray-600">${portfolio.title || ''}</p>
    </header>
    
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">About Me</h2>
      <p class="text-gray-700">${portfolio.bio || ''}</p>
    </section>
    
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Skills</h2>
      <div class="flex flex-wrap gap-2">
        ${portfolio.skills.map(skill => `
          <div class="bg-gray-100 px-3 py-1 rounded-full text-sm">
            ${skill.name} - ${skill.level}%
          </div>
        `).join('')}
      </div>
    </section>
    
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${portfolio.projects.map(project => `
          <div class="border border-gray-200 rounded-lg p-4">
            <h3 class="text-xl font-medium mb-2">${project.title}</h3>
            <p class="text-gray-600 mb-3">${project.description}</p>
            <div class="flex flex-wrap gap-1 mb-3">
              ${project.tags.map(tag => `
                <span class="bg-gray-100 px-2 py-0.5 rounded text-xs">${tag}</span>
              `).join('')}
            </div>
            ${project.link ? `<a href="${project.link}" target="_blank" class="text-blue-600 hover:underline text-sm">View Project</a>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
    
    <footer class="pt-6 border-t border-gray-200">
      <div class="flex justify-center gap-4">
        ${portfolio.socialLinks.map(link => `
          <a href="${link.url}" target="_blank" class="text-gray-600 hover:text-gray-900">
            ${link.platform}
          </a>
        `).join('')}
      </div>
      <p class="text-center text-sm text-gray-500 mt-4">
        Created with Portfolio Crafter
      </p>
    </footer>
  </div>
</body>
</html>`;

      // Create downloadable blob
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Create and trigger download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `${portfolio.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 800);
  }, [portfolio]);
  
  // Completely redesigned PDF export function to fix empty PDF issues
  const exportAsPDF = useCallback(async () => {
    setIsExporting(true);
    setExportType("pdf");
    
    try {
      // Force clean any previous PDF containers that might exist
      const oldContainer = document.getElementById('pdf-export-container');
      if (oldContainer) {
        document.body.removeChild(oldContainer);
      }
      
      // Create a full-page overlay with loading indicator
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(255,255,255,0.8)';
      overlay.style.zIndex = '9999';
      overlay.style.display = 'flex';
      overlay.style.flexDirection = 'column';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.innerHTML = `
        <div style="text-align: center">
          <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
          <p style="font-family: sans-serif; color: #333;">Generating PDF...</p>
          <p style="font-family: sans-serif; color: #666; font-size: 14px; margin-top: 10px;">Please wait, this may take a few moments</p>
          <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        </div>
      `;
      document.body.appendChild(overlay);
      
      // Load the PDF library directly from CDN
      await new Promise((resolve, reject) => {
        if (window.jspdf && window.html2canvas) {
          resolve(null);
          return;
        }
        
        // Load html2canvas first
        const html2canvasScript = document.createElement('script');
        html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        html2canvasScript.onload = () => {
          // Then load jsPDF
          const jspdfScript = document.createElement('script');
          jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
          jspdfScript.onload = resolve;
          jspdfScript.onerror = reject;
          document.head.appendChild(jspdfScript);
        };
        html2canvasScript.onerror = reject;
        document.head.appendChild(html2canvasScript);
      });
      
      // Create content container
      const container = document.createElement('div');
      container.id = 'pdf-export-container';
      container.style.width = '800px';
      container.style.margin = '0 auto';
      container.style.padding = '40px';
      container.style.backgroundColor = 'white';
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.fontFamily = 'Arial, sans-serif';
      
      // Generate the static HTML content
      container.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 28px; margin-bottom: 10px;">${portfolio.name || 'Portfolio'}</h1>
          <p style="font-size: 18px; color: #555;">${portfolio.title || ''}</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 22px; margin-bottom: 10px; border-bottom: 2px solid #eee; padding-bottom: 5px;">About Me</h2>
          <p style="line-height: 1.6;">${portfolio.bio || 'No bio information provided.'}</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 22px; margin-bottom: 10px; border-bottom: 2px solid #eee; padding-bottom: 5px;">Skills</h2>
          <div style="margin-top: 10px;">
            ${portfolio.skills && portfolio.skills.length > 0 ? 
              portfolio.skills.map(skill => 
                `<div style="display: inline-block; background-color: #f3f4f6; padding: 5px 10px; margin: 5px; border-radius: 15px;">
                  ${skill.name} - ${skill.level}%
                </div>`
              ).join('') : 
              '<p>No skills listed yet.</p>'
            }
          </div>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 22px; margin-bottom: 10px; border-bottom: 2px solid #eee; padding-bottom: 5px;">Projects</h2>
          <div>
            ${portfolio.projects && portfolio.projects.length > 0 ? 
              portfolio.projects.map(project => 
                `<div style="border: 1px solid #eee; padding: 15px; margin-bottom: 15px; border-radius: 5px;">
                  <h3 style="font-size: 18px; margin-top: 0; margin-bottom: 10px;">${project.title}</h3>
                  <p style="margin-bottom: 10px;">${project.description}</p>
                  <div>
                    ${project.tags?.map(tag => 
                      `<span style="display: inline-block; background-color: #f3f4f6; padding: 3px 8px; margin-right: 5px; margin-bottom: 5px; border-radius: 4px; font-size: 12px;">
                        ${tag}
                      </span>`
                    ).join('') || ''}
                  </div>
                  ${project.link ? `<p style="margin-top: 10px; font-size: 14px; color: blue;">Project Link: ${project.link}</p>` : ''}
                </div>`
              ).join('') :
              '<p>No projects added yet.</p>'
            }
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; text-align: center;">
          <h2 style="font-size: 18px; margin-bottom: 10px;">Contact Information</h2>
          ${portfolio.socialLinks && portfolio.socialLinks.length > 0 ? 
            portfolio.socialLinks.map(link => 
              `<p style="margin: 5px 0;"><strong>${link.platform}:</strong> ${link.url}</p>`
            ).join('') : 
            '<p>No contact information provided.</p>'
          }
          <p style="margin-top: 20px; color: #999; font-size: 12px;">Created with Portfolio Crafter</p>
        </div>
      `;
      
      document.body.appendChild(container);
      
      // Wait a bit to ensure the content renders
      await new Promise(resolve => setTimeout(resolve, 200));
      
      try {
        // Use html2canvas and jsPDF directly
        const canvas = await window.html2canvas(container, {
          scale: 2,
          useCORS: true,
          logging: false
        });
        
        // Create PDF with proper dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;
        
        const pdf = new window.jspdf.jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');
        
        // Handle multi-page content if needed
        let position = 0;
        let remainingHeight = heightLeft;
        
        while (remainingHeight > 0) {
          position += pageHeight;
          remainingHeight -= pageHeight;
          
          // Add new page if there's more content
          if (remainingHeight > 0) {
            pdf.addPage();
            pdf.addImage(canvas, 'PNG', 0, -position, imgWidth, imgHeight, '', 'FAST');
          }
        }
        
        // Save PDF with portfolio name or default name
        const filename = `${(portfolio.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}-portfolio.pdf`;
        pdf.save(filename);
        
        console.log("PDF generated successfully");
      } catch (error) {
        console.error("Error rendering PDF:", error);
        alert("Failed to generate PDF. Please try again or use the HTML export option.");
      }
      
      // Clean up
      document.body.removeChild(container);
      document.body.removeChild(overlay);
      setIsExporting(false);
    } catch (error) {
      console.error("PDF export error:", error);
      alert("An error occurred while generating the PDF. Please try again later.");
      
      // Make sure to remove the overlay if it exists
      const overlay = document.querySelector('div[style*="position: fixed"]');
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      
      setIsExporting(false);
    }
  }, [portfolio]);
  
  // Updated library loading function
  const loadPdfLibrary = async () => {
    return new Promise((resolve, reject) => {
      try {
        // Check if library is already loaded
        if (window.html2pdf) {
          console.log("html2pdf library already loaded");
          resolve(true);
          return;
        }
        
        console.log("Loading html2pdf library");
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.async = true;
        
        script.onload = () => {
          // Check if library loaded correctly
          if (window.html2pdf) {
            console.log("html2pdf library loaded successfully");
            resolve(true);
          } else {
            console.error("html2pdf object not available after script load");
            reject(new Error("html2pdf did not load correctly"));
          }
        };
        
        script.onerror = (e) => {
          console.error("Error loading html2pdf script:", e);
          reject(new Error("Failed to load html2pdf library"));
        };
        
        document.head.appendChild(script);
      } catch (error) {
        console.error("Error in loadPdfLibrary:", error);
        reject(error);
      }
    });
  };

  return (
    <div className="relative">
      <div className="flex">
        <button 
          onClick={() => exportType === "html" ? exportAsHTML() : exportAsPDF()}
          disabled={isExporting} 
          className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-l-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          {isExporting ? (
            <>Exporting... <RefreshCw className="h-3 w-3 animate-spin" /></>
          ) : (
            <>Export as {exportType.toUpperCase()} <Download className="h-3 w-3" /></>
          )}
        </button>
        <button
          onClick={() => setShowOptions(!showOptions)} 
          className="px-1 py-1 text-xs font-medium rounded-r-md border-l border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          disabled={isExporting}
        >
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
      
      {showOptions && (
        <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg border border-neutral-100 z-10">
          <button 
            onClick={() => { setExportType("html"); setShowOptions(false); }}
            className="w-full text-left px-3 py-2 hover:bg-neutral-50 text-xs flex items-center gap-2"
          >
            <Code className="h-3 w-3" /> HTML
          </button>
          <button 
            onClick={() => { setExportType("pdf"); setShowOptions(false); }}
            className="w-full text-left px-3 py-2 hover:bg-neutral-50 text-xs flex items-center gap-2"
          >
            <FileText className="h-3 w-3" /> PDF
          </button>
        </div>
      )}
    </div>
  );
};

// Add this to the global Window interface
declare global {
  interface Window {
    html2pdf: any;
    html2canvas: any;
    jspdf: any;
  }
}

const Index = () => {
  const formSectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const templatesRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        {/* Background decoration elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-[100px]" />
          <div className="absolute top-40 right-[15%] w-72 h-72 rounded-full bg-purple-300 opacity-20 blur-[120px]" />
          <div className="absolute bottom-20 left-[30%] w-80 h-80 rounded-full bg-primary/30 opacity-10 blur-[100px]" />
        </div>
        
        <Header />
        
        {/* Hero Section - Modern */}
        <section className="pt-28 pb-24 px-4 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-neutral-100 mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary/90">Next-gen Portfolio Builder</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Craft Your Digital Identity
              </h1>
              
              <p className="text-xl text-neutral-600 mb-10 max-w-2xl">
                Build a stunning portfolio that stands out in minutes with our intuitive drag-and-drop interface. Zero coding required.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={scrollToForm}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
                >
                  Get Started <Zap className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => scrollToSection(examplesRef)} 
                  className="px-6 py-3 rounded-full bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 font-medium transition-all hover:shadow-md"
                >
                  View Examples
                </button>
              </div>
              
              {/* Navigation Pills */}
              <div className="flex flex-wrap justify-center gap-2 mt-10">
                <button 
                  onClick={() => scrollToSection(featuresRef)} 
                  className="px-4 py-2 text-sm rounded-full bg-white/70 hover:bg-white border border-neutral-200 shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-primary" /> Features
                </button>
                <button 
                  onClick={() => scrollToSection(templatesRef)} 
                  className="px-4 py-2 text-sm rounded-full bg-white/70 hover:bg-white border border-neutral-200 shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                >
                  <Layout className="h-3.5 w-3.5 text-purple-500" /> Templates
                </button>
                <button 
                  onClick={() => scrollToSection(examplesRef)} 
                  className="px-4 py-2 text-sm rounded-full bg-white/70 hover:bg-white border border-neutral-200 shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                >
                  <Users className="h-3.5 w-3.5 text-blue-500" /> Examples
                </button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-400/20 rounded-xl blur-3xl opacity-50 transform -rotate-1"></div>
              <div className="relative overflow-hidden rounded-xl border border-neutral-200/50 shadow-xl">
                <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs text-neutral-400 mx-auto pr-6">My Professional Portfolio</div>
                </div>
                <img 
                  src="/portfolio-preview.png" 
                  alt="Portfolio Preview" 
                  className="w-full object-cover"
                  onError={(e) => {
                    // Fallback mock UI if image doesn't exist
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="bg-white p-6 h-64 flex items-center justify-center">
                          <div class="text-center text-neutral-400">
                            <div class="mx-auto w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                              <svg class="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p class="text-sm">Preview your custom portfolio</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="flex justify-center mt-16">
              <button 
                onClick={scrollToForm}
                className="p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg hover:bg-white transition-all duration-300 group border border-neutral-100"
                aria-label="Scroll down to form"
              >
                <ArrowDown className="h-5 w-5 text-primary group-hover:animate-bounce" />
              </button>
            </div>
          </div>
        </section>
        
        {/* Features Section - Expanded */}
        <section ref={featuresRef} id="features" className="py-24 px-4 relative z-10 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
                <CheckCircle className="h-4 w-4" /> Powerful Features
              </span>
              <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Our platform provides all the tools you need to create a professional portfolio that gets noticed
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl border border-neutral-200/50 shadow-sm hover:shadow-md transition-all p-6 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-primary/10 text-primary p-3 rounded-lg inline-block mb-4">
                  <Laptop className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Responsive Design</h3>
                <p className="text-neutral-600 mb-4">
                  Every portfolio looks perfect on all devices - from mobile phones to wide desktop screens.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Mobile-first approach
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Adaptive layouts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Touch-friendly elements
                  </li>
                </ul>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl border border-neutral-200/50 shadow-sm hover:shadow-md transition-all p-6 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-purple-500/10 text-purple-500 p-3 rounded-lg inline-block mb-4">
                  <Palette className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Customizable Themes</h3>
                <p className="text-neutral-600 mb-4">
                  Choose from a variety of color schemes and customize to match your personal brand.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Color theme options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Light & dark modes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Custom accent colors
                  </li>
                </ul>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl border border-neutral-200/50 shadow-sm hover:shadow-md transition-all p-6 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-blue-500/10 text-blue-500 p-3 rounded-lg inline-block mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">SEO Optimized</h3>
                <p className="text-neutral-600 mb-4">
                  Get discovered online with built-in SEO best practices for better visibility.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Meta tag optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Semantic HTML
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Fast loading times
                  </li>
                </ul>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl border border-neutral-200/50 shadow-sm hover:shadow-md transition-all p-6 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-green-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-green-500/10 text-green-500 p-3 rounded-lg inline-block mb-4">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Project Showcases</h3>
                <p className="text-neutral-600 mb-4">
                  Highlight your work with beautiful project galleries and case studies.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Image galleries
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Project descriptions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Live demo links
                  </li>
                </ul>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl border border-neutral-200/50 shadow-sm hover:shadow-md transition-all p-6 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-amber-500/10 text-amber-500 p-3 rounded-lg inline-block mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">One-Click Deploy</h3>
                <p className="text-neutral-600 mb-4">
                  Publish your portfolio with a single click to your preferred hosting platform.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Vercel integration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Netlify deployment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Custom domain support
                  </li>
                </ul>
              </div>
              
              {/* Feature 6 */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl border border-neutral-200/50 shadow-sm hover:shadow-md transition-all p-6 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-pink-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-pink-500/10 text-pink-500 p-3 rounded-lg inline-block mb-4">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Analytics Ready</h3>
                <p className="text-neutral-600 mb-4">
                  Track visitors and engagement with built-in analytics capabilities.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Google Analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Visit statistics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Conversion tracking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Templates Section */}
        <section ref={templatesRef} id="templates" className="py-24 px-4 relative z-10 bg-gradient-to-b from-neutral-50/80 to-white/80 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
                <Layout className="h-4 w-4" /> Modern Templates
              </span>
              <h2 className="text-4xl font-bold mb-4">Choose Your Style</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Start with one of our professionally designed templates and customize it to match your personality
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Template 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-neutral-100 group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <button className="w-full py-2 bg-white/90 backdrop-blur-sm rounded-md text-sm font-medium hover:bg-white transition-colors">
                        Use this template
                      </button>
                    </div>
                  </div>
                  <img 
                    src="/templates/minimal.png" 
                    alt="Minimal Template" 
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/600x450/f5f5f5/999999?text=Minimal+Template`;
                    }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Minimal</h3>
                    <span className="bg-neutral-100 text-neutral-600 rounded-full px-2 py-0.5 text-xs">Popular</span>
                  </div>
                  <p className="text-sm text-neutral-600">Clean, simple layout with focus on content and readability.</p>
                </div>
              </div>
              
              {/* Template 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-neutral-100 group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <button className="w-full py-2 bg-white/90 backdrop-blur-sm rounded-md text-sm font-medium hover:bg-white transition-colors">
                        Use this template
                      </button>
                    </div>
                  </div>
                  <img 
                    src="/templates/creative.png" 
                    alt="Creative Template" 
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/600x450/f0f4ff/6366f1?text=Creative+Template`;
                    }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Creative</h3>
                    <span className="bg-purple-100 text-purple-600 rounded-full px-2 py-0.5 text-xs">New</span>
                  </div>
                  <p className="text-sm text-neutral-600">Bold, artistic design with unique layout and visual elements.</p>
                </div>
              </div>
              
              {/* Template 3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-neutral-100 group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <button className="w-full py-2 bg-white/90 backdrop-blur-sm rounded-md text-sm font-medium hover:bg-white transition-colors">
                        Use this template
                      </button>
                    </div>
                  </div>
                  <img 
                    src="/templates/professional.png" 
                    alt="Professional Template" 
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/600x450/f0fdf4/22c55e?text=Professional+Template`;
                    }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Professional</h3>
                    <span className="bg-neutral-100 text-neutral-600 rounded-full px-2 py-0.5 text-xs">Classic</span>
                  </div>
                  <p className="text-sm text-neutral-600">Traditional format optimized for corporate and business profiles.</p>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2 xl:col-span-3 text-center mt-8">
                <button className="px-6 py-2.5 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors">
                  View All Templates
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Examples Section */}
        <section ref={examplesRef} id="examples" className="py-24 px-4 relative z-10 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
                <Users className="h-4 w-4" /> Success Stories
              </span>
              <h2 className="text-4xl font-bold mb-4">See What Others Have Created</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Get inspired by these real portfolios created with our platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Example 1 */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-3/5 rounded-lg overflow-hidden shadow-lg border border-neutral-100">
                  <img 
                    src="/examples/example1.png" 
                    alt="Designer Portfolio Example" 
                    className="w-full"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/600x400/f5f5f5/666666?text=Designer+Portfolio`;
                    }}
                  />
                </div>
                <div className="w-full md:w-2/5">
                  <h3 className="text-xl font-semibold mb-2">Sarah Chen</h3>
                  <p className="text-primary mb-4">Product Designer</p>
                  <p className="text-sm text-neutral-600 mb-4">
                    "This platform helped me showcase my work in a professional way that impressed my clients. I landed 3 new projects within a week of launching!"
                  </p>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                    View Portfolio <ArrowDown className="h-3 w-3 rotate-[-90deg]" />
                  </a>
                </div>
              </div>
              
              {/* Example 2 */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-3/5 rounded-lg overflow-hidden shadow-lg border border-neutral-100">
                  <img 
                    src="/examples/example2.png" 
                    alt="Developer Portfolio Example" 
                    className="w-full"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/600x400/f0f4ff/6366f1?text=Developer+Portfolio`;
                    }}
                  />
                </div>
                <div className="w-full md:w-2/5">
                  <h3 className="text-xl font-semibold mb-2">Alex Reynolds</h3>
                  <p className="text-purple-600 mb-4">Frontend Developer</p>
                  <p className="text-sm text-neutral-600 mb-4">
                    "With Portfolio Crafter, I was able to create a standout portfolio that highlighted my coding skills. I received multiple job offers within days!"
                  </p>
                  <a href="#" className="text-sm text-purple-600 hover:underline flex items-center gap-1">
                    View Portfolio <ArrowDown className="h-3 w-3 rotate-[-90deg]" />
                  </a>
                </div>
              </div>
              
              {/* Example 3 */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-3/5 rounded-lg overflow-hidden shadow-lg border border-neutral-100">
                  <img 
                    src="/examples/example3.png" 
                    alt="Photographer Portfolio Example" 
                    className="w-full"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/600x400/f0fdf4/22c55e?text=Photographer+Portfolio`;
                    }}
                  />
                </div>
                <div className="w-full md:w-2/5">
                  <h3 className="text-xl font-semibold mb-2">Maria Lopez</h3>
                  <p className="text-green-600 mb-4">Photographer</p>
                  <p className="text-sm text-neutral-600 mb-4">
                    "The templates were perfect for showcasing my photography. I love how easy it was to customize and make it feel like my own unique brand."
                  </p>
                  <a href="#" className="text-sm text-green-600 hover:underline flex items-center gap-1">
                    View Portfolio <ArrowDown className="h-3 w-3 rotate-[-90deg]" />
                  </a>
                </div>
              </div>
              
              {/* Example 4 */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-3/5 rounded-lg overflow-hidden shadow-lg border border-neutral-100">
                  <img 
                    src="/examples/example4.png" 
                    alt="Writer Portfolio Example" 
                    className="w-full"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/600x400/fff7ed/f59e0b?text=Writer+Portfolio`;
                    }}
                  />
                </div>
                <div className="w-full md:w-2/5">
                  <h3 className="text-xl font-semibold mb-2">James Wilson</h3>
                  <p className="text-amber-600 mb-4">Content Writer</p>
                  <p className="text-sm text-neutral-600 mb-4">
                    "As a writer, I needed a clean portfolio that puts focus on my work. This platform delivered exactly what I needed with minimal effort."
                  </p>
                  <a href="#" className="text-sm text-amber-600 hover:underline flex items-center gap-1">
                    View Portfolio <ArrowDown className="h-3 w-3 rotate-[-90deg]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Form & Preview Section */}
        <section ref={formSectionRef} className="py-20 px-4 bg-neutral-50/80 backdrop-blur-sm relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Code className="h-4 w-4" /> Start Creating
              </span>
              <h2 className="text-4xl font-bold mb-4">Build Your Portfolio</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Customize your portfolio and see changes in real-time
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neutral-100">
                <PortfolioForm />
              </div>
              
              {/* Preview with enhanced wrapper */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-neutral-100 relative">
                <LivePreviewWrapper>
                  <PortfolioPreview />
                </LivePreviewWrapper>
              </div>
            </div>
            
            {/* Added section explaining the export functionality */}
            <div className="mt-12 max-w-xl mx-auto">
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-5 border border-neutral-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Export Your Portfolio</h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      When you're happy with your portfolio, use the export button to download an HTML version of your site that you can host anywhere!
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" /> 
                      <span>Responsive HTML/CSS file</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" /> 
                      <span>Ready to upload to any web host</span>
                    </div>
                  </div>
                </div>
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
