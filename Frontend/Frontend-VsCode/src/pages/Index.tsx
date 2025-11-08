import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, BarChart3, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary">
                <TrendingUp className="h-12 w-12 text-primary-foreground" />
                <span className="text-4xl font-bold text-primary-foreground">TradeShift</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
              Trade Smarter,
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Grow Faster
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Professional trading platform with real-time market data, advanced analytics, and seamless portfolio management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8 py-6 h-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all">
            <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Real-Time Trading</h3>
            <p className="text-muted-foreground">
              Execute trades instantly with live market prices and real-time updates.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all">
            <div className="p-3 rounded-xl bg-secondary/10 w-fit mb-4">
              <BarChart3 className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground">
              Visualize your portfolio performance with interactive charts and insights.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all">
            <div className="p-3 rounded-xl bg-success/10 w-fit mb-4">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Secure & Reliable</h3>
            <p className="text-muted-foreground">
              Bank-level security to protect your investments and personal data.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all">
            <div className="p-3 rounded-xl bg-accent/10 w-fit mb-4">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Optimized for speed with instant order execution and minimal latency.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of traders who trust TradeShift for their investments
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto">
              Create Free Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
