import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
// import brandOrbitLogo from "@/assets/brandorbit-logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 glow-pulse">
              <div className="w-8 h-8 border-2 border-primary rounded-full relative">
                <div className="absolute inset-1 border border-primary/50 rounded-full">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold text-gradient">BrandOrbit</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 text-sm font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-cosmic group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Button className="bg-gradient-cosmic hover:shadow-glow transition-all duration-300">
              <Rocket className="w-4 h-4 mr-2" />
              Launch Your Brand
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-card/95 backdrop-blur-sm rounded-lg mt-2 border border-border">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button className="w-full bg-gradient-cosmic hover:shadow-glow transition-all duration-300">
                <Rocket className="w-4 h-4 mr-2" />
                Launch Your Brand
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;