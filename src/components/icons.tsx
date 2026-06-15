import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

function createIcon(children: React.ReactNode) {
  return ({ size = 24, ...props }: Props) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconBackend = createIcon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </>
);

export const IconFrontend = createIcon(
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M12 8h4M8 12h8M8 16h5" />
  </>
);

export const IconDatabase = createIcon(
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
  </>
);

export const IconDevops = createIcon(
  <>
    <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
    <path d="M12 6v6l4 2" />
  </>
);

export const IconArchitecture = createIcon(
  <>
    <path d="M2 22L12 2l10 20" />
    <path d="M6 22l6-14 6 14" />
    <path d="M8 22l4-8 4 8" />
  </>
);

export const IconCareer = createIcon(
  <>
    <path d="M12 15l-3-3m0 0l3-3m-3 3h8M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </>
);

export const IconCloud = createIcon(
  <>
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </>
);

export const IconMensageria = createIcon(
  <>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    <path d="M8 9h8M8 13h6" />
  </>
);

export const IconSystemDesign = createIcon(
  <>
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="18" r="3" />
    <circle cx="18" cy="6" r="3" />
    <path d="M9 6h6M6 9v6M18 9v3M15 18l-6-6" />
  </>
);

export const IconDesignPatterns = createIcon(
  <>
    <rect x="4" y="4" width="7" height="7" rx="1" />
    <rect x="13" y="4" width="7" height="7" rx="1" />
    <rect x="4" y="13" width="7" height="7" rx="1" />
    <rect x="13" y="13" width="7" height="7" rx="1" />
    <path d="M7.5 11v2M16.5 11v2M11 7.5h2M11 16.5h2" />
  </>
);

export const IconSolid = createIcon(
  <>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </>
);

export const IconResiliencia = createIcon(
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </>
);

export const IconOkrs = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </>
);

export const icons: Record<string, React.ComponentType<Props>> = {
  backend: IconBackend,
  frontend: IconFrontend,
  database: IconDatabase,
  devops: IconDevops,
  architecture: IconArchitecture,
  career: IconCareer,
  cloud: IconCloud,
  mensageria: IconMensageria,
  "system-design": IconSystemDesign,
  "design-patterns": IconDesignPatterns,
  solid: IconSolid,
  resiliencia: IconResiliencia,
  okrs: IconOkrs,
};
