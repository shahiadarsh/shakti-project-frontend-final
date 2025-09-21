import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  FireIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  RectangleStackIcon,
  AcademicCapIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"; // react-router-dom से Link import करें

const courseData = [
  {
    icon: BookOpenIcon,
    title: "Vigyan Bhairav Tantra",
    description:
      "Learn over 70 ancient and powerful meditation techniques revealed in the Vigyan Bhairav Tantra — a timeless scripture that unlocks deep states of consciousness and spiritual awakening.",
  },
  {
    icon: FireIcon,
    title: "Kundalini Sadhana",
    description:
      "Master the art of awakening and balancing your Kundalini energy through guided sadhana practices designed to activate your inner spiritual power safely and effectively.",
  },
  {
    icon: SparklesIcon,
    title: "Spiritual Secrets of Hanuman Chalisa",
    description:
      "Discover the hidden spiritual wisdom and mantras within the Hanuman Chalisa, enhancing your devotion, courage, and inner strength.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Discounted Prices on Advanced Sadhanas",
    description:
      "Enjoy exclusive discounts on higher-level spiritual practices and courses, enabling you to deepen your journey without financial stress.",
  },
  {
    icon: RectangleStackIcon,
    title: "E-books and Study Materials",
    description:
      "Receive a collection of comprehensive e-books, guides, and sacred texts to support your learning and daily practice.",
  },
  {
    icon: AcademicCapIcon,
    title: "Upanishad Gyan",
    description:
      "Dive into the profound teachings of the Upanishads, exploring the philosophy that forms the foundation of spiritual wisdom.",
  },
];

export const CourseContentSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const courseImageUrl =
    "https://t3.ftcdn.net/jpg/06/40/44/00/360_F_640440010_K1ReooQZlwVfy2HefHC5Fd8TjxcPrsLi.jpg";

  return (
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[70vh] bg-aura-gradient opacity-10 blur-3xl -z-0 -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[70vh] bg-aura-gradient opacity-10 blur-3xl -z-0 translate-y-1/4 -translate-x-1/4"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <div className="relative">
            <p className="text-sm font-semibold text-secondary tracking-widest uppercase mb-8 relative z-10">
              <span className="bg-background px-4">
                6-Month Spiritual Course
              </span>
            </p>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-sacred opacity-30"></div>
          </div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold text-foreground mb-6"
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Journey Through
            <br />
            <span className="bg-gradient-sacred bg-clip-text text-transparent relative">
              Sacred Knowledge
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-sacred rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
            </span>
          </motion.h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock ancient wisdom and transform your consciousness through this
            comprehensive spiritual awakening experience
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="relative">
          {/* Central Image Hub */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative mx-auto w-80 h-80 mb-20"
          >
            <div className="absolute -inset-4 rounded-full bg-gradient-sacred opacity-20 blur-2xl animate-pulse"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-accent/30">
              <img
                src={courseImageUrl}
                alt="Spiritual Awakening in the Cosmos"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-sacred/10 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-2xl">🕉️</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Floating Cards */}
          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courseData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100, rotate: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group"
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-3 bg-gradient-sacred opacity-0 rounded-3xl blur-lg"
                      animate={{
                        opacity: hoveredCard === index ? 0.3 : 0,
                        scale: hoveredCard === index ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>

                    <div className="relative bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 group-hover:border-accent/50 transition-all duration-500">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="w-7 h-7 text-accent" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                            {item.title}
                          </h3>
                          <div className="text-sm text-secondary">
                            Module {index + 1}
                          </div>
                        </div>
                      </div>

                      <motion.p
                        className="text-muted-foreground leading-relaxed mb-4 text-sm"
                        initial={{ height: 60, overflow: "hidden" }}
                        whileHover={{ height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.description}
                      </motion.p>

                      {/* Action Button */}
                      <Link to="/courses">
                        <motion.button
                          className="w-full py-3 px-4 bg-gradient-sacred/10 border border-accent/30 rounded-lg text-accent font-medium hover:bg-gradient-sacred/20 transition-all duration-300 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Explore Module</span>
                          <ChevronRightIcon className="w-4 h-4" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-20"
          >
            <div className="relative inline-block">
              <motion.div
                className="absolute -inset-4 bg-gradient-sacred opacity-30 rounded-full blur-xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              <Link to="/courses">
                <button className="gradient-sacred text-background font-bold text-xl px-12 py-4 rounded-full shadow-2xl shadow-accent/30 hover:scale-110 transition-all duration-500 flex items-center gap-3 relative">
                  <span>Begin Sacred Journey</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </motion.div>
                </button>
              </Link>
            </div>
            <p className="text-muted-foreground mt-6 text-lg">
              Transform your life in 6 months • Join thousands of spiritual
              seekers
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
