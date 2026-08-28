import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: `Terms & Conditions | ${company.name}` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="flex flex-col pt-20">
      <section className="section-pad bg-background">
        <div className="shell max-w-4xl">
          <p className="eyebrow text-gold-deep">Legal</p>
          <h1 className="h-display mt-2 text-3xl sm:text-5xl">Terms &amp; Conditions</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Effective Date: {company.legalEffectiveDate}
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <h2 className="font-display text-lg uppercase text-foreground">
              1. Enquiries &amp; Quotations
            </h2>
            <p>
              Submitting an enquiry through this website does not constitute a binding construction
              contract. All quotations, scopes of work, and project schedules are confirmed
              following formal drawing review, site assessment, and contract signing.
            </p>

            <h2 className="font-display text-lg uppercase text-foreground">
              2. Intellectual Property
            </h2>
            <p>
              All branding, logos, project photographs, and website content are the property of{" "}
              {company.name}. Unauthorized reproduction is prohibited.
            </p>

            <h2 className="font-display text-lg uppercase text-foreground">3. Governing Law</h2>
            <p>
              These terms and any subsequent construction agreements are governed by the laws of the
              Republic of Ghana.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
