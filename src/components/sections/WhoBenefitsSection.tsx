import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  SparklesIcon,
  UserGroupIcon,
  HeartIcon,
  LightBulbIcon, // 1. Changed BrainIcon to LightBulbIcon here
  SparklesIcon as PlantIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

// Data for the benefit cards, making the JSX cleaner and easier to manage
const benefitsData = [
  {
    icon: AcademicCapIcon,
    title: "Students",
    tags: ["Pupils", "Learners"],
  },
  {
    icon: BriefcaseIcon,
    title: "Professionals",
    tags: ["Employees", "Workers"],
  },
  {
    icon: UserGroupIcon,
    title: "Spiritual Seekers",
    tags: ["Devotees"],
  },
  {
    icon: SparklesIcon,
    title: "Occult Science Practitioners",
    tags: ["Mystics"],
  },
  {
    icon: HeartIcon,
    title: "Yoga Enthusiasts",
    tags: ["Yogis"],
  },
  {
    icon: LightBulbIcon, // 2. Replaced BrainIcon with LightBulbIcon here
    title: "Meditation Learners",
    tags: ["Meditators"],
  },
  {
    icon: PlantIcon,
    title: "Personal Growth Seekers",
    tags: ["Self-improvers"],
  },
  {
    icon: QuestionMarkCircleIcon,
    title: "Anyone Curious About Spirituality",
    tags: ["Curious Minds"],
  },
];

export const WhoBenefitsSection = () => {
  const navigate = useNavigate();

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const handleNavigateToLogin = () => {
    navigate("/admin/login");
  };

  return (
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Subtle background aura */}
      <div className="absolute inset-0 bg-aura-gradient opacity-10 blur-3xl -z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-secondary tracking-widest uppercase mb-2">
            ENDLESS USE CASES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Who can benefit from this{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Divine Journey?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Our spiritual course is designed to enlighten and empower
            individuals from all walks of life.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              // variants={itemVariants} // Re-enabled the animation variant
              whileHover={{
                y: -8,
                scale: 1.05,
                boxShadow: "0 0 30px hsl(var(--accent) / 0.3)",
                borderColor: "hsl(var(--accent) / 0.5)",
              }}
              className="bg-card/80 backdrop-blur-sm border border-border p-6 rounded-2xl text-center transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-3">
                {benefit.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {benefit.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-muted/50 text-muted-foreground px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="mt-20 max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl text-center gradient-divine shadow-divine overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-aura-gradient opacity-20 scale-150"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to transform your life with spirituality?
            </h3>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Join seekers from all walks of life and experience deep
              transformation with our 6-Month Spiritual Course.
            </p>
            <button onClick={handleNavigateToLogin} className="bg-white text-primary font-bold text-lg px-10 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50">
              Get Started Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
