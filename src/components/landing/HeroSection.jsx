import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Player from '@vimeo/player';
import { Pause, Play } from 'lucide-react';

// Evaluated once at load: users who ask for reduced motion get the video paused until they press play.
const PREFERS_REDUCED_MOTION =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// dnt=1 stops Vimeo from setting tracking cookies, matching the privacy policy.
const VIDEO_SRC = `https://player.vimeo.com/video/1140571022?h=b8720061dc&background=1&autoplay=${PREFERS_REDUCED_MOTION ? 0 : 1}&loop=1&muted=1&title=0&byline=0&portrait=0&dnt=1`;

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [playing, setPlaying] = useState(!PREFERS_REDUCED_MOTION);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const player = new Player(iframeRef.current);
    playerRef.current = player;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    player.on('play', onPlay);
    player.on('pause', onPause);
    if (PREFERS_REDUCED_MOTION) player.pause().catch(() => {});
    // Detach listeners only: player.destroy() would also remove the iframe from the DOM.
    return () => {
      player.off('play', onPlay);
      player.off('pause', onPause);
    };
  }, []);

  const togglePlayback = () => {
    const player = playerRef.current;
    if (!player) return;
    // Flip the UI immediately; the player's play/pause events keep it in sync afterwards.
    setPlaying(!playing);
    (playing ? player.pause() : player.play()).catch(() => setPlaying(playing));
  };

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 500);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-doty-green">
      {/* Orange border frame */}
      <div className="absolute inset-0 z-20 pointer-events-none border-[6px] border-doty-orange" />

      {/* Video Background */}
      <div className="absolute inset-0">
        <iframe
          ref={iframeRef}
          src={VIDEO_SRC}
          className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Dad of the Year" />
        
        {/* Dark teal overlay matching brand */}
        <div className="absolute inset-0 bg-doty-green/60" />
      </div>

      {/* Background video pause/play (WCAG 2.2.2) — above the orange frame so it stays clickable */}
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? 'Pause background video' : 'Play background video'}
        className="absolute bottom-6 right-6 z-30 flex items-center justify-center w-11 h-11 border border-white/40 bg-doty-green/60 text-white hover:bg-doty-green hover:border-doty-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-doty-gold transition-colors duration-300"
      >
        {playing
          ? <Pause className="w-4 h-4" aria-hidden="true" focusable="false" />
          : <Play className="w-4 h-4" aria-hidden="true" focusable="false" />}
      </button>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6" style={{ opacity }}>




        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4">
          
          <a
            href="#sponsorships" className="bg-doty-orange-button text-doty-green font-body text-sm tracking-[0.15em] uppercase px-8 py-4 hover:bg-white hover:text-doty-green transition-all duration-300">BECOME A SPONSOR



          </a>
          <a
            href="#shows" className="border border-white/40 text-white font-body text-sm tracking-[0.15em] uppercase px-8 py-4 hover:bg-white/10 transition-all duration-300">SEE OUR SLATE



          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity }}>
        
        





        
      </motion.div>
    </section>);

}