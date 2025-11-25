import type { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: Partial<PortableTextComponents> = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
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
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
};
