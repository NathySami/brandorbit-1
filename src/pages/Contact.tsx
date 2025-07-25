import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Calendar, Globe } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["Addis Ababa,Ethiopia"],
      action: "Get Directions"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+251941438850", "+251942409721", "Mon-Fri 9AM-6PM PST"],
      action: "Call Now"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["brandorbit1@gmail.com"],
      action: "Send Email"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM", "Sunday: Closed"],
      action: "Schedule Meeting"
    }
  ];

  const services = [
    "Web Design & Development",
    "ERP Management",
    "SEO Management",
    "Digital Promotion",
    "Digital Preset Upgrades",
    "Business Digital Makeover",
    "Other"
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Digital Avenue, CA 94102",
      phone: "+1 (555) 123-4567",
      email: "sf@brandorbit.com"
    },
    {
      city: "New York",
      address: "456 Innovation Street, NY 10001",
      phone: "+1 (555) 234-5678",
      email: "ny@brandorbit.com"
    },
    {
      city: "London",
      address: "789 Tech Lane, EC2A 4BX",
      phone: "+44 20 7123 4567",
      email: "london@brandorbit.com"
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
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to launch your brand into its next orbit? Let's discuss how we can transform your digital presence.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 fade-in-up">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Start Your Project</h2>
                <p className="text-muted-foreground">
                  Tell us about your project and we'll get back to you within 24 hours with a tailored proposal.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <Input placeholder="John" className="bg-background/50 border-border/50 focus:border-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <Input placeholder="Doe" className="bg-background/50 border-border/50 focus:border-primary/50" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input type="email" placeholder="john@company.com" className="bg-background/50 border-border/50 focus:border-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input placeholder="+1 (555) 123-4567" className="bg-background/50 border-border/50 focus:border-primary/50" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <Input placeholder="Your Company" className="bg-background/50 border-border/50 focus:border-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <Input placeholder="www.yoursite.com" className="bg-background/50 border-border/50 focus:border-primary/50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Interested In</label>
                  <select className="w-full p-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-primary/50">
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Budget</label>
                  <select className="w-full p-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-primary/50">
                    <option value="">Select budget range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-plus">$50,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Timeline</label>
                  <select className="w-full p-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-primary/50">
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="2-3-months">2-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-plus-months">6+ months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Details *</label>
                  <Textarea 
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    rows={6}
                    className="bg-background/50 border-border/50 focus:border-primary/50"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="newsletter" className="w-4 h-4" />
                  <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                    Subscribe to our newsletter for digital marketing insights and updates
                  </label>
                </div>

                <Button size="lg" className="w-full bg-gradient-cosmic hover:shadow-glow transition-all duration-300">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Quick Contact */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 fade-in-up">
              <h3 className="text-xl font-bold mb-6">Quick Contact</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start border-primary/50 hover:bg-primary/10">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat Support
                </Button>
                <Button variant="outline" className="w-full justify-start border-primary/50 hover:bg-primary/10">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule a Call
                </Button>
                <Button variant="outline" className="w-full justify-start border-primary/50 hover:bg-primary/10">
                  <Globe className="w-4 h-4 mr-2" />
                  Virtual Consultation
                </Button>
              </div>
            </Card>

            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-white/50 transition-all duration-300 hover:shadow-orbit fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-white mb-4">
                  {info.icon}
                </div>
                <h3 className="font-semibold mb-3">{info.title}</h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground text-sm">{detail}</p>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/10">
                  {info.action}
                </Button>
              </Card>
            ))}

            {/* Office Locations */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 fade-in-up">
              <h3 className="text-xl font-bold mb-6">Our Offices</h3>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="border-b border-border/50 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-semibold mb-2">{office.city}</h4>
                    <p className="text-muted-foreground text-sm mb-1">{office.address}</p>
                    <p className="text-muted-foreground text-sm mb-1">{office.phone}</p>
                    <p className="text-muted-foreground text-sm">{office.email}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-orbit opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="fade-in-up">
                <h3 className="font-semibold mb-2">How long does a typical project take?</h3>
                <p className="text-muted-foreground text-sm">Project timelines vary based on scope and complexity. Most projects range from 4-12 weeks.</p>
              </div>
              <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-semibold mb-2">Do you work with small businesses?</h3>
                <p className="text-muted-foreground text-sm">Yes! We work with businesses of all sizes, from startups to enterprise organizations.</p>
              </div>
              <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
                <h3 className="font-semibold mb-2">What's included in your maintenance plans?</h3>
                <p className="text-muted-foreground text-sm">Our maintenance plans include updates, security monitoring, backups, and ongoing support.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h3 className="font-semibold mb-2">Can you help with ongoing marketing?</h3>
                <p className="text-muted-foreground text-sm">Absolutely! We offer comprehensive digital marketing services including SEO, PPC, and social media.</p>
              </div>
              <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h3 className="font-semibold mb-2">Do you provide training for our team?</h3>
                <p className="text-muted-foreground text-sm">Yes, we provide comprehensive training to ensure your team can effectively manage your new systems.</p>
              </div>
              <div className="fade-in-up" style={{ animationDelay: '0.5s' }}>
                <h3 className="font-semibold mb-2">What makes BrandOrbit different?</h3>
                <p className="text-muted-foreground text-sm">Our holistic approach combines technical expertise with creative excellence and strategic thinking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;