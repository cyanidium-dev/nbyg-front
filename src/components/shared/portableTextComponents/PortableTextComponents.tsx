import type { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: Partial<PortableTextComponents> = {
  block: {
    normal: ({ children }) => <p className="not-last:mb-3">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className="space-y-2"
        style={{ listStyle: "disc", paddingLeft: "1.5rem" }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className="space-y-2"
        style={{ listStyle: "decimal", paddingLeft: "1.5rem" }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => (
      <li className="not-last:mb-5 lg:not-last:mb-9">{children}</li>
    ),
  },
};
