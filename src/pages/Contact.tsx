import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, Globe } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["Addis Ababa, Ethiopia"],
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

  const offices = [
    {
      city: "Addis Ababa",
      address: "COMING SOON !!",
      phone: "+251941438850",
      email: "brandorbit1@gmail.com"
    }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
      url: "https://instagram.com/YOUR_USERNAME",
      color: "from-pink-500 to-purple-500",
      description: "DM us on Instagram"
    },
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      url: "https://wa.me/YOUR_NUMBER",
      color: "from-green-500 to-green-600",
      description: "Chat on WhatsApp"
    },
    {
      name: "Telegram",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      url: "https://t.me/YOUR_USERNAME",
      color: "from-blue-400 to-blue-500",
      description: "Message us on Telegram"
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
              Ready to launch your brand into its next orbit? Reach out to us through your preferred platform.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Social Media DMs Section */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 fade-in-up">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Message Us Directly</h2>
                <p className="text-muted-foreground">
                  Choose your preferred platform and send us a direct message. We'll respond within 24 hours.
                </p>
              </div>

              <div className="grid sm:grid-cols-1 gap-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-orbit">
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          {social.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">{social.name}</h3>
                          <p className="text-muted-foreground text-sm">{social.description}</p>
                        </div>
                        <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
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
