import { motion } from "framer-motion";
import { SpiritualButton } from "@/components/ui/spiritual-button";
import { SpiritualCard, SpiritualCardHeader, SpiritualCardTitle, SpiritualCardContent } from "@/components/ui/spiritual-card";
import { Check, Download, Book, Sparkles } from "lucide-react";
import sacredEbook from "@/assets/Home 2.png";
import { Link } from "react-router-dom"; // react-router-dom से Link import करें

export const EbookSection = () => {
  const features = [
    "Sacred mantras and their meanings",
    "Step-by-step ritual guidelines",
    "Ancient wisdom for modern life",
    "Meditation techniques",
    "Spiritual practices calendar",
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(36 100% 50% / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, hsl(4 85% 58% / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, hsl(36 100% 50% / 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <SpiritualCard variant="divine" size="xl" className="overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-sacred-gradient"></div>

            <SpiritualCardHeader className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center mb-4"
              >
                <div className="relative">
                  <Book className="h-12 w-12 text-accent" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-2"
                  >
                    <Sparkles className="h-4 w-4 text-secondary absolute top-0 right-0" />
                  </motion.div>
                </div>
              </motion.div>

              <SpiritualCardTitle className="text-3xl md:text-4xl mb-4">
                Get Your Free Sacred Ebook
              </SpiritualCardTitle>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-primary-foreground/80 max-w-2xl mx-auto"
              >
                Unlock ancient wisdom with our comprehensive guide to spiritual
                practices, sacred mantras, and transformative rituals.
              </motion.p>
            </SpiritualCardHeader>

            <SpiritualCardContent>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Features */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-semibold text-primary-foreground mb-6">
                    What's Inside:
                  </h3>

                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        className="flex items-center space-x-3 group"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-divine">
                            <Check className="h-4 w-4 text-accent" />
                          </div>
                        </div>
                        <span className="text-primary-foreground/90 group-hover:text-primary-foreground transition-divine">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="pt-6"
                  >
                    <Link to="/admin/login">
                      <SpiritualButton
                        variant="sacred"
                        size="lg"
                        className="w-full group"
                      >
                        <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                        Login to Access Free Ebook
                      </SpiritualButton>
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Right side - Ebook cover */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative flex justify-center"
                >
                  <div className="relative">
                    <motion.img
                      src={sacredEbook}
                      alt="Sacred Ebook Cover"
                      className="h-80 w-60 object-cover rounded-lg shadow-sacred"
                      whileHover={{
                        scale: 1.05,
                        rotateY: 5,
                        rotateX: 5,
                      }}
                      transition={{ duration: 0.6 }}
                      style={{ transformStyle: "preserve-3d" }}
                    />

                    {/* Glowing aura effect */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 20px hsl(45 100% 68% / 0.3)",
                          "0 0 40px hsl(45 100% 68% / 0.6)",
                          "0 0 20px hsl(45 100% 68% / 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-lg"
                    />

                    {/* Floating sparkles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [-20, -40, -20],
                          x: [0, Math.sin(i) * 20, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut",
                        }}
                        className="absolute text-accent text-lg"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${10 + i * 10}%`,
                        }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </SpiritualCardContent>
          </SpiritualCard>
        </motion.div>
      </div>
    </section>
  );
};

