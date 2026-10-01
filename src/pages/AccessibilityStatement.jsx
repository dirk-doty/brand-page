// Draft pending legal review
import LegalLayout, { LegalSection } from '../components/legal/LegalLayout';

export default function AccessibilityStatement() {
  return (
    <>
      {/* Draft pending legal review */}
      <LegalLayout title="Accessibility" effectiveDate="October 1, 2026">
        <LegalSection title="Our Commitment">
          <p>
            Dad of the Year, LLC wants everyone to be able to use doty.media, including people with disabilities.
            We work to make this site accessible and treat accessibility as an ongoing effort, not a one-time
            project.
          </p>
        </LegalSection>

        <LegalSection title="Standard We Aim For">
          <p>
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, published by the
            World Wide Web Consortium (W3C). These guidelines explain how to make web content more accessible to
            people with a wide range of disabilities.
          </p>
        </LegalSection>

        <LegalSection title="What We Have Done">
          <p>As of our most recent review, we have:</p>
          <ul>
            <li>made all links, buttons, and forms usable with a keyboard, with a &ldquo;Skip to content&rdquo; link at the top of each page;</li>
            <li>structured pages with headings and landmarks so screen readers can navigate them;</li>
            <li>labeled form fields and announced signup confirmations and errors to assistive technology;</li>
            <li>provided a control to pause the background video, and kept it from playing automatically for visitors whose devices request reduced motion;</li>
            <li>adjusted text colors to meet WCAG AA contrast requirements;</li>
            <li>provided text alternatives for meaningful images and hidden purely decorative images from screen readers.</li>
          </ul>
          <p>
            We review the site using automated testing tools and manual keyboard checks, and we re-check it when we
            make significant changes.
          </p>
        </LegalSection>

        <LegalSection title="Known Limitations">
          <p>
            Despite our efforts, some content may not yet be fully accessible. The background video on our home page
            is embedded from Vimeo, a third-party service whose player we do not control. The video is decorative,
            has no audio, and conveys no information that is not also available in text on the page.
          </p>
          <p>
            We are not responsible for the accessibility of third-party websites we link to, though we try to choose
            partners who take accessibility seriously.
          </p>
        </LegalSection>

        <LegalSection title="Feedback and Assistance">
          <p>
            If you have trouble using any part of this site, or have suggestions for improving its accessibility,
            please contact us. Tell us the page, what you were trying to do, and the problem you ran into, and we
            will work with you to provide the information or service you need through another means if necessary.
          </p>
          <ul>
            <li>
              Email: <a href="mailto:dirk@doty.media?subject=Accessibility">dirk@doty.media</a> (subject line
              &ldquo;Accessibility&rdquo;)
            </li>
          </ul>
          <p>We aim to respond to accessibility feedback within 5 business days.</p>
        </LegalSection>

        <LegalSection title="Ongoing Review">
          <p>
            This statement was last reviewed on the effective date above. We will update it as we make
            improvements to the site.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
