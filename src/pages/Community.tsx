import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { SpiritualCard, SpiritualCardHeader, SpiritualCardTitle, SpiritualCardContent } from "@/components/ui/spiritual-card";
import { SpiritualButton } from "@/components/ui/spiritual-button";
import { Users, Heart, MessageCircle, Calendar, Star, Sparkles, Globe, BookOpen, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Community = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/admin/login");
  };

  const communityStats = [
    { icon: <Users className="h-8 w-8" />, label: "Active Members", value: "2,847", color: "text-accent" },
    { icon: <MessageCircle className="h-8 w-8" />, label: "Daily Discussions", value: "150+", color: "text-secondary" },
    { icon: <Calendar className="h-8 w-8" />, label: "Live Sessions", value: "Weekly", color: "text-primary" },
    { icon: <Heart className="h-8 w-8" />, label: "Success Stories", value: "500+", color: "text-accent" }
  ];

  const features = [
    {
      icon: <MessageCircle className="h-12 w-12" />,
      title: "Sacred Discussions",
      description: "Engage in meaningful conversations about spiritual practices, share experiences, and seek guidance from fellow seekers."
    },
    {
      icon: <Calendar className="h-12 w-12" />,
      title: "Live Sessions",
      description: "Join our weekly live sessions every Sunday at 10 AM IST for group meditation, mantra chanting, and Q&A."
    },
    {
      icon: <BookOpen className="h-12 w-12" />,
      title: "Study Groups",
      description: "Participate in group studies of sacred texts, Vedic scriptures, and deepen your understanding together."
    },
    {
      icon: <Sparkles className="h-12 w-12" />,
      title: "Progress Sharing",
      description: "Share your spiritual milestones, celebrate achievements, and inspire others on their sacred journey."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, India",
      message: "This community has been a blessing in my spiritual journey. The support and guidance I receive here is invaluable.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi, India", 
      message: "The weekly live sessions have transformed my practice. I feel more connected to the divine than ever before.",
      rating: 5
    },
    {
      name: "Anita Devi",
      location: "Bangalore, India",
      message: "Finding this sacred community was like coming home. The warmth and wisdom shared here is extraordinary.",
      rating: 5
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
              Sacred{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Community
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Connect with like-minded spiritual seekers, share your journey, and grow together 
              in a supportive environment of divine wisdom and compassion
            </p>
            <SpiritualButton onClick={handleNavigateToLogin} variant="aura" size="lg">
              <Users className="h-5 w-5 mr-2" />
              Join Our Community
            </SpiritualButton>
          </motion.div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpiritualCard variant="glow" className="text-center">
                  <SpiritualCardContent className="p-6">
                    <div className={`${stat.color} mb-4 flex justify-center`}>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </SpiritualCardContent>
                </SpiritualCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Community Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the many ways our sacred community supports your spiritual growth and connection
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpiritualCard variant="ethereal" className="h-full">
                  <SpiritualCardContent className="p-8">
                    <div className="text-accent mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </SpiritualCardContent>
                </SpiritualCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Session Schedule */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <SpiritualCard variant="divine">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Calendar className="h-8 w-8 text-accent" />
                    <h2 className="text-2xl font-bold">Weekly Live Sessions</h2>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    Join our sacred community every Sunday for guided meditation, mantra chanting, 
                    and spiritual discussions with experienced teachers.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-accent" />
                      <span>Every Sunday at 10:00 AM IST</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-accent" />
                      <span>Online via our platform</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-accent" />
                      <span>Open to all community members</span>
                    </div>
                  </div>
                  
                  <SpiritualButton onClick={handleNavigateToLogin} variant="sacred" size="lg" className="w-full">
                    Join Next Session
                  </SpiritualButton>
                </div>
                
                <div className="p-8 bg-gradient-to-br from-background/50 to-card/50">
                  <h3 className="text-xl font-semibold mb-6">What to Expect</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-medium flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Opening Meditation</h4>
                        <p className="text-sm text-muted-foreground">Collective grounding and centering practice</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-medium flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Sacred Teachings</h4>
                        <p className="text-sm text-muted-foreground">Insights from Vedic scriptures and spiritual wisdom</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-medium flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Group Practice</h4>
                        <p className="text-sm text-muted-foreground">Guided mantra chanting and energy work</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-medium flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Q&A Session</h4>
                        <p className="text-sm text-muted-foreground">Personal guidance and community support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SpiritualCard>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Community Voices</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our beloved community members about their transformative experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpiritualCard variant="glow" className="h-full">
                  <SpiritualCardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-secondary fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.message}"
                    </p>
                    
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
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
            <SpiritualCard variant="ethereal">
              <SpiritualCardContent className="p-12">
                <h2 className="text-3xl font-bold mb-6">Join Our Sacred Circle</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Become part of a loving community where spiritual growth is nurtured, 
                  wisdom is shared, and divine connection flourishes. Your spiritual family awaits.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <SpiritualButton onClick={handleNavigateToLogin} variant="aura" size="lg">
                    <Users className="h-5 w-5 mr-2" />
                    Join Community
                  </SpiritualButton>
                  <SpiritualButton onClick={handleNavigateToLogin} variant="sacred" size="lg">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Start Discussion
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