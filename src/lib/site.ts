export const SITE = {
  name: "JB Software",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://getjbsoftware.com",
  github: "https://github.com/GetJBSoftware",
  repo: "https://github.com/GetJBSoftware/jbsoftware",
} as const;

export const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL ?? "haithamjb2020@gmail.com";
