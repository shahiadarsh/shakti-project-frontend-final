import { motion } from "framer-motion";
import { SpiritualButton } from "@/components/ui/spiritual-button";
import { SpiritualCard } from "@/components/ui/spiritual-card";
import { ArrowRight, Flower, Flame, Heart } from "lucide-react";
import meditationHero from "@/assets/meditation-hero.jpg";
import { Link } from "react-router-dom"; // react-router-dom से Link import करें

export const TransformSection = () => {
  const benefits = [
    {
      icon: <Flower className="h-8 w-8" />,
      title: "Inner Peace",
      description: "Find deep tranquility through ancient practices",
    },
    {
      icon: <Flame className="h-8 w-8" />,
      title: "Spiritual Growth",
      description: "Accelerate your spiritual evolution with guided sadhana",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Divine Grace",
      description: "Connect with the divine feminine energy within",
    },
  ];

  return (
    <section id="journey" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-sm font-medium text-accent uppercase tracking-wider">
                  Transform Your Life
                </span>
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold leading-tight"
              >
                Transform Your{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Spiritual Journey
                </span>
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                Embark on a sacred path of self-discovery and divine connection.
                Our guided practices will help you unlock your inner potential
                and experience the transformative power of ancient wisdom.
              </motion.p>
            </div>

            {/* Benefits grid */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid gap-6"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="text-accent group-hover:text-secondary transition-divine">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Link to="/admin/login">
                <SpiritualButton variant="sacred" size="lg" className="group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </SpiritualButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <motion.img
                src={meditationHero}
                alt="Spiritual meditation with divine aura"
                className="rounded-2xl shadow-divine w-full h-[600px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />

              {/* Glowing overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-accent/20 rounded-2xl" />

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4"
              >
                <SpiritualCard
                  variant="glow"
                  size="sm"
                  className="backdrop-blur-md"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">🕉️</div>
                    <div className="text-sm font-medium">Divine Energy</div>
                  </div>
                </SpiritualCard>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4"
              >
                <SpiritualCard
                  variant="ethereal"
                  size="sm"
                  className="backdrop-blur-md"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">✨</div>
                    <div className="text-sm font-medium">Sacred Practice</div>
                  </div>
                </SpiritualCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
