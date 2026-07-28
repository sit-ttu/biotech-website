import Link from "next/link";
import { ArrowIcon } from "@/components/icons/ArrowIcon";

type EditorialCtaProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

const Action = ({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) => {
  const className = `group inline-flex min-h-11 items-center gap-3 rounded-full px-5 text-[0.72rem] font-semibold transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
    primary
      ? "bg-[#139C48] text-white hover:bg-[#0f7e3a]"
      : "border border-[#bfc9be] text-[#4f554f] hover:border-[#139C48] hover:bg-white hover:text-[#139C48]"
  }`;
  const content = (
    <>
      {children}
      <ArrowIcon direction="right" size={12} />
    </>
  );

  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      className={className}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  );
};

export default function EditorialCta({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: EditorialCtaProps) {
  return (
    <section className="bg-white px-5 pb-16 pt-4 sm:px-8 md:pb-24">
      <div className="mx-auto grid max-w-7xl overflow-hidden border border-[#d9e3d8] bg-[#f1f5f0] md:grid-cols-12">
        <div className="relative px-6 py-10 sm:px-9 sm:py-12 md:col-span-6 md:px-10 md:py-16">
          <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-[#139C48]" />
          <h2 className="max-w-[16ch] text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[#111311] sm:text-[2.7rem]">
            {title}
          </h2>
        </div>
        <div className="border-t border-[#d9e3d8] px-6 py-10 sm:px-9 md:col-span-6 md:border-l md:border-t-0 md:px-10 md:py-16">
          <p className="max-w-[31rem] text-[0.78rem] leading-[1.6] text-[#626862] sm:text-[0.84rem]">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Action href={primaryHref} primary>
              {primaryLabel}
            </Action>
            {secondaryLabel && secondaryHref && (
              <Action href={secondaryHref}>{secondaryLabel}</Action>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
