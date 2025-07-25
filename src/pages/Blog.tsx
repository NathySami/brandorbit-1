import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { ArrowRight, Calendar, User, Search, Tag, TrendingUp } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    title: "The Future of Digital Transformation in 2024",
    excerpt: "Explore the latest trends and technologies shaping the digital landscape and how businesses can stay ahead of the curve.",
    author: "Alex Chen",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Digital Strategy",
    tags: ["AI", "Digital Transformation", "Future Trends"]
  };

  const blogPosts = [
    {
      title: "10 Essential SEO Strategies for Modern Businesses",
      excerpt: "Discover the latest SEO techniques that will boost your search rankings and drive organic traffic to your website.",
      author: "Sarah Johnson",
      date: "December 12, 2024",
      readTime: "6 min read",
      category: "SEO",
      tags: ["SEO", "Marketing", "Growth"]
    },
    {
      title: "Building User-Centric Websites: A Designer's Guide",
      excerpt: "Learn how to create websites that prioritize user experience and drive meaningful engagement with your audience.",
      author: "Marcus Rodriguez",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Design",
      tags: ["UX/UI", "Web Design", "User Experience"]
    },
    {
      title: "ERP Implementation: Best Practices for Success",
      excerpt: "A comprehensive guide to implementing ERP systems that transform business operations and drive efficiency.",
      author: "Emily Park",
      date: "December 8, 2024",
      readTime: "9 min read",
      category: "Technology",
      tags: ["ERP", "Business", "Technology"]
    },
    {
      title: "Social Media Marketing Trends to Watch",
      excerpt: "Stay ahead of the competition with these emerging social media marketing strategies and platform updates.",
      author: "Sarah Johnson",
      date: "December 5, 2024",
      readTime: "5 min read",
      category: "Marketing",
      tags: ["Social Media", "Marketing", "Trends"]
    },
    {
      title: "The Power of Brand Storytelling in Digital Age",
      excerpt: "Learn how compelling brand narratives can create emotional connections and drive customer loyalty.",
      author: "Alex Chen",
      date: "December 3, 2024",
      readTime: "6 min read",
      category: "Branding",
      tags: ["Branding", "Storytelling", "Marketing"]
    },
    {
      title: "Cybersecurity Best Practices for Small Businesses",
      excerpt: "Essential security measures every small business should implement to protect their digital assets.",
      author: "Marcus Rodriguez",
      date: "December 1, 2024",
      readTime: "8 min read",
      category: "Security",
      tags: ["Cybersecurity", "Business", "Protection"]
    }
  ];

  const categories = [
    { name: "All Posts", count: 24 },
    { name: "Digital Strategy", count: 8 },
    { name: "SEO", count: 6 },
    { name: "Design", count: 5 },
    { name: "Marketing", count: 7 },
    { name: "Technology", count: 4 },
    { name: "Branding", count: 3 }
  ];

  const popularTags = [
    "Digital Transformation", "SEO", "Web Design", "Marketing", "Branding",
    "UX/UI", "Technology", "Business Growth", "Social Media", "E-commerce"
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
              BrandOrbit <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Insights, strategies, and trends from the digital transformation frontier
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Search */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Search Posts
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full p-3 bg-background/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-primary/50"
                />
                <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
              </div>
            </Card>

            {/* Categories */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-background/50 rounded cursor-pointer transition-colors">
                    <span className="text-sm text-muted-foreground">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">{category.count}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Popular Tags */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Newsletter */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest insights delivered to your inbox
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-3 bg-background/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-primary/50"
                />
                <Button className="w-full bg-gradient-cosmic hover:shadow-glow transition-all duration-300">
                  Subscribe
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Featured Post */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-white/50 transition-all duration-300 hover:shadow-orbit fade-in-up">
              <Badge variant="outline" className="text-primary border-primary/50 mb-4">
                Featured Post
              </Badge>
              
              <h2 className="text-3xl font-bold mb-4 hover:text-white transition-colors cursor-pointer">
                {featuredPost.title}
              </h2>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {featuredPost.date}
                </div>
                <span>{featuredPost.readTime}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{featuredPost.category}</Badge>
                  {featuredPost.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button className="bg-gradient-cosmic hover:shadow-glow transition-all duration-300">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Recent Posts Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Posts</h2>
              <div className="flex items-center text-muted-foreground">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span className="text-sm">Latest insights</span>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.map((post, index) => (
                <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-white/50 transition-all duration-300 hover:shadow-orbit group fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  
                  <div className="mb-4">
                    <Badge variant="secondary" className="text-xs mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.date}
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full border-primary/50 hover:bg-primary/10">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center pt-8">
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                Load More Posts
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;