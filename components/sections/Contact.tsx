import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';

// Service types for dropdown
const serviceTypes = [
  'Performance Optimization',
  'Technology Implementation',
  'Data Strategy & Analytics',
  'Fan Engagement Solutions',
  'Commercial Innovation',
  'Strategic Consulting',
  'Other'
];

// Organization types for dropdown
const organizationTypes = [
  'Professional Sports Team',
  'Sports League/Association',
  'Sports Technology Company',
  'Broadcasting/Media',
  'Sports Venue',
  'Collegiate Athletics',
  'Other'
];

const Contact: React.FC = () => {
  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    organizationType: '',
    serviceType: '',
    message: '',
    budget: '',
    timeline: '',
    newsletter: false
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('https://formspree.io/f/xqazrvlz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formState)
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit the form. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Get In Touch" 
          subtitle="Ready to elevate your sports organization? Our innovation experts are here to help you achieve extraordinary results."
        />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <GlassCard className="p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 text-gradient">How We Can Help</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-yellow-400 flex items-center justify-center shadow-glow">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-white mb-2">Strategic Assessment</h4>
                    <p className="text-gray-300">Comprehensive evaluation of your current capabilities and identification of growth opportunities.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-yellow-400 flex items-center justify-center shadow-glow">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-white mb-2">Custom Solutions</h4>
                    <p className="text-gray-300">Tailored innovations specifically designed to address your unique challenges and objectives.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-yellow-400 flex items-center justify-center shadow-glow">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-white mb-2">Implementation Support</h4>
                    <p className="text-gray-300">Expert guidance and resources to ensure successful adoption and sustained impact.</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <GlassCard className="p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-gray-300 mb-6 max-w-md">
                  We've received your message and will get back to you within 24 hours. 
                  In the meantime, feel free to explore our case studies for inspiration.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                  >
                    Send Another Message
                  </button>
                  <a 
                    href="#case-studies"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-yellow-400 text-white font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300"
                  >
                    View Case Studies
                  </a>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-8">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="organization" className="block text-white text-sm font-medium mb-2">
                        Organization *
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        required
                        value={formState.organization}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Company/Team Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="organizationType" className="block text-white text-sm font-medium mb-2">
                        Organization Type *
                      </label>
                      <select
                        id="organizationType"
                        name="organizationType"
                        required
                        value={formState.organizationType}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="" disabled>Select type</option>
                        {organizationTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="serviceType" className="block text-white text-sm font-medium mb-2">
                      Service of Interest *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      required
                      value={formState.serviceType}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="" disabled>Select service</option>
                      {serviceTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                      Tell us about your project/needs *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Please describe your current challenges and objectives..."
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="budget" className="block text-white text-sm font-medium mb-2">
                        Project Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formState.budget}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="" disabled>Select budget range</option>
                        <option value="Under $50K">Under $50K</option>
                        <option value="$50K - $100K">$50K - $100K</option>
                        <option value="$100K - $250K">$100K - $250K</option>
                        <option value="$250K - $500K">$250K - $500K</option>
                        <option value="$500K+">$500K+</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-white text-sm font-medium mb-2">
                        Desired Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formState.timeline}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="" disabled>Select timeline</option>
                        <option value="Immediate (1-2 months)">Immediate (1-2 months)</option>
                        <option value="Near-term (3-6 months)">Near-term (3-6 months)</option>
                        <option value="Medium-term (6-12 months)">Medium-term (6-12 months)</option>
                        <option value="Long-term (12+ months)">Long-term (12+ months)</option>
                        <option value="Exploratory discussion">Exploratory discussion</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-center">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        checked={formState.newsletter}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-orange-500 rounded border-gray-700 focus:ring-orange-500 bg-gray-800"
                      />
                      <label htmlFor="newsletter" className="ml-3 text-gray-300 text-sm">
                        Subscribe to our newsletter for sports innovation insights and updates
                      </label>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="mb-6 p-3 bg-red-600/20 border border-red-500 rounded-lg text-red-300 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-yellow-400 text-white font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              </GlassCard>
            )}
          </motion.div>
        </div>
        
        {/* FAQ Section */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-gradient">Frequently Asked Questions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <h4 className="text-lg font-semibold text-white mb-3">What industries do you specialize in?</h4>
              <p className="text-gray-300">
                We specialize exclusively in the sports industry, including professional teams, leagues, venues, media companies, 
                and technology providers. Our deep expertise in sports allows us to deliver tailored solutions that address the 
                unique challenges and opportunities in this sector.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h4 className="text-lg font-semibold text-white mb-3">How long does a typical project take?</h4>
              <p className="text-gray-300">
                Project timelines vary based on scope and complexity, ranging from 2-3 months for targeted initiatives to 
                6-12 months for comprehensive transformations. During our initial consultation, we'll provide a detailed 
                timeline based on your specific needs and objectives.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h4 className="text-lg font-semibold text-white mb-3">Do you work with organizations of all sizes?</h4>
              <p className="text-gray-300">
                Yes, we work with organizations across the spectrum, from emerging sports startups to global enterprises. 
                We tailor our approach, solutions, and engagement models to match your organization's size, maturity, 
                and specific needs.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h4 className="text-lg font-semibold text-white mb-3">What does your consulting process look like?</h4>
              <p className="text-gray-300">
                Our process typically includes: 1) Discovery and assessment, 2) Strategy development, 3) Solution design, 
                4) Implementation support, and 5) Measurement and optimization. We emphasize collaboration, knowledge transfer, 
                and sustainable adoption throughout.
              </p>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;