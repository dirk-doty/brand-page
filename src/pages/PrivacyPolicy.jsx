export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-doty-cream">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <a href="/" className="font-body text-doty-orange text-xs tracking-[0.2em] uppercase block mb-12 hover:opacity-70 transition-opacity">← Back to Home</a>
        <div className="flex flex-col gap-1 w-32 mb-10">
          <div className="h-[4px] bg-doty-green" />
          <div className="h-[4px] bg-doty-gold" />
          <div className="h-[4px] bg-doty-orange" />
        </div>
        <h1 className="font-display text-doty-green text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="font-body text-doty-green/50 text-sm mb-12">Last updated: March 2026</p>

        {[
          { title: '1. Information We Collect', body: 'We collect information you provide directly to us, such as your name and email address when you sign up. We may also collect usage data, such as pages visited and interactions with the site.' },
          { title: '2. How We Use Your Information', body: 'We use your information to deliver and improve our services, send community updates and newsletters you have opted into, and communicate with you about events and membership.' },
          { title: '3. Sharing of Information', body: 'We do not sell your personal information. We may share information with trusted service providers who assist in operating our website and services, subject to confidentiality agreements.' },
          { title: '4. Email Communications', body: 'If you subscribe to our mailing list, you will receive updates about our shows, community events, and membership. You may unsubscribe at any time via the link in any email.' },
          { title: '5. Cookies', body: 'We use cookies and similar technologies to enhance your experience, understand site usage, and improve our services. You may disable cookies in your browser settings, though some features may not function properly.' },
          { title: '6. Data Security', body: 'We implement reasonable security measures to protect your information. However, no internet transmission is completely secure, and we cannot guarantee absolute security.' },
          { title: '7. Children\'s Privacy', body: 'Our site is intended for adults. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal data, please contact us immediately.' },
          { title: '8. Changes to This Policy', body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our site or via email.' },
          { title: '9. Contact', body: 'For questions about this Privacy Policy or your personal data, please contact us through the site.' },
        ].map((s, i) => (
          <div key={i} className="mb-8">
            <h2 className="font-display text-doty-green text-xl font-bold mb-2">{s.title}</h2>
            <p className="font-body text-doty-green/70 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}