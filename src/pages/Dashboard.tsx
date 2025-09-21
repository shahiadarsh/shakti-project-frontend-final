import { motion, AnimatePresence, useMotionValue, useTransform, animate, Variants } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { SpiritualCard, SpiritualCardHeader, SpiritualCardTitle, SpiritualCardContent } from "@/components/ui/spiritual-card";
import { SpiritualButton } from "@/components/ui/spiritual-button";
import { Play, Book, Mic, Calendar, Flame, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";

const AnimatedCounter = ({ to }: { to: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [to, count]);

  return <motion.div>{rounded}</motion.div>;
};

export const Dashboard = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const libraryTabs = [
    { id: 'videos', label: 'Videos', icon: <Play className="h-4 w-4" />, count: 24 },
    { id: 'ebooks', label: 'Ebooks', icon: <Book className="h-4 w-4" />, count: 12 },
    { id: 'voice', label: 'Voice Notes', icon: <Mic className="h-4 w-4" />, count: 18 }
  ];

  const [activeTab, setActiveTab] = useState('videos');

  const streak = 7;
  const progress = 35;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900 text-foreground">
      <Header isLoggedIn={true} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Devotee</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
              Continue your sacred journey today
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="grid lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-8">
              <motion.div variants={itemVariants}>
                <SpiritualCard variant="divine" size="lg">
                  <SpiritualCardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="relative"
                      >
                        <Calendar className="h-12 w-12 text-accent" />
                        <div className="absolute -inset-3 bg-accent/10 rounded-full -z-10" />
                      </motion.div>
                    </div>
                    <SpiritualCardTitle className="text-2xl md:text-3xl">
                      Today's Sacred Practice
                    </SpiritualCardTitle>
                    <p className="text-primary-foreground/80 mt-2">
                      Day 35 of your spiritual journey
                    </p>
                  </SpiritualCardHeader>
                  <SpiritualCardContent className="text-center">
                    <div className="bg-background/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                      <p className="text-sm text-primary-foreground/70 mb-4">Next unlock in:</p>
                      <div className="flex justify-center space-x-4">
                        {Object.entries(timeLeft).map(([unit, value]) => (
                          <div key={unit} className="bg-accent/10 backdrop-blur-sm rounded-lg p-3 min-w-[70px] text-center">
                            <AnimatePresence mode="popLayout">
                              <motion.div
                                key={value}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="text-3xl font-bold text-accent h-9"
                              >
                                {String(value).padStart(2, '0')}
                              </motion.div>
                            </AnimatePresence>
                            <div className="text-xs text-primary-foreground/60 capitalize mt-1">{unit}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <SpiritualButton variant="sacred" size="xl" className="w-full">
                      <Play className="mr-2 h-6 w-6" />
                      Watch Today's Video
                    </SpiritualButton>
                  </SpiritualCardContent>
                </SpiritualCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <SpiritualCard variant="ethereal">
                  <SpiritualCardHeader>
                    <SpiritualCardTitle className="text-xl">Sacred Library</SpiritualCardTitle>
                  </SpiritualCardHeader>
                  <SpiritualCardContent>
                    <div className="flex space-x-1 bg-background/20 backdrop-blur-sm rounded-lg p-1 mb-6">
                      {libraryTabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className="flex-1 relative flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-colors text-muted-foreground hover:text-foreground"
                        >
                          {activeTab === tab.id && (
                            <motion.div
                              layoutId="active-tab-indicator"
                              className="absolute inset-0 bg-accent rounded-md shadow-sacred"
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            />
                          )}
                          <span className="relative z-10 flex items-center space-x-2">
                            {tab.icon}
                            <span className={`font-medium ${activeTab === tab.id ? 'text-accent-foreground' : ''}`}>{tab.label}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${activeTab === tab.id ? 'bg-black/20 text-accent-foreground' : 'bg-accent/20'}`}>
                              {tab.count}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                      >
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ y: -5, scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-accent/20 hover:border-accent/40 transition-colors cursor-pointer group"
                          >
                            <div className="aspect-square bg-sacred-gradient rounded-lg mb-3 flex items-center justify-center group-hover:shadow-sacred transition-shadow">
                              <Play className="h-6 w-6 text-accent-foreground" />
                            </div>
                            <h4 className="font-medium text-sm group-hover:text-accent transition-colors">
                              {activeTab === 'videos' ? 'Sacred Mantra' : activeTab === 'ebooks' ? 'Divine Text' : 'Guided Meditation'} {i + 1}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {activeTab === 'videos' ? '15 min' : activeTab === 'ebooks' ? '24 pages' : '20 min'}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </SpiritualCardContent>
                </SpiritualCard>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <SpiritualCard variant="glow">
                  <SpiritualCardHeader className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="flex justify-center mb-3 drop-shadow-[0_0_10px_var(--primary)]"
                    >
                      <Flame className="h-10 w-10 text-primary" />
                    </motion.div>
                    <SpiritualCardTitle className="text-xl">Daily Streak</SpiritualCardTitle>
                  </SpiritualCardHeader>
                  <SpiritualCardContent className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">
                      <AnimatedCounter to={streak} />
                    </div>
                    <p className="text-sm text-muted-foreground">Days in a row</p>
                    <p className="text-xs text-accent mt-2">Keep the divine flame burning! 🔥</p>
                  </SpiritualCardContent>
                </SpiritualCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <SpiritualCard variant="ethereal">
                  <SpiritualCardHeader>
                    <SpiritualCardTitle className="text-xl flex items-center">
                      <Star className="h-5 w-5 text-accent mr-2" /> Progress
                    </SpiritualCardTitle>
                  </SpiritualCardHeader>
                  <SpiritualCardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Journey Completion</span>
                          <span className="text-accent font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-background/20 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            className="bg-sacred-gradient h-3 rounded-full shadow-sacred"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center pt-2">
                        <div>
                          <div className="text-3xl font-bold text-accent"><AnimatedCounter to={35} /></div>
                          <div className="text-xs text-muted-foreground">Days Completed</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-secondary"><AnimatedCounter to={65} /></div>
                          <div className="text-xs text-muted-foreground">Days Remaining</div>
                        </div>
                      </div>
                    </div>
                  </SpiritualCardContent>
                </SpiritualCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <SpiritualCard>
                  <SpiritualCardHeader>
                    <SpiritualCardTitle className="text-xl">Quick Actions</SpiritualCardTitle>
                  </SpiritualCardHeader>
                  <SpiritualCardContent className="space-y-3">
                    {[
                      { icon: <Clock className="mr-3 h-4 w-4" />, text: 'Schedule Reminder' },
                      { icon: <Book className="mr-3 h-4 w-4" />, text: 'Download Ebook' },
                      { icon: <Mic className="mr-3 h-4 w-4" />, text: 'Voice Guidance' }
                    ].map((action, i) => (
                      <motion.div key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <SpiritualButton variant="outline" size="sm" className="w-full justify-start">
                          {action.icon}
                          {action.text}
                        </SpiritualButton>
                      </motion.div>
                    ))}
                  </SpiritualCardContent>
                </SpiritualCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};