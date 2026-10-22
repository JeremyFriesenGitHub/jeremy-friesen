import type { CaseStudy } from "./projects";

/**
 * The case-study page for each flagship project, keyed by the project's
 * slug (projects.ts attaches them). Empty fields are hidden on the page.
 * TODO: Jeremy to write the summary, problem, approach, result and role.
 * `problem` and `result` render one paragraph per string; `approach` renders
 * one bullet per string.
 */
export const caseStudyBySlug: Record<string, CaseStudy> = {
  trace: {
    summary: "",
    problem: [],
    approach: [],
    result: [],
    role: "",
  },
  maplevault: {
    summary: "",
    problem: [],
    approach: [],
    result: [],
    role: "",
    team: ["Jowi Aoun"],
  },
  buildo: {
    summary: "",
    problem: [],
    approach: [],
    result: [],
    role: "",
    team: ["Chantal Zhang", "Torrey Liu", "Mikhai Wilson"],
  },
  plante: {
    summary: "",
    problem: [],
    approach: [],
    result: [],
    role: "",
    team: ["Jowi Aoun"],
  },
  cutunnel: {
    summary: "",
    problem: [],
    approach: [],
    result: [],
    role: "",
  },
  agent2: {
    summary: "",
    problem: [],
    approach: [],
    result: [],
    role: "",
    team: ["Chantal Zhang", "Juniel Djossou", "Mikhai Wilson"],
  },
  "land-cover-segmentation": {
    summary: "",
    problem: [],
    approach: [],
    result: [],
    role: "",
  },
  "network-threat-explorer": {
    summary: "",
    problem: [],
    approach: [],
    result: [],
    role: "",
  },
};
