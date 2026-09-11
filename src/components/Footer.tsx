import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-aws-border bg-aws-squid py-8 text-center text-xs text-aws-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 font-medium text-aws-text">
          <span>AWS Cloud Practitioner Week Long Workshop</span>
          <span className="hidden sm:inline text-aws-subtle">•</span>
          <span>Sathyabama Institute of Science and Technology, Chennai</span>
        </div>

        <p className="max-w-3xl mx-auto text-aws-subtle text-[11px] leading-relaxed">
          This is an independently created practice examination inspired by the AWS
          Certified Cloud Practitioner (CLF-C02) exam objectives. It is not an
          official Amazon Web Services (AWS) examination, nor is it endorsed or
          sponsored by AWS. All trademarks belong to their respective owners.
        </p>

        <div className="pt-2 flex items-center justify-center gap-4 text-[11px]">
          <Link href="/" className="hover:text-aws-orange transition-colors">
            Home
          </Link>
          <span className="text-aws-border">•</span>
          <Link
            href="/leaderboard"
            className="hover:text-aws-orange transition-colors"
          >
            Public Leaderboard
          </Link>
          <span className="text-aws-border">•</span>
          <Link href="/admin" className="hover:text-aws-orange transition-colors">
            Event Administration
          </Link>
        </div>
      </div>
    </footer>
  );
}
