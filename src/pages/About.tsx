import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Users, Rocket, Target, Award, Calendar, MapPin } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Ismael Ibrahim",
      role: "CEO & Founder",
      description: "Visionary leader in digital transformation"
    },
    {
      name: "Elnathan Berhane",
      role: "Creative Director",
      description: "Award-winning designer specializing in brand identity"
    },
    {
      name: "Nathan Samuel",
      role: "Technical Lead",
      description: "Full-stack developer with expertise in modern web technologies"
    },
    {
      name: "Elyab Mesfin",
      role: "Strategy Director",
      description: "Digital marketing strategist driving brand growth"
    }
  ];

  const stats = [
    { icon: <Calendar className="w-6 h-6" />, label: "Years Experience", value: "15+" },
    { icon: <Users className="w-6 h-6" />, label: "Happy Clients", value: "500+" },
    { icon: <Award className="w-6 h-6" />, label: "Awards Won", value: "50+" },
    { icon: <MapPin className="w-6 h-6" />, label: "Countries Served", value: "25+" }
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
              About <span className="text-gradient">BrandOrbit</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're the digital transformation specialists pulling brands into their next orbit of success. 
              With cutting-edge technology and creative excellence, we elevate businesses to new heights.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 fade-in-up">
              <div className="text-white mb-4">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To revolutionize how businesses connect with their audience through innovative digital solutions. 
                We believe every brand has the potential to reach new orbits of success with the right digital strategy and execution.
              </p>
            </Card>
            
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-white mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading force in digital transformation, helping brands across the globe establish meaningful 
                connections with their audiences while achieving sustainable growth in the digital space.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-orbit opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 fade-in-up">
            Our <span className="text-gradient">Goal</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-white mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              The stellar minds behind BrandOrbit's success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-white/50 transition-all duration-300 hover:shadow-orbit text-center fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-20 h-20 bg-gradient-cosmic rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 fade-in-up">
            Our <span className="text-gradient">Values</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center fade-in-up">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-muted-foreground">
                We constantly push boundaries to deliver cutting-edge solutions that keep our clients ahead of the curve.
              </p>
            </div>
            
            <div className="text-center fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold mb-4">Excellence</h3>
              <p className="text-muted-foreground">
                Every project receives our full attention to detail, ensuring the highest quality deliverables.
              </p>
            </div>
            
            <div className="text-center fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold mb-4">Partnership</h3>
              <p className="text-muted-foreground">
                We believe in building long-term relationships with our clients, becoming true partners in their success.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;