import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AnimatedOrb from "@/components/AnimatedOrb";
import { ArrowRight, Globe, Zap, Target, Rocket, Sparkles, Code, BarChart3, Search, Megaphone, Settings, Laptop } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const navigate = useNavigate();
  const services = [{
    icon: <Code className="w-6 h-6" />,
    title: "Web Design & Development",
    description: "Cutting-edge websites that captivate and convert"
  }, {
    icon: <Settings className="w-6 h-6" />,
    title: "ERP Management",
    description: "Streamline operations with intelligent systems"
  }, {
    icon: <Search className="w-6 h-6" />,
    title: "SEO Management",
    description: "Dominate search results and drive organic growth"
  }, {
    icon: <Megaphone className="w-6 h-6" />,
    title: "Digital Promotion",
    description: "Amplify your brand across all digital channels"
  }, {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Digital Preset Upgrades",
    description: "Transform your digital presence instantly"
  }, {
    icon: <Laptop className="w-6 h-6" />,
    title: "Business Digital Makeover",
    description: "Complete digital transformation for your business"
  }];
  return <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8 fade-in-up">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient">Transform</span> Your Brand's
                <br />
                <span className="text-primary">Digital Orbit</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Pull your brand into its next orbit of success with cutting-edge digital transformation services that elevate your business to new heights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" onClick={() => navigate('/contact')} className="bg-gradient-cosmic hover:shadow-glow transition-all duration-300 text-lg px-8">
                  <Rocket className="w-5 h-5 mr-2" />
                  Launch Your Brand
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button size="lg" variant="outline" onClick={() => navigate('/services')} className="border-primary/50 hover:bg-primary/10 text-lg px-8">
                  <Globe className="w-5 h-5 mr-2" />
                  Explore Services
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-8 pt-8">
                <div className="text-center">
                  
                  
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-300 px-0 py-0 my-0 mx-0">98%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end fade-in-up" style={{
            animationDelay: '0.3s'
          }}>
              <AnimatedOrb />
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/12 w-2 h-2 bg-white rounded-full float-animation"></div>
        <div className="absolute top-1/3 right-1/12 w-1 h-1 bg-gray-300 rounded-full float-animation" style={{
        animationDelay: '2s'
      }}></div>
        <div className="absolute bottom-1/4 left-1/6 w-1.5 h-1.5 bg-gray-400 rounded-full float-animation" style={{
        animationDelay: '4s'
      }}></div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Digital Services</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive solutions to propel your brand into the digital stratosphere
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => <Card key={index} className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-white/50 transition-all duration-300 hover:shadow-orbit group fade-in-up" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="text-white group-hover:text-gray-300 transition-colors duration-300 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-orbit"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Enter Your Brand's <span className="text-gradient">New Orbit?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the digital transformation revolution and watch your business reach new heights
            </p>
            <Button size="lg" className="bg-gradient-cosmic hover:shadow-glow transition-all duration-300 text-lg px-12">
              <Zap className="w-5 h-5 mr-2" />
              Start Your Journey
              <Target className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;