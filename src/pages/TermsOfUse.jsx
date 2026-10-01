import LegalLayout, { LegalSection } from '../components/legal/LegalLayout';

export default function TermsOfUse() {
  return (
    <LegalLayout title="Terms of Use" effectiveDate="October 1, 2026">
      <p className="font-body text-doty-green leading-relaxed border-l-4 border-doty-orange bg-white/60 px-5 py-4 mb-10">
        <strong>Please read carefully.</strong> These terms include an agreement to resolve disputes through binding
        individual arbitration and a waiver of class actions and jury trials. See{' '}
        <a href="#dispute-resolution" className="underline underline-offset-2">Dispute Resolution</a> below,
        including how to opt out.
      </p>

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

      <LegalSection title="Indemnification">
        <p>
          You agree to indemnify and hold harmless Dad of the Year, LLC and its members, employees, and partners
          from any claims, losses, or expenses, including reasonable attorneys&rsquo; fees, arising from your
          violation of these terms or your misuse of the site.
        </p>
      </LegalSection>

      <LegalSection id="dispute-resolution" title="Dispute Resolution">
        <p>
          <strong>Informal resolution first.</strong> Before filing any claim, you and we each agree to try to
          resolve the dispute informally. The party raising the dispute must send written notice describing it
          and the relief sought (to us at <a href="mailto:dirk@doty.media">dirk@doty.media</a>), and both parties
          will negotiate in good faith for at least 60 days after the notice is received. Any limitation period is
          paused during that time.
        </p>
        <p>
          <strong>Binding individual arbitration.</strong> If the dispute is not resolved informally, any dispute,
          claim, or controversy arising out of or relating to these terms or the site (including whether a dispute
          must be arbitrated) will be resolved by final and binding arbitration administered by the American
          Arbitration Association (AAA) under its Consumer Arbitration Rules, before a single arbitrator. The
          arbitration may be conducted by video, by phone, or on written submissions; any in-person hearing will
          take place in Wyoming or another location the parties agree on. Judgment on the award may be entered in
          any court with jurisdiction. Payment of filing and arbitrator fees is governed by the AAA rules.
        </p>
        <p>
          <strong>Exceptions.</strong> Either party may bring an individual claim in small claims court if it
          qualifies, and either party may seek injunctive relief in court to protect its intellectual property.
        </p>
        <p>
          <strong>Class action and jury trial waiver.</strong> You and we each agree that claims may be brought
          only in an individual capacity, and not as a plaintiff or class member in any purported class,
          collective, consolidated, or representative proceeding. The arbitrator may not consolidate claims of
          more than one person. You and we each waive any right to a jury trial.
        </p>
        <p>
          <strong>Opt out.</strong> You may opt out of this arbitration agreement by emailing{' '}
          <a href="mailto:dirk@doty.media?subject=Arbitration%20Opt-Out">dirk@doty.media</a> with the subject line
          &ldquo;Arbitration Opt-Out&rdquo; and your name and email address within 30 days of first accepting these
          terms. Opting out does not affect any other part of these terms.
        </p>
        <p>
          <strong>Time limit.</strong> To the extent permitted by law, any claim must be brought within one year
          after it arises, or it is permanently barred.
        </p>
        <p>
          <strong>Severability.</strong> If the class action waiver is found unenforceable as to a particular claim,
          that claim must be severed and heard in court, and the rest of this section still applies to all other
          claims. If any other part of this section is found unenforceable, the rest remains in effect.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law and Venue">
        <p>
          These terms are governed by the Federal Arbitration Act and, otherwise, by the laws of the State of
          Wyoming, without regard to its conflict of law rules. For any claim not subject to arbitration, you and
          we consent to the exclusive jurisdiction of the state and federal courts located in Wyoming.
        </p>
      </LegalSection>

      <LegalSection title="Changes to These Terms">
        <p>
          We may update these terms from time to time. The revised version takes effect when posted on this page
          with a new effective date. Continued use of the site after that means you accept the revised terms.
          Changes to the Dispute Resolution section will not apply to any dispute that arose, or of which we had
          notice, before the change was posted.
        </p>
      </LegalSection>

      <LegalSection title="General">
        <p>
          These terms, together with our <a href="/privacy">Privacy Policy</a>, are the entire agreement between you
          and us about the site. If any provision is found unenforceable, the remaining provisions stay in effect.
          Our failure to enforce any provision is not a waiver of it. You may not assign these terms; we may
          assign them in connection with a merger, acquisition, or sale of assets.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms? Email <a href="mailto:dirk@doty.media">dirk@doty.media</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
