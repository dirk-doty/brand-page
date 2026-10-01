// Draft pending legal review
import LegalLayout, { LegalSection } from '../components/legal/LegalLayout';

export default function PrivacyPolicy() {
  return (
    <>
      {/* Draft pending legal review */}
      <LegalLayout title="Privacy Policy" effectiveDate="October 1, 2026">
        <LegalSection title="Who We Are">
          <p>
            This website, doty.media, is operated by Dad of the Year, LLC (&ldquo;DOTY,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us&rdquo;). This policy explains what personal information we collect through the site, how we
            use it, and the choices you have.
          </p>
        </LegalSection>

        <LegalSection title="What We Collect">
          <p>
            The only personal information we ask for is your email address, and only if you choose to enter it in
            our signup form.
          </p>
          <p>
            We also collect anonymous, aggregated usage statistics through Vercel Web Analytics, such as which pages
            are viewed, the referring site, and general device, browser, and country information. It does not use
            cookies and does not identify you personally or follow you to other websites.
          </p>
          <p>
            We set no cookies on this site. Like any website, our hosting provider processes standard technical
            information such as your IP address and browser type in order to deliver pages and keep the service
            secure.
          </p>
        </LegalSection>

        <LegalSection title="Why We Collect It">
          <p>
            We use your email address to send you updates about DOTY shows, membership, and community. We do not
            use it for anything else. We use the aggregated analytics only to understand how the site is used and
            to improve it.
          </p>
        </LegalSection>

        <LegalSection title="Third Parties">
          <p>We rely on a small number of service providers to run the site:</p>
          <ul>
            <li>
              <strong>Formspree</strong> receives and stores the email address you submit through our signup form
              on our behalf.
            </li>
            <li>
              <strong>Vimeo</strong> hosts the video embedded on our home page. We load it with Vimeo&rsquo;s
              &ldquo;do not track&rdquo; setting, but Vimeo receives your IP address and browser information when the
              video loads.
            </li>
            <li>
              <strong>Vercel</strong> hosts this website and provides the analytics described above.
            </li>
          </ul>
          <p>Each of these providers handles information under its own privacy policy.</p>
        </LegalSection>

        <LegalSection title="We Don’t Sell Your Information">
          <p>
            We do not sell, rent, or trade your personal information, and we do not share it with third parties for
            their own marketing.
          </p>
        </LegalSection>

        <LegalSection title="Unsubscribing and Deleting Your Information">
          <p>
            You can stop receiving our emails at any time by clicking the unsubscribe link in any email we send. To
            review, correct, or delete the information we hold about you, email{' '}
            <a href="mailto:dirk@doty.media">dirk@doty.media</a> and we&rsquo;ll take care of it.
          </p>
        </LegalSection>

        <LegalSection title="Children">
          <p>
            This site is not directed at children under 13, and we do not knowingly collect personal information
            from them. If we learn that we have collected information from a child under 13, we will delete it.
          </p>
        </LegalSection>

        <LegalSection title="California Residents">
          <p>
            Under the California Online Privacy Protection Act (CalOPPA), we disclose the following: the only
            personally identifiable information we collect through this site is your email address, which you
            provide voluntarily. We share it only with the service providers listed above, and only so they can
            perform services for us. You can review or request changes to your information by emailing{' '}
            <a href="mailto:dirk@doty.media">dirk@doty.media</a>. We will notify you of material changes to this
            policy as described below.
          </p>
          <p>
            <strong>Do Not Track.</strong> Some browsers send a &ldquo;Do Not Track&rdquo; (DNT) signal. Because we
            do not track visitors across third-party websites, and our analytics are anonymous, aggregated, and
            cookie-free with no advertising trackers, our site does not change its behavior in response to DNT
            signals. We do not allow third
            parties to collect personal information about your online activities over time and across different
            websites through our site, other than the technical information the providers above receive when their
            content loads.
          </p>
        </LegalSection>

        <LegalSection title="Changes to This Policy">
          <p>
            We may update this policy from time to time. When we do, we will post the revised version on this page
            and update the effective date above. If a change materially affects how we use your email address, we
            will let you know by email before it takes effect.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Questions about this policy? Email <a href="mailto:dirk@doty.media">dirk@doty.media</a>.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
