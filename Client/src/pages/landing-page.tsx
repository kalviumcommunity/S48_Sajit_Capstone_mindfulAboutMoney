import React  from "react";
import { motion } from "framer-motion";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import {
  WalletIcon,
  TrendingUp,
  ChartBarIcon,
  CreditCardIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
} from "lucide-react";

const Landing: React.FC = () => {
  return (
    <div className='bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen overflow-x-hidden'>
      {/* Enhanced Hero Section with Side-by-Side Layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className='relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
          {/* Left Content Section */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
            className='space-y-8'
          >
            <div className='relative'>
              <h2 className='text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 tracking-tight mb-6 leading-tight'>
                Unlock Your Financial Zen
                <span className='absolute -top-4 -right-4 text-xl bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full'>
                  Beta
                </span>
              </h2>
              <p className='text-xl text-slate-600 font-medium tracking-wide'>
                Empower mindful budgeting, effortless expense tracking, and
                elevate financial literacy. Join a community pursuing conscious
                money management.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className='grid grid-cols-2 gap-4'>
              {[
                { icon: CheckCircleIcon, text: "Smart Tracking" },
                { icon: TrendingUpIcon, text: "Growth Insights" },
                { icon: ShieldCheckIcon, text: "Secure Platform" },
                { icon: ChevronRightIcon, text: "Future-Ready" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className='flex items-center space-x-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl shadow-sm hover:shadow-md transition-all'
                >
                  <feature.icon className='h-6 w-6 text-emerald-600' />
                  <span className='text-sm text-slate-700'>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className='flex items-center space-x-4'
            >
              <SignUpButton mode='modal'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/50'
                >
                  Join Now
                </motion.button>
              </SignUpButton>
              <span className='text-slate-500'>or</span>
              <SignInButton mode='modal'>
                <button className='text-emerald-600 hover:text-emerald-800 font-medium underline-offset-4 hover:underline transition-colors'>
                  Sign In
                </button>
              </SignInButton>
            </motion.div>
          </motion.div>

          {/* Right Illustration Section */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
            className='relative group'
          >
            <div className='absolute -inset-2 bg-emerald-400/20 rounded-3xl -z-10 group-hover:scale-105 transition-transform duration-300 ease-out'></div>
            <img
              src='/assets/hero-illustration.webp'
              alt='Mindful Money Illustration'
              className='w-full transform transition-all duration-500 hover:scale-105 hover:rotate-2 perspective-1000 hover:shadow-2xl rounded-3xl'
            />
            <div className='absolute bottom-2 left-2 bg-white/70 px-2 py-1 rounded-md text-xs text-slate-600'>
              Image by Freepik
            </div>
            <div className='absolute -bottom-8 -right-8 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg'>
              <div className='flex items-center space-x-3'>
                <div className='bg-emerald-100 p-2 rounded-full'>
                  <CheckCircleIcon className='h-6 w-6 text-emerald-600' />
                </div>
                <div>
                  <p className='text-sm font-semibold text-slate-800'>
                    100% Data Privacy
                  </p>
                  <p className='text-xs text-slate-500'>Encrypted & Secure</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Features Section with 3D Card Effect */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className='bg-white/10 backdrop-blur-xl py-24 px-4 sm:px-6 lg:px-8'
      >
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mb-4'>
              Powerful Features
            </h2>
            <p className='text-xl text-slate-600 max-w-3xl mx-auto'>
              Unlock financial insights with our comprehensive tools
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                icon: WalletIcon,
                title: "Smart Tracking",
                description:
                  "Automated income and expense categorization with AI-powered insights.",
                color: "bg-emerald-100",
                textColor: "text-emerald-600",
              },
              {
                icon: ChartBarIcon,
                title: "Visual Analytics",
                description:
                  "Interactive dashboards that transform complex data into clear visuals.",
                color: "bg-purple-100",
                textColor: "text-purple-600",
              },
              {
                icon: CreditCardIcon,
                title: "Financial Health",
                description:
                  "Comprehensive net worth and spending trend analysis.",
                color: "bg-blue-100",
                textColor: "text-blue-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='relative group'
              >
                <div className='absolute -inset-1 bg-emerald-400/20 rounded-3xl -z-10 group-hover:scale-105 transition-transform duration-300 ease-out'></div>
                <div
                  className={`bg-white/80 backdrop-blur-sm p-6 rounded-3xl space-y-4
                  transform transition-all duration-300 border border-emerald-50
                  hover:shadow-2xl relative overflow-hidden`}
                >
                  <div
                    className={`${feature.color} ${feature.textColor} p-3 rounded-xl inline-block`}
                  >
                    <feature.icon className='h-8 w-8' />
                  </div>
                  <h3 className='text-xl font-bold text-slate-800'>
                    {feature.title}
                  </h3>
                  <p className='text-slate-600'>{feature.description}</p>

                  {/* Subtle animated line */}
                  <div className='absolute bottom-0 left-0 w-full h-1 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left' />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className='py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden'
      >
        <div className='absolute inset-0 bg-emerald-50/30 -skew-y-6 z-0'></div>
        <div className='max-w-7xl mx-auto relative z-10'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mb-4'>
              How It Works
            </h2>
            <p className='text-xl text-slate-600 max-w-3xl mx-auto'>
              Simple steps to transform your financial management
            </p>
          </div>

          {/* Steps Container */}
          <div className='grid md:grid-cols-3 gap-8 mb-16'>
            {[
              {
                step: "1",
                title: "Log Transactions",
                description:
                  "Effortlessly input your financial data with intuitive categorization.",
                icon: WalletIcon,
              },
              {
                step: "2",
                title: "Visualize Insights",
                description:
                  "Explore interactive graphs and comprehensive financial overviews.",
                icon: ChartBarIcon,
              },
              {
                step: "3",
                title: "Track Progress",
                description:
                  "Monitor your financial growth and make informed decisions.",
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                className='bg-white/70 backdrop-blur-sm p-6 rounded-2xl text-center space-y-4
                  shadow-md hover:shadow-xl transition-all duration-300
                  border border-emerald-50/50 hover:border-emerald-100'
              >
                <div className='bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <item.icon className='w-8 h-8 text-emerald-600' />
                </div>
                <h3 className='text-xl font-bold text-slate-800'>
                  {item.title}
                </h3>
                <p className='text-slate-600'>{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Process Illustration with Integrated Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className='relative grid md:grid-cols-2 gap-8 items-center
    bg-white/60 backdrop-blur-sm rounded-3xl p-8
    shadow-xl border border-emerald-50/50
    overflow-hidden'
          >
            {/* Text Description */}
            <div className='space-y-6 z-10'>
              <h3 className='text-3xl font-bold text-slate-800'>
                Comprehensive Financial Tracking
              </h3>
              <p className='text-slate-600 text-lg'>
                Our intuitive platform transforms complex financial data into
                clear, actionable insights. From transaction logging to advanced
                analytics, we simplify your financial journey.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SignUpButton mode='modal'>
                  <button
                    className='bg-emerald-600 text-white px-6 py-3 rounded-full
          hover:bg-emerald-700 transition-colors shadow-lg'
                  >
                    Start Your Financial Journey
                  </button>
                </SignUpButton>
              </motion.div>
            </div>

            {/* Image with Enhanced Effects */}
            <div className='relative'>
              <div className='absolute -inset-4 bg-emerald-400/10 rounded-3xl -z-10'></div>
              <div className='group'>
                <img
                  src='/assets/process-illustration-2.webp'
                  alt='Finance Tracking Process'
                  className='rounded-2xl shadow-2xl
          transform transition-all duration-300
          group-hover:scale-105 group-hover:rotate-1'
                />
                <div className='absolute bottom-2 right-2 bg-white/70 px-2 py-1 rounded-md text-xs text-slate-600'>
                  Image by Freepik
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className='bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto grid md:grid-cols-4 gap-32'>
          <div className='space-y-4'>
            <h3 className='text-2xl font-bold mb-4'>Mindful About Money</h3>
            <p className='text-emerald-100'>
              Simplifying personal finance tracking for everyone.
            </p>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='hover:text-emerald-100 transition-colors'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='/contact'
                  className='hover:text-emerald-100 transition-colors'
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href='/about-developer'
                  className='hover:text-emerald-100 transition-colors'
                >
                  About The Developer
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Legal</h4>
            <ul className='space-y-2'>
              {[
                {
                  name: "Privacy Policy",
                  content: `
                    1. Data Collection: We collect minimal personal information
                    2. User Data Protection: Encrypted storage and secure handling
                    3. No Third-Party Sharing: Your financial data remains private
                    4. Transparent Practices: Clear communication about data use
                  `,
                },
                {
                  name: "Terms of Service",
                  content: `
                    1. User Responsibilities: Accurate financial reporting
                    2. Service Usage: Personal finance tracking only
                    3. Account Security: Maintain confidentiality of login credentials
                    4. Limitation of Liability: Financial advice is suggestive, not definitive
                  `,
                },
                {
                  name: "Cookie Policy",
                  content: `
                    1. Essential Cookies: Used for app functionality
                    2. No Tracking Cookies: Minimal browser storage
                    3. User Consent: Transparent cookie usage
                    4. Data Privacy: No personal data stored in cookies
                  `,
                },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href='#'
                    className='hover:text-emerald-100 transition-colors'
                    title={link.content}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Connect</h4>
            <div className='flex space-x-4 mb-4'>
              {[
                { name: "Twitter", url: "https://twitter.com/tednotswarley" },
                { name: "LinkedIn", url: "https://linkedin.com/in/heysajit" },
                { name: "GitHub", url: "https://github.com/maverickOG" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:text-emerald-100 transition-colors'
                >
                  {social.name}
                </a>
              ))}
            </div>
            <p className='text-sm text-emerald-100'>
              © {new Date().getFullYear()} Mindful About Money. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Auth: React.FC = () => {
  return (
    <div className='sign-in-container'>
      <SignedIn>
        <Navigate to='/Dashboard' />
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal' />
        <SignUpButton mode='modal' />
      </SignedOut>
    </div>
  );
};

export { Landing, Auth };
