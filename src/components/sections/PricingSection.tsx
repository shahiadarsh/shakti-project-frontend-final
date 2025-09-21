import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // react-router-dom से Link import करें

// A reusable Checkmark Icon component for the feature list
const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
      clipRule="evenodd"
    />
  </svg>
);

// Data for the pricing plans to keep the component JSX clean
const plans = [
  {
    title: "3-Day Access Plan",
    subtitle: "Learn Shree Suktam Sadhana in 3 days",
    price: "699",
    duration: "6 months",
    features: [
      "Day-1: Learn Shree Suktam chanting",
      "Day-2: Learn Shree Yantra (Maha Meru) pooja",
      "Day-3: Learn guided meditation of Shree Suktam with jagrit mantra",
    ],
    popular: false,
  },
  {
    title: "6-Months Premium Subscription",
    subtitle: "Benifits Include:",
    price: "999",
    duration: "1 Year",
    features: [
      "Live session Every Sunday at 10 AM",
      "Learn Shree Suktam in detail and unlock the secrets",
      "Swar Vigyan - Ancient and Powerful breath techniques to control the Destiny",
      "Vigyan Bhairav Tantra - 70+ Ancient and powerful meditation techniques",
      "Hanuman Chalisa with Spiritual meaning",
      "Upanishad Gyan",
      "Kundalini Sadhana",
      "E-books and Many more...",
    ],
    popular: true,
  },
];

export const PricingSection = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Background radial gradient for a divine aura effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-aura-gradient opacity-20 blur-3xl -z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
            Choose Your Meditation Plan
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Start your mindfulness journey with flexible subscription options
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              // variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`relative flex flex-col rounded-2xl p-8 transition-shadow duration-300 h-full ${
                plan.popular
                  ? "bg-card border-2 border-transparent [background-image:linear-gradient(hsl(var(--card)),hsl(var(--card))),linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)))] bg-origin-border bg-clip-content shadow-sacred"
                  : "bg-card border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 right-8 bg-gradient-sacred text-background font-bold text-sm px-4 py-1.5 rounded-full shadow-lg">
                  POPULAR
                </div>
              )}

              <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  {plan.title}
                </h3>
                <p className="text-muted-foreground mb-6">{plan.subtitle}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-accent">
                    ₹{plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    / {plan.duration}
                  </span>
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-secondary mt-1 mr-3 flex-shrink-0" />
                      <span className="text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <Link to="/admin/login" className="block w-full">
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-background ${
                      plan.popular
                        ? "gradient-divine text-primary-foreground shadow-divine"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    Register to subscribe
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
