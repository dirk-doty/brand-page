// Draft pending legal review
import LegalLayout, { LegalSection } from '../components/legal/LegalLayout';

export default function TermsOfUse() {
  return (
    <>
      {/* Draft pending legal review */}
      <LegalLayout title="Terms of Use" effectiveDate="October 1, 2026">
        <LegalSection title="Acceptance of Terms">
          <p>
            These Terms of Use govern your use of doty.media, operated by Dad of the Year, LLC (&ldquo;DOTY,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us&rdquo;). By accessing or using the site, you agree to these terms. If you do
            not agree, please do not use the site.
          </p>
        </LegalSection>

        <LegalSection title="Intellectual Property">
          <p>
            All content on this site, including text, images, video, logos, show titles, and branding, is &copy; Dad
            of the Year, LLC or used under license, and is protected by copyright, trademark, and other intellectual
            property laws. You may view and share links to the site for personal, non-commercial purposes. You may
            not copy, reproduce, distribute, modify, or create derivative works from any content without our prior
            written permission.
          </p>
        </LegalSection>

        <LegalSection title="Acceptable Use">
          <p>When using the site, you agree not to:</p>
          <ul>
            <li>use the site for any unlawful purpose or in violation of these terms;</li>
            <li>submit false information or another person&rsquo;s email address through our forms;</li>
            <li>interfere with, disrupt, or attempt to gain unauthorized access to the site or its systems;</li>
            <li>scrape, harvest, or collect content or data from the site by automated means without our permission.</li>
          </ul>
          <p>We may restrict or end access for anyone who violates these terms.</p>
        </LegalSection>

        <LegalSection title="Disclaimers">
          <p>
            The site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
            warranties of any kind, express or implied, including warranties of merchantability, fitness for a
            particular purpose, and non-infringement. Content on the site is for general information and
            entertainment only and is not professional advice. We do not warrant that the site will be
            uninterrupted, error-free, or free of harmful components.
          </p>
        </LegalSection>

        <LegalSection title="Limitation of Liability">
          <p>
            To the fullest extent permitted by law, Dad of the Year, LLC and its members, employees, and partners
            will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss
            of data, profits, or goodwill, arising from or related to your use of the site. Where liability cannot be
            excluded, our total liability is limited to one hundred U.S. dollars ($100).
          </p>
        </LegalSection>

        <LegalSection title="Governing Law">
          <p>
            These terms are governed by the laws of the State of Wyoming, without regard to its conflict of law
            rules.
          </p>
        </LegalSection>

        <LegalSection title="Changes to These Terms">
          <p>
            We may update these terms from time to time. The revised version takes effect when posted on this page
            with a new effective date. Continued use of the site after that means you accept the revised terms.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Questions about these terms? Email <a href="mailto:dirk@doty.media">dirk@doty.media</a>.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
