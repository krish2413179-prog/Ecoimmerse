import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
// import Header from 'components/ui/Header'; // <-- 1. DELETED THIS LINE
import { Link } from 'react-router-dom'; // <-- ADDED THIS IMPORT FOR THE FOOTER
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import ImpactCounters from './components/ImpactCounters';
import PersonalizedWelcome from './components/PersonalizedWelcome';
import VoiceInteraction from './components/VoiceInteraction';
import Icon from 'components/AppIcon';
import { useIPFSData } from '../../utils/useIPFSData';
import IPFSStatus from '../../components/ui/IPFSStatus';

const ImmersiveHomepage = () => {
  const { userId, syncStatus } = useIPFSData();

  const [showVoicePanel, setShowVoicePanel] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const initializeAudio = () => {
      if (soundEnabled) {
        console.log('Ambient nature sounds initialized');
      }
    };
    initializeAudio();
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const FloatingActionButtons = () => (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col space-y-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowVoicePanel(!showVoicePanel)}
        className={`w-14 h-14 rounded-full flex items-center justify-center organic-shadow organic-transition ${
          showVoicePanel 
            ? 'bg-secondary text-white' :'bg-card text-secondary hover:bg-secondary hover:text-white'
        }`}
      >
        <Icon name="Mic" size={24} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSound}
        className={`w-14 h-14 rounded-full flex items-center justify-center organic-shadow organic-transition ${
          soundEnabled 
            ? 'bg-primary text-white' :'bg-card text-primary hover:bg-primary hover:text-white'
        }`}
      >
        <Icon name={soundEnabled ? "Volume2" : "VolumeX"} size={24} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-14 h-14 rounded-full bg-card text-foreground hover:bg-foreground hover:text-card flex items-center justify-center organic-shadow organic-transition"
      >
        <Icon name="ArrowUp" size={24} />
      </motion.button>
    </div>
  );

  const VoicePanel = () => (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      className="fixed right-6 bottom-24 z-50 w-96 max-w-[calc(100vw-3rem)]"
    >
      <VoiceInteraction />
    </motion.div>
  );

  const footerLinks = [
      { name: 'Dashboard', path: '/personal-impact-dashboard' },
      { name: 'Forest', path: '/forest-dashboard' }
  ];

  return (
    <>
      <Helmet>
        <title>Ecoimmerse - Every Action Creates Ripples of Change</title>
        <meta 
          name="description" 
          content="Transform your environmental impact through immersive 3D experiences, community challenges, and real-time visualization. Join 89,500+ eco-warriors making a difference." 
        />
        <meta name="keywords" content="sustainability, environmental impact, eco-friendly, community challenges, carbon offset, green living" />
        <meta property="og:title" content="Ecoimmerse - Every Action Creates Ripples of Change" />
        <meta property="og:description" content="Immersive environmental impact platform with 3D visualization, voice commands, and community challenges." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* <Header /> */} {/* <-- 2. DELETED THIS LINE */}

        <PersonalizedWelcome />

        <main className="pt-16">
          <HeroSection />
          <TimelineSection />
          <div id="impact-section">
            <ImpactCounters />
          </div>

          <section className="py-20 lg:py-32 bg-gradient-to-br from-surface to-muted">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-6xl font-poppins font-bold text-primary mb-6">
                  Join Our Growing Forest
                </h2>
                <p className="text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                  Connect with eco-warriors worldwide and see how your actions contribute 
                  to our collective environmental impact visualization.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="bg-card rounded-2xl p-8 organic-shadow">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Icon name="Globe" size={24} className="text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">Global Reach</h3>
                        <p className="text-text-secondary">Active in 127 countries</p>
                      </div>
                    </div>
                    <p className="text-text-secondary">
                      Our community spans across continents, creating local impact 
                      with global awareness and shared sustainability goals.
                    </p>
                  </div>
                  <div className="bg-card rounded-2xl p-8 organic-shadow">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-trust-builder/20 flex items-center justify-center">
                        <Icon name="Award" size={24} className="text-trust-builder" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">Recognition</h3>
                        <p className="text-text-secondary">UN Sustainability Partner</p>
                      </div>
                    </div>
                    <p className="text-text-secondary">
                      Officially recognized by leading environmental organizations 
                      for our innovative approach to community-driven sustainability.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 h-96 flex items-center justify-center organic-shadow">
                    <div className="text-center">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0] 
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                        className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 mx-auto"
                      >
                        <Icon name="TreePine" size={48} className="text-primary" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-foreground mb-4">
                        Interactive 3D Forest
                      </h4>
                      <p className="text-text-secondary">
                        Watch our community forest grow in real-time as members 
                        complete sustainability challenges and share their impact.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* <!-- 3. FIX THE BROKEN LINKS IN THE FOOTER --> */}
          <footer className="bg-primary text-primary-foreground py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <Icon name="Leaf" size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Ecoimmerse</h3>
                      <p className="text-primary-foreground/80">Growing Together</p>
                    </div>
                  </div>
                  <p className="text-primary-foreground/90 mb-6 max-w-md">
                    Transforming environmental awareness into measurable impact through 
                    immersive technology and community-driven sustainability challenges.
                  </p>
                  <div className="flex space-x-4">
                    {['Twitter', 'Facebook', 'Instagram', 'Linkedin']?.map((social) => (
                      <motion.button
                        key={social}
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-secondary flex items-center justify-center organic-transition"
                      >
                        <Icon name={social} size={20} />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    {footerLinks?.map((link) => (
                      <li key={link.name}>
                        <Link 
                          to={link.path} 
                          className="text-primary-foreground/80 hover:text-white organic-transition"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Connect</h4>
                  <ul className="space-y-2">
                    <li className="text-primary-foreground/80">Jayant Kumar</li>
                    <li className="text-primary-foreground/80">Suryanshi Singh</li>
                    <li className="text-primary-foreground/80">Lucky Yadav</li>
                    <li className="text-primary-foreground/80">Amit Kumar</li>
                    <li className="text-primary-foreground/80">Banti Kumar Sharma</li>
                    <li className="text-primary-foreground/80">Divesh Jha</li>
                    <li className="text-primary-foreground/80">Ishita Pandey</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
                <p className="text-primary-foreground/80">
                  © {new Date()?.getFullYear()} Ecoimmerse. All rights reserved. 
                  Making sustainability accessible and rewarding for everyone.
                </p>
              </div>
            </div>
          </footer>
        </main>

        <FloatingActionButtons />
        {showVoicePanel && <VoicePanel />}
        <IPFSStatus syncStatus={syncStatus} userId={userId} />
      </div>
    </>
  );
};

export default ImmersiveHomepage;