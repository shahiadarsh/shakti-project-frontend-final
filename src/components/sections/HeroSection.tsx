import { motion } from "framer-motion";
import { SpiritualButton } from "@/components/ui/spiritual-button";
import { SpiritualCard } from "@/components/ui/spiritual-card";
import logo from "@/assets/logo.png";
import mandalaPattern from "@/assets/mandala-pattern.png";
import { useNavigate } from "react-router-dom"; 

export const HeroSection = () => {
  const navigate = useNavigate(); 

  const handleNavigateToLogin = () => {
    navigate("/admin/login");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background mandala pattern */}
      <div
        className="absolute inset-0 opacity-5 mandala-rotate"
        style={{
          backgroundImage: `url(${mandalaPattern})`,
          backgroundSize: "800px 800px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-aura-gradient opacity-30" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center space-y-8">
          {/* Animated logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              type: "spring",
              stiffness: 100,
              delay: 0.2,
            }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.img
                src={logo}
                alt="Shree Mahavidya Shaktipeeth"
                className="h-32 w-32 md:h-40 md:w-40 aura-glow"
                animate={{
                  filter: [
                    "drop-shadow(0 0 20px hsl(45 100% 68% / 0.5))",
                    "drop-shadow(0 0 40px hsl(45 100% 68% / 0.8))",
                    "drop-shadow(0 0 20px hsl(45 100% 68% / 0.5))",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 bg-aura-gradient rounded-full -z-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                Shree Mahavidya
              </span>
              <br />
              <span className="text-foreground">Shaktipeeth</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Awaken abundance, peace, and grace through guided spiritual
            practices.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="pt-8"
          >
            <SpiritualButton
              variant="divine"
              size="xl"
              className="text-lg px-12 py-4 shadow-glow"
              onClick={handleNavigateToLogin} // onClick इवेंट यहाँ जोड़ें
            >
              Continue Your Session
            </SpiritualButton>
          </motion.div>

          {/* Floating cards with stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto"
          >
            {[
              { number: "6", label: "Month Journey", icon: "🕉️" },
              { number: "10K+", label: "Devotees", icon: "🙏" },
              { number: "Weekly", label: "Live Sessions", icon: "✨" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <SpiritualCard variant="ethereal" className="text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </SpiritualCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
