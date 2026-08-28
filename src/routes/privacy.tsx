import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: `Privacy Policy | ${company.name}` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="flex flex-col pt-20">
      <section className="section-pad bg-background">
        <div className="shell max-w-4xl">
          <p className="eyebrow text-gold-deep">Legal</p>
          <h1 className="h-display mt-2 text-3xl sm:text-5xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Effective Date: {company.legalEffectiveDate}
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <h2 className="font-display text-lg uppercase text-foreground">1. Overview</h2>
            <p>
              {company.name} respects your privacy. When you submit project enquiries via our
              website, your information (name, phone number, email address, project description) is
              used strictly to communicate regarding your construction enquiry.
            </p>

            <h2 className="font-display text-lg uppercase text-foreground">
              2. Information Collection &amp; Use
            </h2>
            <p>
              We do not sell, rent, or distribute personal information to third parties. Information
              sent via WhatsApp or Email is handled under standard communication practices for
              contracting and quote generation.
            </p>

            <h2 className="font-display text-lg uppercase text-foreground">3. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at{" "}
              <a href={`mailto:${company.email}`} className="text-gold-deep underline">
                {company.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
