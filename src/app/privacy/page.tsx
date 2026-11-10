import { LegalPage } from "@/components/legal-page";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy — JB Software",
  description: "How JB Software collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="November 2026">
      <p>
        This policy explains what information JB Software collects when you use
        this website and our services, and how we use it. It is a simple,
        plain-language policy for a small independent software studio.
      </p>

      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Account details.</strong> If you create an account, we store
            your name, email address and, when you use Google sign-in, your
            Google profile name and avatar. If you use email and password, we
            store only a salted hash of your password — never the password
            itself.
          </li>
          <li>
            <strong>Purchases and contributions.</strong> We store records of
            products you buy and contributions you make, including the amount,
            currency, status and the Stripe session identifier.
          </li>
          <li>
            <strong>Contact messages.</strong> If you contact us, we receive the
            name, email address and message you choose to send.
          </li>
          <li>
            <strong>Technical data.</strong> Our hosting and database providers
            may process standard server logs (such as IP address, browser type
            and request time) to keep the service secure and available.
          </li>
        </ul>
      </section>

      <section>
        <h2>How we use information</h2>
        <ul>
          <li>To create and manage your account and keep you signed in.</li>
          <li>To process purchases and contributions and provide access to paid software.</li>
          <li>To respond to your messages and support requests.</li>
          <li>To keep the service secure, prevent abuse and fix problems.</li>
        </ul>
        <p>
          We do not sell your personal information. We do not run advertising
          trackers or third-party analytics on this site.
        </p>
      </section>

      <section>
        <h2>Cookies and sessions</h2>
        <p>
          We use a session cookie to keep you signed in. Stripe may set cookies
          while you complete a payment. We do not use cookies for advertising.
        </p>
      </section>

      <section>
        <h2>Service providers</h2>
        <p>
          We rely on trusted providers to run the service: Google for optional
          sign-in, Stripe for payments, Supabase for the database, and Vercel for
          hosting. These providers process data on our behalf and under their own
          privacy terms.
        </p>
      </section>

      <section>
        <h2>Retention and your rights</h2>
        <p>
          We keep account and transaction records for as long as needed to
          provide the service and meet legal obligations. You can ask us to
          access, correct or delete your personal information by emailing{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We may need to
          keep certain records where the law requires it.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update this policy as the service grows. The date at the top of
          this page shows the latest revision.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about privacy? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
