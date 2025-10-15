# Portfolio Site 

Welcome to my portfolio! Feel free to explore and reach out if you have any questions.

## Table of Contents

- [Local Installation](#local-installation)
- [Theming](#theming)
- [Inspiration](#inspiration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Local Installation

To run this project locally:

1. Ensure [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) is installed.
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
    npm run dev
   ```
The site will be accessible at ``http://localhost:3000``.

## Theming
The site features a Windows XP Bliss/Microsoft-inspired color scheme and typography. It is designed to be WCAG AAA compliant and fully responsive for mobile devices.

## Inspiration

 - **Resume:** Content is primarily derived from my [resume](https://drive.google.com/file/d/1cmu1No1OGQGQLtQ-rRTcjuByhRxKo3KK/view?usp=sharing).
 - **Front-End Components:** A combination of Aceternity UI, Magic UI, npm, Shadcn/UI, and custom components built with TailwindCSS.
 - **Hosting:** Deployed using Azure Static Web Apps, with CI/CD managed through GitHub Actions to maintain consistency with the site's theme.
 - **Project Initialization:** Created using ``create-t3-app``.

## Project Structure

```

├── .github/                         // Azure + GitHub CI
├── .next/
├── public/                          // SVG Icons + Favicon.ico
├── src/
│   ├── components/                  // React Components
│   │   ├── custom/
│   │   │   ├── footer.tsx
│   │   │   ├── navbar.tsx           // Custom navbar
│   │   │   └── skills.tsx      
│   │   ├── magicui/
│   │   │   ├── morphing-text.tsx
│   │   │   └── typing-animation.tsx      
│   │   ├── ui/
│   │   │   ├── background-boxes.tsx
│   │   │   ├── bento-grid.tsx
│   │   │   ├── card.tsx
│   │   │   ├── google-gemini-effect.tsx     // Hero Section effect 
│   │   │   ├── link-preview.tsx
│   │   │   └── vertical-timeline.tsx                                
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/                       
│   │   ├── api/
│   │   │   └── sitemap.ts
│   │   ├── _app.tsx
│   │   └── index.tsx                // Main index page
│   ├── styles/                
│   │   └── globals.css
│   ├──  env.js    
├── .eslintrc.cjs                    // ESLint config
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.js                   // NextJS config
├── package-lock.json
├── package.json
├── postcss.config.js
├── prettier.config.js               // Prettier config 
├── README.md
├── robots.txt
├── SECURITY.md
├── tailwind.config.ts               // Tailwind config 
├── tailwind.d.ts
└── tsconfig.json
```


## Contributing
Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your proposed changes.

## License
This project is licensed under the MIT License.
