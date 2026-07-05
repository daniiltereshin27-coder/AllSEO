import type { IconName } from "@/lib/site-content";

type IconProps = {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 24 }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<IconName, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    group: (
      <>
        <path d="M4 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M18 8a3 3 0 0 1 0 6" />
      </>
    ),
    report: (
      <>
        <path d="M5 3h10l4 4v14H5z" />
        <path d="M15 3v5h5M8 13h8M8 17h6" />
      </>
    ),
    camera: (
      <>
        <path d="M4 7h4l2-2h4l2 2h4v12H4z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
    audit: (
      <>
        <path d="M4 4h10v16H4zM8 8h3M8 12h3M8 16h2" />
        <circle cx="17" cy="15" r="3" />
        <path d="m19.3 17.3 2 2" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.5 2.7 7.8 7 10 4.3-2.2 7-5.5 7-10V6z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V5M4 20h16" />
        <path d="m7 16 4-5 3 2 5-7" />
      </>
    ),
    message: (
      <>
        <path d="M4 5h16v11H8l-4 4z" />
        <path d="M8 9h8M8 12h5" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}
