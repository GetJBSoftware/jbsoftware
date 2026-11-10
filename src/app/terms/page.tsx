import { LegalPage } from "@/components/legal-page";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = {
  title: "Terms of Service — JB Software",
  description: "The terms that apply when you use the JB Software website.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="November 2026">
      <p>
        These terms apply when you use the JB Software website and services. By
        creating an account or using the site, you agree to them. If you do not
        agree, please do not use the site.
      </p>

      <section>
        <h2>What this site is</h2>
        <p>
          JB Software is an independent software studio. The products shown on
          this site are still in development and are marked as coming soon.
          Descriptions, features, platforms and planned pricing may change before
          release.
        </p>
      </section>

      <section>
        <h2>Accounts</h2>
        <ul>
          <li>You must provide accurate information and keep your credentials secure.</li>
          <li>You are responsible for activity that happens under your account.</li>
          <li>You must be old enough to enter into a contract in your country.</li>
          <li>We may suspend or close accounts that abuse the service or break these terms.</li>
        </ul>
      </section>

      <section>
        <h2>Purchases</h2>
        <p>
          Paid tools are planned as one-time purchases with lifetime updates for
          the purchased major version, unless stated otherwise at checkout.
          Prices and availability will be shown before you pay. Payments are
          processed by Stripe. Nothing on this site is a subscription unless we
          explicitly say so.
        </p>
        <p>
          If a product is not delivered or is materially different from its
          description, contact us and we will work it out. Nothing here limits
          rights you have under mandatory consumer law.
        </p>
      </section>

      <section>
        <h2>Contributions</h2>
        <p>
          Contributions made through the investments page are voluntary,
          one-time contributions to support development. They are not equity,
          securities, loans or financial instruments, and they do not give you
          ownership or a share of revenue. They are not tax advice. Only
          contribute if you can afford to and understand that the roadmap may
          change.
        </p>
      </section>

      <section>
        <h2>Software licences</h2>
        <p>
          When a product is released, your download and use of it will be
          governed by the licence included with that product. Unless that licence
          says otherwise, you may not resell, redistribute or reverse engineer
          the software.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>
          Do not use the site to break the law, interfere with other users, probe
          or attack our systems, scrape it at scale, or infringe intellectual
          property rights.
        </p>
      </section>

      <section>
        <h2>Availability and disclaimers</h2>
        <p>
          The site is provided as-is while we build it. We aim to keep it
          available and accurate, but we do not promise uninterrupted access or
          that every planned feature will ship. To the extent permitted by law,
          we are not liable for indirect or consequential losses.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update these terms as the service changes. The date at the top
          of this page shows the latest revision. Continued use of the site after
          a change means you accept the updated terms.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
