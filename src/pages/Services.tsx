import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ArrowRight, Code, Settings, Search, Laptop, Check, Star } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Design, Development & ERP Management",
      description: "Cutting-edge websites and intelligent enterprise systems that streamline your operations",
      features: [
        "Responsive Design",
        "Modern Frameworks",
        "Process Automation",
        "Data Integration",
        "Real-time Analytics",
        "Custom Workflows"
      ],
      price: "Starting at 4,999 ETB"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "SEO Management",
      description: "Dominate search results and drive organic growth",
      features: [
        "Keyword Research",
        "On-page Optimization",
        "Technical SEO",
        "Link Building",
        "Performance Tracking"
      ],
      price: "Starting at 1,999 ETB"
    },
    {
      icon: <Laptop className="w-8 h-8" />,
      title: "Business Digital Makeover",
      description: "Complete digital transformation for your business",
      features: [
        "Strategic Planning",
        "Full Brand Overhaul",
        "Multi-platform Presence",
        "Training & Support",
        "Ongoing Optimization"
      ],
      price: "Starting at 9,999 ETB"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We dive deep into your business goals and challenges"
    },
    {
      step: "02",
      title: "Strategy",
      description: "Custom strategy tailored to your unique requirements"
    },
    {
      step: "03",
      title: "Execution",
      description: "Expert implementation with regular updates and feedback"
    },
    {
      step: "04",
      title: "Launch",
      description: "Successful deployment with comprehensive testing"
    },
    {
      step: "05",
      title: "Optimize",
      description: "Continuous improvement and performance monitoring"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive digital solutions designed to propel your brand into its next orbit of success
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-white/50 transition-all duration-300 hover:shadow-orbit group fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-white group-hover:text-gray-300 transition-colors duration-300 mb-6">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-4 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border/50 pt-6">
                  <div className="text-lg font-semibold text-white mb-4">{service.price}</div>
                  <Button className="w-full bg-gradient-cosmic hover:shadow-glow transition-all duration-300">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-orbit opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              A proven methodology that ensures your project's success from start to finish
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 bg-gradient-cosmic rounded-full mx-auto mb-4 flex items-center justify-center text-black font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Why Choose <span className="text-gradient">BrandOrbit?</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center fade-in-up">
              <div className="w-16 h-16 bg-gradient-cosmic rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Team</h3>
              <p className="text-muted-foreground">
                Our specialists bring years of experience across all digital disciplines
              </p>
            </div>
            
            <div className="text-center fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-cosmic rounded-full mx-auto mb-4 flex items-center justify-center">
                <Settings className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Custom Solutions</h3>
              <p className="text-muted-foreground">
                Tailored strategies that fit your unique business needs and goals
              </p>
            </div>
            
            <div className="text-center fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-gradient-cosmic rounded-full mx-auto mb-4 flex items-center justify-center">
                <Check className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Proven Results</h3>
              <p className="text-muted-foreground">
                Track record of successful transformations across various industries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-orbit"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Launch Your <span className="text-gradient">Digital Transformation?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how we can elevate your brand to new heights
            </p>
            <Button size="lg" className="bg-gradient-cosmic hover:shadow-glow transition-all duration-300 text-lg px-12">
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;