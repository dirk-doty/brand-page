import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Award, Trophy } from 'lucide-react';

const TIERS = [
{
  icon: Star,
  name: 'Strategic Partner',
  price: 'Founding Sponsor',
  period: 'per year',
  color: 'border-doty-orange',
  tagColor: 'text-doty-orange',
  perks: [
  'Presenting sponsor for 2 DOTY original series',
  'Exclusive sponsor of DOTY online members community',
  'Social media features across all channels bi-weekly',
  'Diamond Sponsor for all DOTY live events',
  'Top sponsor billing for quarterly & annual DOTY giveaways']

},
{
  icon: Trophy,
  name: 'Single Show Partner',
  price: 'Presenting Sponsor',
  period: 'per year',
  color: 'border-doty-gold',
  tagColor: 'text-doty-gold',
  featured: true,
  perks: [
  'Exclusive naming rights for an entire show or season',
  'Branded challenges or segments',
  'Brand specific on-screen integrations',
  'Co-branded national ad rollout',
  'Inclusion in education modules in other original content or courses',
  'In Store Activation: Cross-promotion at retail stores']

},
{
  icon: Award,
  name: 'Product Partner',
  price: 'Gear Sponsor',
  period: 'per year',
  color: 'border-white/30',
  tagColor: 'text-white/60',
  perks: [
  'Dedicated episode segment or branded integration',
  'Logo featured on DOTY website',
  'Social media shoutout at launch',
  'Access to DOTY community member network',
  'Listing in our members area partner directory (coming soon)']

}];


export default function SponsorshipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="sponsorships" ref={ref} className="bg-doty-green">
      <div className="h-1 bg-doty-orange mb-16" />
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-body text-doty-orange-light text-xs tracking-[0.2em] uppercase block mb-3">Partner With Us</span>
          <h2 className="font-display text-doty-gold text-4xl md:text-6xl font-bold leading-tight mb-6">Brand Sponsorships

          </h2>
          <p className="font-body text-white/60 max-w-xl mx-auto text-base leading-relaxed">
            Align your brand with a movement that matters. Reach millions of engaged dads and families through authentic storytelling and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className={`relative border-t-4 ${tier.color} bg-white/5 p-8 flex flex-col ${tier.featured ? 'ring-1 ring-doty-gold/40' : ''}`}>
            
              {tier.featured &&
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-doty-gold text-doty-green font-body text-[10px] tracking-[0.15em] uppercase px-3 py-1">
                  Most Popular
                </div>
            }
              <tier.icon className={`w-7 h-7 mb-5 ${tier.tagColor}`} aria-hidden="true" focusable="false" />
              <span className="font-body text-xs tracking-[0.2em] uppercase mb-2 text-doty-gold">{tier.name}</span>
              <div className="mb-6">
                <span className="font-display text-white text-3xl font-bold whitespace-nowrap">{tier.price}</span>
                
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {tier.perks.map((perk, j) =>
              <li key={j} className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${tier.featured ? 'bg-doty-gold' : 'bg-doty-orange'}`} />
                    <span className="font-body text-white/70 text-sm leading-relaxed">{perk}</span>
                  </li>
              )}
              </ul>
              <a
              href="#join"
              className={`block text-center font-body text-xs tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300 ${
              tier.featured ?
              'bg-doty-gold text-doty-green hover:bg-white' :
              'border border-white/20 text-white hover:border-doty-orange hover:text-doty-orange-light'}`
              }>
              
                Get Started
              </a>
            </motion.div>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center font-body text-white/60 text-xs tracking-wide mt-10">
          
          Custom packages available. Contact us to discuss a tailored partnership.
        </motion.p>
      </div>
      <div className="h-1 bg-doty-orange mt-16" />
    </section>);

}