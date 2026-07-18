/**
 * HomeLayout
 * MediFlow marketing homepage layout
 * Features: Top navigation, hero section, features
 */

import React, { ReactNode } from "react";
import Button from "@/components/Button";

interface HomeLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({
  children,
  showNavigation = true,
  showFooter = true,
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      {showNavigation && (
        <nav className="sticky top-0 z-50 bg-white border-b border-hairline">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-12">
              <h1 className="text-2xl font-bold text-primary">MediFlow</h1>

              <ul className="hidden md:flex gap-8">
                <li>
                  <a href="#features" className="text-slate hover:text-ink transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-slate hover:text-ink transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-slate hover:text-ink transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-slate hover:text-ink transition-colors">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="secondary" size="md">
                Sign In
              </Button>
              <Button variant="primary" size="md">
                Get Started
              </Button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      {showFooter && (
        <footer className="bg-ink text-white mt-20">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {/* Column 1 */}
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-muted">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Security
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-muted">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-muted">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      API Docs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 4 */}
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-muted">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      HIPAA
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-charcoal pt-8 flex items-center justify-between">
              <p className="text-muted">&copy; 2024 MediFlow. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="text-muted hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-muted hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-muted hover:text-white transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default HomeLayout;
