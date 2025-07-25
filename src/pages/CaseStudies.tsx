import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { ArrowRight, TrendingUp, Users, Award, ExternalLink } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "TechFlow Solutions",
      category: "SaaS Platform",
      image: "placeholder",
      challenge: "Outdated website with poor conversion rates and limited user engagement",
      solution: "Complete digital makeover including new branding, responsive website, and SEO optimization",
      results: [
        { metric: "Conversion Rate", improvement: "+245%" },
        { metric: "Organic Traffic", improvement: "+180%" },
        { metric: "User Engagement", improvement: "+320%" }
      ],
      tags: ["Web Development", "SEO", "Branding"],
      timeline: "3 months"
    },
    {
      title: "GreenEarth Retail",
      category: "E-commerce",
      image: "placeholder",
      challenge: "Low online sales and inefficient inventory management system",
      solution: "Custom e-commerce platform with integrated ERP system and digital marketing strategy",
      results: [
        { metric: "Online Sales", improvement: "+400%" },
        { metric: "Inventory Efficiency", improvement: "+150%" },
        { metric: "Customer Retention", improvement: "+85%" }
      ],
      tags: ["E-commerce", "ERP", "Digital Marketing"],
      timeline: "4 months"
    },
    {
      title: "MedCare Clinic",
      category: "Healthcare",
      image: "placeholder",
      challenge: "Poor online presence and outdated patient management system",
      solution: "Modern website with appointment booking system and comprehensive digital marketing",
      results: [
        { metric: "Online Appointments", improvement: "+300%" },
        { metric: "Patient Acquisition", improvement: "+120%" },
        { metric: "Operational Efficiency", improvement: "+200%" }
      ],
      tags: ["Healthcare", "Booking System", "SEO"],
      timeline: "2 months"
    },
    {
      title: "FinanceForward",
      category: "Fintech",
      image: "placeholder",
      challenge: "Complex financial services needed simplified digital presence",
      solution: "User-friendly platform design with automated processes and compliance features",
      results: [
        { metric: "User Signups", improvement: "+280%" },
        { metric: "Process Automation", improvement: "+350%" },
        { metric: "Compliance Efficiency", improvement: "+175%" }
      ],
      tags: ["Fintech", "Automation", "Compliance"],
      timeline: "5 months"
    },
    {
      title: "EduTech Academy",
      category: "Education",
      image: "placeholder",
      challenge: "Traditional learning platform needed modernization for better student engagement",
      solution: "Interactive learning management system with gamification and analytics",
      results: [
        { metric: "Student Engagement", improvement: "+220%" },
        { metric: "Course Completion", improvement: "+165%" },
        { metric: "Instructor Productivity", improvement: "+140%" }
      ],
      tags: ["EdTech", "LMS", "Gamification"],
      timeline: "6 months"
    },
    {
      title: "StyleHub Fashion",
      category: "Fashion Retail",
      image: "placeholder",
      challenge: "Limited online presence in competitive fashion market",
      solution: "Brand repositioning with influencer marketing and social commerce integration",
      results: [
        { metric: "Brand Awareness", improvement: "+380%" },
        { metric: "Social Media Reach", improvement: "+450%" },
        { metric: "Online Revenue", improvement: "+290%" }
      ],
      tags: ["Fashion", "Social Commerce", "Influencer Marketing"],
      timeline: "3 months"
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
              Case <span className="text-gradient">Studies</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Real stories of digital transformation success. See how we've helped brands reach new orbits of growth.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-orbit opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="fade-in-up">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-white mb-2">250%</div>
              <div className="text-muted-foreground">Average Growth</div>
            </div>
            <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-muted-foreground">Industry Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-white/50 transition-all duration-300 hover:shadow-orbit group fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-primary border-primary/50">
                      {study.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{study.timeline}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                    {study.title}
                  </h3>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Challenge</h4>
                    <p className="text-muted-foreground text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Solution</h4>
                    <p className="text-muted-foreground text-sm">{study.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-4">Results</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <span className="text-sm text-muted-foreground">{result.metric}</span>
                        <span className="font-bold text-primary flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {result.improvement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* CTA */}
                <Button variant="outline" className="w-full border-primary/50 hover:bg-primary/10">
                  View Full Case Study
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Industries We've <span className="text-gradient">Transformed</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Our expertise spans across diverse sectors, delivering tailored solutions for every industry
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Healthcare", "Finance", "E-commerce", "Education",
              "Technology", "Fashion", "Real Estate", "Manufacturing",
              "Food & Beverage", "Tourism", "Non-profit", "Automotive"
            ].map((industry, index) => (
              <div key={index} className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-lg hover:bg-card/50 transition-all duration-300 fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="text-white mb-2">
                  <Award className="w-6 h-6 mx-auto" />
                </div>
                <span className="text-muted-foreground">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-orbit"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Become Our Next <span className="text-gradient">Success Story?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how we can transform your brand and achieve similar results
            </p>
            <Button size="lg" className="bg-gradient-cosmic hover:shadow-glow transition-all duration-300 text-lg px-12">
              Start Your Transformation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;