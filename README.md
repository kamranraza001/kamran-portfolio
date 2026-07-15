# Kamran Raza Portfolio

Personal portfolio for Kamran Raza, built with React, TypeScript and Vite.

## Local preview

1. Install Node.js 22 or newer and pnpm.
2. Run `pnpm install`.
3. Run `pnpm dev`.
4. Open the local address shown in the terminal.

## Production build

Run `pnpm build`. The publish-ready site is created in `dist`.

## Editing portfolio content

Edit `src/data/portfolio.ts` to update the name, biography, experience, credentials, skills, projects, contact details and social links. Replace `public/profile-photo.jpg` or `public/resume.pdf` when new assets are available.

## Netlify deployment

1. Create a GitHub repository and push this project to its `main` branch.
2. In Netlify, choose **Add new project** and import the GitHub repository.
3. Use build command `pnpm run build` and publish directory `dist`.
4. Deploy. Future pushes to `main` will publish automatically.

The contact form is set up with Netlify Forms. Form submissions will appear in the Netlify dashboard after the first deployment.
