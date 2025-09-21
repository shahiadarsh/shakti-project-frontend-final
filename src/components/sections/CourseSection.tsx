import { motion } from "framer-motion";
import { SpiritualButton } from "@/components/ui/spiritual-button";
import { SpiritualCard, SpiritualCardHeader, SpiritualCardTitle, SpiritualCardContent } from "@/components/ui/spiritual-card";
import { Calendar, Clock, Users, Crown, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom"; // react-router-dom से Link import करें

export const CourseSection = () => {
  const courseFeatures = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "6-Month Journey",
      description: "Complete spiritual transformation program",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Live Sessions",
      description: "Every Sunday at 10 AM",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community",
      description: "Join thousands of devotees",
    },
    {
      icon: <Crown className="h-6 w-6" />,
      title: "Expert Guidance",
      description: "Learn from experienced masters",
    },
  ];

  const benefits = [
    "Daily spiritual practices",
    "Weekly live guidance sessions",
    "Sacred mantra teachings",
    "Personalized spiritual guidance",
    "Community support & sharing",
    "Progress tracking & milestones",
  ];

  return (
    <section id="courses" className="py-20 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        animate={{
          background: [
            "linear-gradient(135deg, hsl(271 76% 19% / 0.3), hsl(271 76% 25% / 0.1))",
            "linear-gradient(135deg, hsl(271 76% 25% / 0.1), hsl(271 76% 30% / 0.3))",
            "linear-gradient(135deg, hsl(271 76% 19% / 0.3), hsl(271 76% 25% / 0.1))",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <SpiritualCard
            variant="glow"
            size="xl"
            className="relative overflow-hidden"
          >
            {/* Gradient border top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

            {/* Background decoration */}
            <div className="absolute top-4 right-4 opacity-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="h-24 w-24" />
              </motion.div>
            </div>

            <SpiritualCardHeader className="text-center mb-8">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <div className="bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Live Every Sunday at 10 AM
                  </span>
                </div>
              </motion.div>

              <SpiritualCardTitle className="text-3xl md:text-4xl lg:text-5xl mb-6">
                Join the{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  6-Month
                </span>{" "}
                Shree Suktam Sadhana Journey
              </SpiritualCardTitle>

              {/* Price */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-6"
              >
                <div className="inline-flex items-baseline space-x-2">
                  <span className="text-4xl md:text-5xl font-bold text-accent">
                    ₹699
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹2999
                  </span>
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded-lg text-sm font-medium">
                    80% OFF
                  </span>
                </div>
              </motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg text-muted-foreground max-w-3xl mx-auto"
              >
                Transform your life through ancient Vedic practices and connect
                with the divine energy of Maa Mahalakshmi in just 6 months.
              </motion.p>
            </SpiritualCardHeader>

            <SpiritualCardContent>
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left side - Features */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-semibold mb-6">
                    Course Features:
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {courseFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="text-center p-4 rounded-lg bg-background/5 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-divine group"
                      >
                        <div className="text-accent group-hover:text-secondary transition-divine mb-2 flex justify-center">
                          {feature.icon}
                        </div>
                        <h4 className="font-semibold text-sm mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right side - Benefits */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-semibold mb-6">
                    What You'll Get:
                  </h3>

                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                        className="flex items-center space-x-3 group"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent group-hover:bg-secondary transition-divine"></div>
                        <span className="text-foreground group-hover:text-accent transition-divine">
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* CTA Section */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-center pt-12 border-t border-accent/20 mt-12"
              >
                <Link to="/admin/login">
                  <SpiritualButton
                    variant="divine"
                    size="xl"
                    className="w-full md:w-auto px-12"
                  >
                    Login to Access Course
                  </SpiritualButton>
                </Link>

                <p className="text-sm text-muted-foreground mt-4">
                  Limited time offer • Join thousands of devotees already on
                  their journey
                </p>
              </motion.div>
            </SpiritualCardContent>
          </SpiritualCard>
        </motion.div>
      </div>
    </section>
  );
};
