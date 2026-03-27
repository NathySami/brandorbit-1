import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { DotGlobeHero } from "@/components/ui/globe-hero";
import { ArrowRight, Globe, Zap, Target, Rocket, Sparkles, Code, Megaphone, Settings, Laptop } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Index = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: servicesScroll } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });

  const servicesY = useTransform(servicesScroll, [0, 1], [80, -80]);
  const servicesOpacity = useTransform(servicesScroll, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const ctaScale = useTransform(ctaScroll, [0, 0.5], [0.9, 1]);
  const ctaOpacity = useTransform(ctaScroll, [0, 0.4], [0, 1]);

  const services = [
    { icon: <Code className="w-6 h-6" />, title: "Web Design & Development", description: "Cutting-edge websites that captivate and convert" },
    { icon: <Settings className="w-6 h-6" />, title: "ERP Management", description: "Streamline operations with intelligent systems" },
    { icon: <Megaphone className="w-6 h-6" />, title: "Digital Promotion", description: "Amplify your brand across all digital channels" },
    { icon: <Sparkles className="w-6 h-6" />, title: "Digital Preset Upgrades", description: "Transform your digital presence instantly" },
    { icon: <Laptop className="w-6 h-6" />, title: "Business Digital Makeover", description: "Complete digital transformation for your business" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-space">
      <Navigation />

      {/* Hero Section with Globe */}
      <DotGlobeHero rotationSpeed={0.003} globeRadius={1.3} className="min-h-screen">
        <div className="container mx-auto px-4 text-center space-y-8 pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl lg:text-7xl font-bold leading-tight"
          >
            <span className="text-gradient">Transform</span> Your Brand's
            <br />
            <span className="text-primary">Digital Orbit</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-muted-foreground max-w-lg mx-auto"
          >
            Pull your brand into its next orbit of success with cutting-edge digital transformation services that elevate your business to new heights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" onClick={() => navigate('/contact')} className="bg-gradient-cosmic hover:shadow-glow transition-all duration-300 text-lg px-8">
              <Rocket className="w-5 h-5 mr-2" />
              Launch Your Brand
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/services')} className="border-primary/50 hover:bg-primary/10 text-lg px-8">
              <Globe className="w-5 h-5 mr-2" />
              Explore Services
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex items-center justify-center space-x-8 pt-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </motion.div>
        </div>
      </DotGlobeHero>

      {/* Services Section with scroll animation */}
      <motion.section
        ref={servicesRef}
        style={{ opacity: servicesOpacity }}
        className="py-24 relative"
      >
        <div className="container mx-auto px-4">
          <motion.div style={{ y: servicesY }} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Digital Services</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive solutions to propel your brand into the digital stratosphere
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card
                  className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-orbit group cursor-pointer"
                  onClick={() => navigate('/services')}
                >
                  <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section with scroll animation */}
      <motion.section
        ref={ctaRef}
        style={{ scale: ctaScale, opacity: ctaOpacity }}
        className="py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-orbit"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Enter Your Brand's <span className="text-gradient">New Orbit?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the digital transformation revolution and watch your business reach new heights
            </p>
            <Button size="lg" className="bg-gradient-cosmic hover:shadow-glow transition-all duration-300 text-lg px-12" onClick={() => navigate('/contact')}>
              <Zap className="w-5 h-5 mr-2" />
              Start Your Journey
              <Target className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
