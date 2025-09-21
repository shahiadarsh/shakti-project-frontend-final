"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import {
  SpiritualCard,
  SpiritualCardContent,
} from "@/components/ui/spiritual-card";
import { Heart, Star, Users, Award } from "lucide-react";

// 1. Apni image ko yahan import karein.
// Path ko apni project ke structure ke anusaar badal lein.

export const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Compassion",
      description: "Spreading love and kindness through spiritual practice",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Wisdom",
      description: "Ancient Vedic knowledge for modern spiritual seekers",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Building a sacred space for collective growth",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "Dedication to authentic spiritual teachings",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              About{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Shree Mahavidya
              </span>{" "}
              Shaktipeeth
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A sacred journey towards divine consciousness through ancient
              Vedic wisdom and modern spiritual practices
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Sacred Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Shree Mahavidya Shaktipeeth is dedicated to preserving and
                sharing the ancient wisdom of the Vedas while making it
                accessible to modern spiritual seekers. We believe that true
                abundance and peace come from connecting with the divine
                feminine energy of Maa Mahalakshmi.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through our guided practices, sacred texts, and community
                support, we help individuals discover their spiritual potential
                and manifest divine grace in their daily lives.
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square" // aspect-square se yeh hamesha gol rahega
            >
              {/* Image ke peeche ka Aura Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-primary/30 rounded-full blur-3xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* 2. <Image> ki jagah <img> tag ka istemaal karein */}
              <div className="w-full h-full rounded-full overflow-hidden shadow-2xl shadow-black/40">
                <img
                  src="https://t3.ftcdn.net/jpg/08/58/45/26/360_F_858452672_NvymtNEjkTIvAB09UxVWTwRieL8cPT3B.jpg"
                  alt="Sacred Mission - Divine Energy"
                  className="w-full h-full object-cover" // object-cover se image stretch nahi hogi
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Sacred Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide our mission to spread divine wisdom and
              create a supportive spiritual community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <SpiritualCard
                  variant="ethereal"
                  className="text-center h-full"
                >
                  <SpiritualCardContent className="pt-8">
                    <div className="text-accent mb-4 flex justify-center">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </SpiritualCardContent>
                </SpiritualCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              The Sacred Journey
            </h2>
            <SpiritualCard variant="divine">
              <SpiritualCardContent className="p-12">
                <p className="text-lg leading-relaxed mb-6">
                  Our 6-month Shree Suktam Sadhana Journey is designed to
                  gradually awaken your spiritual consciousness and invite the
                  divine blessings of Maa Mahalakshmi into your life. Through
                  daily practices, sacred mantras, and community support, you'll
                  experience profound transformation.
                </p>
                <p className="text-lg leading-relaxed">
                  Join thousands of spiritual seekers who have found peace,
                  abundance, and divine grace through our authentic Vedic
                  practices. Your journey towards enlightenment begins here.
                </p>
              </SpiritualCardContent>
            </SpiritualCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default About;
