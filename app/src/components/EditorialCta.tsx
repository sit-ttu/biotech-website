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
      : "border border-[#cfd2ce] bg-white text-[#4f554f] hover:border-[#139C48] hover:text-[#139C48]"
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
    <section className="bg-white px-5 pb-16 pt-8 sm:px-8 md:pb-24 md:pt-12">
      <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-[#dde1dc] bg-[#f5f5f2] px-6 py-14 text-center sm:px-10 md:py-20">
        <h2 className="mx-auto max-w-[18ch] text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.055em] text-[#111311] sm:text-[3rem]">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-[42rem] text-[0.8rem] leading-[1.65] text-[#626862] sm:text-[0.86rem]">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Action href={primaryHref} primary>
            {primaryLabel}
          </Action>
          {secondaryLabel && secondaryHref && (
            <Action href={secondaryHref}>{secondaryLabel}</Action>
          )}
        </div>
      </div>
    </section>
  );
}
