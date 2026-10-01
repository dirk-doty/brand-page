import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SHOWS = [
{
  title: 'National Parks Hunt',
  tag: 'Flagship Series · Launching 2026',
  desc: 'Fathers & kids team up to complete nature-based challenges in America\'s most stunning national parks. Action, education, and emotional bonding.',
  image: '/images/show-glacier.png',
  accent: 'bg-doty-orange',
  comingSoon: false
},
{
  title: 'Legends & Legacy',
  tag: 'Docuseries',
  desc: 'Showcasing famous and influential dads exploring how they balance career, personal life, and fatherhood.',
  image: 'https://images.unsplash.com/photo-1525026198548-4baa812f1183?w=800&q=80',
  accent: 'bg-doty-gold',
  comingSoon: true
},
{
  title: "Dad's Roundtable",
  tag: 'Talk Show',
  desc: 'Guest dads, influencers, and experts discussing mental health, relationships, and the realities of modern family life.',
  image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  accent: 'bg-doty-green',
  comingSoon: true
},
{
  title: 'The Juice',
  tag: 'Reality Series',
  desc: 'Successful entrepreneurs pass down their business to the next generation and mentor them every step of the way.',
  image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
  accent: 'bg-doty-orange',
  comingSoon: true
}];


export default function ShowsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="shows" ref={ref} className="bg-doty-green pt-20 md:pt-32">
      {/* Orange top/bottom stripes */}
      <div className="h-1 bg-doty-orange mb-16" />

      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-body text-doty-orange text-xs tracking-[0.2em] uppercase block mb-3">Launching 2026</span>
            <h2 className="font-display text-doty-gold text-4xl md:text-6xl font-bold leading-tight">Original TV Content

            </h2>
          </div>
          

          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SHOWS.map((show, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="group relative overflow-hidden">
            
              <div className="aspect-video overflow-hidden">
                <img
                src={show.image}
                alt={show.title}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 ${show.comingSoon ? 'blur-sm' : ''}`} />
              </div>
              {/* Accent left border */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${show.accent}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-doty-green/90 via-doty-green/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="font-body text-doty-orange text-[10px] tracking-[0.2em] uppercase block mb-1">{show.tag}</span>
                <h3 className="font-display text-white text-xl md:text-2xl font-bold mb-2">"{show.title}"</h3>
                {show.comingSoon ?
              <p className="font-body text-white/70 text-sm tracking-[0.2em] uppercase">Coming Soon...</p> :
              <p className="font-body text-white/70 text-sm leading-relaxed">{show.desc}</p>
              }
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="h-1 bg-doty-orange mt-16" />
    </section>);

}