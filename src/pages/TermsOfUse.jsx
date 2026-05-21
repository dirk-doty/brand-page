export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-doty-cream">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <a href="/" className="font-body text-doty-orange text-xs tracking-[0.2em] uppercase block mb-12 hover:opacity-70 transition-opacity">← Back to Home</a>
        <div className="flex flex-col gap-1 w-32 mb-10">
          <div className="h-[4px] bg-doty-green" />
          <div className="h-[4px] bg-doty-gold" />
          <div className="h-[4px] bg-doty-orange" />
        </div>
        <h1 className="font-display text-doty-green text-4xl md:text-5xl font-bold mb-4">Terms of Use</h1>
        <p className="font-body text-doty-green/50 text-sm mb-12">Last updated: March 2026</p>

        {[
          { title: '1. Acceptance of Terms', body: 'By accessing or using the Dad of the Year website and services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.' },
          { title: '2. Use of Content', body: 'All content on this site — including text, images, video, and branding — is the property of Dad of the Year, LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without express written permission.' },
          { title: '3. User Conduct', body: 'You agree not to use the site for any unlawful purpose, to harass or harm others, or to transmit any unsolicited communications. We reserve the right to terminate access for violations of these terms.' },
          { title: '4. Community Membership', body: 'Membership in the Dad of the Year community is subject to additional terms communicated at sign-up. We reserve the right to modify, suspend, or terminate membership at our discretion.' },
          { title: '5. Disclaimer of Warranties', body: 'This site is provided "as is" without warranties of any kind. Dad of the Year, LLC does not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components.' },
          { title: '6. Limitation of Liability', body: 'To the fullest extent permitted by law, Dad of the Year, LLC shall not be liable for any indirect, incidental, or consequential damages arising from your use of the site.' },
          { title: '7. Changes to Terms', body: 'We reserve the right to update these Terms of Use at any time. Continued use of the site after changes constitutes acceptance of the revised terms.' },
          { title: '8. Contact', body: 'For questions about these Terms of Use, please contact us through the site.' },
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