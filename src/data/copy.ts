/**
 * Every line of copy on the site, in one place. All of it is blank on
 * purpose: TODO: Jeremy to write. Anything left empty is hidden on the page,
 * so fill in what you want and leave the rest.
 *
 * The per-item blanks (project descriptions, hackathon taglines, community
 * and experience bullets, case studies) sit next to their items in the other
 * files under src/data.
 */
export const copy = {
  hero: {
    /** The sentence under the name. */
    tagline: "",
    /** The words before the rotating word (Security, Cloud & DevOps, ...). Blank hides the rotating line. */
    focusLead: "Currently focused on",
  },
  about: {
    /** Big heading under the "About" label; the label is the heading while blank. */
    title: "",
    /** Line under the heading. */
    description: "",
    /** Lead paragraph in the right-hand card. */
    intro: "",
    /** Bullets under it: `text` renders plain, `highlight` renders bold after it. */
    points: [] as { text: string; highlight: string }[],
  },
  experience: { title: "", description: "" },
  community: { title: "", description: "" },
  projects: { title: "", description: "" },
  hackathons: {
    title: "",
    description: "",
    /** Small line under the "Judging" heading. */
    judgingNote: "",
  },
  skills: { title: "", description: "" },
  footer: {
    /** Line under the name in the footer. */
    tagline: "",
  },
  notFound: {
    /** Line under "Page not found". */
    body: "",
  },
  /** Not on the page: browser tab, search results and link previews. */
  meta: {
    /** After the name in the browser tab and search headline. Blank leaves just the name. */
    titleSuffix: "CS @ Carleton · Security, Cloud & AI/ML",
    /** Search snippet and link-preview line for every page. Blank lets search engines pick their own. */
    description:
      "Portfolio of Jeremy Friesen, a Computer Science student at Carleton University and Cyber Security Intern at the Government of Canada.",
  },
};
