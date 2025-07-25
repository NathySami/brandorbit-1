const AnimatedOrb = () => {
  return (
    <div className="relative w-96 h-96 mx-auto">
      {/* Outer orbit ring */}
      <div className="absolute inset-0 border-2 border-primary/30 rounded-full orbit-rotate">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full glow-pulse"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-space-purple rounded-full glow-pulse"></div>
      </div>
      
      {/* Middle orbit ring */}
      <div className="absolute inset-4 border border-cosmic-blue/40 rounded-full orbit-rotate" style={{ animationDirection: 'reverse', animationDuration: '15s' }}>
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cosmic-blue rounded-full glow-pulse"></div>
        <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full glow-pulse"></div>
      </div>
      
      {/* Inner core */}
      <div className="absolute inset-8 bg-gradient-cosmic rounded-full shadow-glow float-animation">
        <div className="absolute inset-2 border border-primary/50 rounded-full">
          <div className="absolute inset-2 bg-primary/20 rounded-full backdrop-blur-sm">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-orbit rounded-full glow-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-star-white rounded-full float-animation"></div>
      <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-primary rounded-full float-animation" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-space-purple rounded-full float-animation" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cosmic-blue rounded-full float-animation" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default AnimatedOrb;