import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { SpiritualCard, SpiritualCardHeader, SpiritualCardTitle, SpiritualCardContent } from "@/components/ui/spiritual-card";
import { SpiritualButton } from "@/components/ui/spiritual-button";
import { Calendar, Clock, Users, Play, Bell, Video, Heart, Star } from "lucide-react";

export const LiveSessions = () => {
  const upcomingSessions = [
    {
      title: "Shree Suktam Group Meditation",
      date: "This Sunday",
      time: "10:00 AM IST",
      duration: "90 minutes",
      participants: "150+",
      teacher: "Guruji Ramesh",
      description: "Weekly guided meditation with the sacred Shree Suktam mantras for abundance and prosperity.",
      isLive: false,
      featured: true
    },
    {
      title: "Mahalakshmi Mantra Chanting",
      date: "Next Wednesday", 
      time: "7:00 PM IST",
      duration: "60 minutes",
      participants: "80+",
      teacher: "Mata Priya",
      description: "Evening chanting session to invoke the blessings of Goddess Mahalakshmi.",
      isLive: false,
      featured: false
    },
    {
      title: "Spiritual Q&A Session",
      date: "This Friday",
      time: "6:00 PM IST", 
      duration: "45 minutes",
      participants: "120+",
      teacher: "Pandit Sharma",
      description: "Interactive session to address your spiritual questions and concerns.",
      isLive: false,
      featured: false
    }
  ];

  const pastSessions = [
    {
      title: "New Moon Meditation",
      date: "Last Monday",
      views: "245",
      duration: "75 minutes",
      rating: 4.9
    },
    {
      title: "Abundance Affirmations",
      date: "Last Thursday",
      views: "189",
      duration: "45 minutes",
      rating: 4.8
    },
    {
      title: "Sacred Geometry Workshop",
      date: "Last Sunday",
      views: "312",
      duration: "120 minutes",
      rating: 4.9
    }
  ];

  const sessionTypes = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Guided Meditations",
      description: "Deep meditative practices with sacred mantras and visualization techniques."
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Live Teachings",
      description: "Interactive spiritual lessons from experienced teachers and gurus."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Group Practices",
      description: "Collective chanting, prayer, and energy healing sessions with the community."
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Q&A Sessions",
      description: "Personal guidance and answers to your spiritual questions and concerns."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Live{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Sessions
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Join our sacred live sessions for guided meditations, spiritual teachings, 
              and collective practices with our global spiritual community
            </p>
            <SpiritualButton variant="aura" size="lg">
              <Video className="h-5 w-5 mr-2" />
              Join Next Session
            </SpiritualButton>
          </motion.div>
        </div>
      </section>

      {/* Live Session Alert */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <SpiritualCard variant="divine" className="border-2 border-accent/40">
              <SpiritualCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Next Live Session</h3>
                      <p className="text-sm text-muted-foreground">Sunday, 10:00 AM IST - Shree Suktam Group Meditation</p>
                    </div>
                  </div>
                  <SpiritualButton variant="sacred">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Reminder
                  </SpiritualButton>
                </div>
              </SpiritualCardContent>
            </SpiritualCard>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Sessions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mark your calendar for these transformative spiritual experiences
            </p>
          </motion.div>

          <div className="space-y-6">
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpiritualCard variant={session.featured ? "divine" : "ethereal"} className="overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        {session.featured && (
                          <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        )}
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{session.participants}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3">{session.title}</h3>
                      <p className="text-muted-foreground mb-4">{session.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm mb-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-accent" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Play className="h-4 w-4 text-accent" />
                          <span>{session.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center text-white text-sm font-medium">
                          {session.teacher.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{session.teacher}</p>
                          <p className="text-sm text-muted-foreground">Spiritual Teacher</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-br from-background/50 to-card/50 flex flex-col justify-center">
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                          <Video className="h-10 w-10 text-accent" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Join live or watch the recording later
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <SpiritualButton variant="aura" className="w-full">
                          <Video className="h-4 w-4 mr-2" />
                          Join Session
                        </SpiritualButton>
                        <SpiritualButton variant="sacred" className="w-full">
                          <Bell className="h-4 w-4 mr-2" />
                          Set Reminder
                        </SpiritualButton>
                      </div>
                    </div>
                  </div>
                </SpiritualCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Session Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Types of Sessions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore different formats of spiritual practices and teachings we offer
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sessionTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpiritualCard variant="glow" className="text-center h-full">
                  <SpiritualCardContent className="p-6">
                    <div className="text-accent mb-4 flex justify-center">
                      {type.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{type.title}</h3>
                    <p className="text-muted-foreground text-sm">{type.description}</p>
                  </SpiritualCardContent>
                </SpiritualCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Sessions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Recordings</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Missed a session? Catch up with our recent recorded sessions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastSessions.map((session, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpiritualCard variant="ethereal">
                  <SpiritualCardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-secondary fill-current" />
                        <span className="text-sm font-medium">{session.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{session.date}</span>
                    </div>
                    <SpiritualCardTitle>{session.title}</SpiritualCardTitle>
                  </SpiritualCardHeader>
                  <SpiritualCardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{session.duration}</span>
                      <span>{session.views} views</span>
                    </div>
                    
                    <div className="aspect-video bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <Play className="h-12 w-12 text-accent" />
                    </div>
                    
                    <SpiritualButton variant="sacred" className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Recording
                    </SpiritualButton>
                  </SpiritualCardContent>
                </SpiritualCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <SpiritualCard variant="divine">
              <SpiritualCardContent className="p-12">
                <h2 className="text-3xl font-bold mb-6">Never Miss a Sacred Moment</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Subscribe to our session notifications and be part of our live spiritual community. 
                  Experience the power of collective meditation and divine connection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <SpiritualButton variant="aura" size="lg">
                    <Bell className="h-5 w-5 mr-2" />
                    Enable Notifications
                  </SpiritualButton>
                  <SpiritualButton variant="sacred" size="lg">
                    <Calendar className="h-5 w-5 mr-2" />
                    View Schedule
                  </SpiritualButton>
                </div>
              </SpiritualCardContent>
            </SpiritualCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};