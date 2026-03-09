import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // <-- 1. UPDATED THE NAVIGATION LINKS
  const navigationItems = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'Dashboard', path: '/personal-impact-dashboard', icon: 'BarChart3' },
    { name: 'Forest', path: '/forest-dashboard', icon: 'Trees' },
  ];

  const secondaryItems = [
    { name: 'Settings', path: '/settings', icon: 'Settings' },
    { name: 'Help', path: '/help', icon: 'HelpCircle' },
    { name: 'Profile', path: '/profile', icon: 'User' },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="organic-transition hover:scale-105"
        >
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="var(--color-primary)"
            className="animate-pulse-gentle"
          />
          <path
            d="M12 28C12 24 14 20 20 16C26 20 28 24 28 28"
            stroke="var(--color-secondary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle
            cx="20"
            cy="14"
            r="3"
            fill="var(--color-secondary)"
            className="animate-float"
          />
          <path
            d="M16 22L18 24L24 18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-conversion-accent rounded-full animate-pulse-gentle"></div>
      </div>
      <div className="flex flex-col">
        <span className="font-poppins font-bold text-xl text-primary tracking-tight">
          Ecoimmerse
        </span>
        <span className="font-inter text-xs text-text-secondary -mt-1">
          Growing Together
        </span>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 organic-transition ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-organic organic-shadow border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-6">
          {/* <-- 2. UPDATED THE LOGO LINK */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-organic organic-transition ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground organic-shadow'
                    : 'text-foreground hover:bg-muted hover:text-primary'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-inter font-medium">{item?.name}</span>
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-organic organic-transition text-foreground hover:bg-muted hover:text-primary">
                <Icon name="MoreHorizontal" size={18} />
                <span className="font-inter font-medium">More</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-organic organic-shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible organic-transition">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className="flex items-center space-x-3 px-4 py-2 text-popover-foreground hover:bg-muted organic-transition"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span className="font-inter">{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Mic"
              iconPosition="left"
              className="organic-transition hover:scale-105"
            >
              Voice Command
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Leaf"
              iconPosition="left"
              className="bg-conversion-accent hover:bg-conversion-accent/90 text-white organic-transition hover:scale-105"
            >
              Start Journey
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-organic organic-transition hover:bg-muted"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border organic-shadow">
            <div className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-organic organic-transition ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-inter font-medium">{item?.name}</span>
                </Link>
              ))}
              
              <div className="border-t border-border pt-2 mt-4">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-organic organic-transition text-foreground hover:bg-muted"
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-inter">{item?.name}</span>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Mic"
                  iconPosition="left"
                >
                  Voice Command
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="Leaf"
                  iconPosition="left"
                  className="bg-conversion-accent hover:bg-conversion-accent/90 text-white"
                >
                  Start Journey
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;