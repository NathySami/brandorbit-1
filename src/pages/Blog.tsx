import Navigation from "@/components/Navigation";

const Blog = () => {

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
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">
            Coming Soon
          </h2>
          <p className="text-xl text-muted-foreground max-w-lg">
            We're working on bringing you amazing content. Stay tuned for insights, strategies, and trends from the digital transformation frontier.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;