# Relocation Readiness Assessment

An interactive assessment tool based on research from surveys of over 103,000 Americans about international relocation.

## Quick Deployment to Vercel (5 minutes!)

### Prerequisites
- A GitHub account (free at github.com)
- A Vercel account (free at vercel.com - sign up with your GitHub)

### Steps:

1. **Create a GitHub Repository**
   - Go to github.com and click "New repository"
   - Name it: `relocation-assessment`
   - Make it Public
   - Don't add README, .gitignore, or license (we have our files)
   - Click "Create repository"

2. **Upload Your Files to GitHub**
   - On the repository page, click "uploading an existing file"
   - Drag and drop ALL the files from your `relocation-app` folder
   - Write a commit message like "Initial commit"
   - Click "Commit changes"

3. **Deploy to Vercel**
   - Go to vercel.com and sign in with GitHub
   - Click "Add New..." → "Project"
   - Find your `relocation-assessment` repository and click "Import"
   - Vercel will auto-detect it's a Vite app
   - Click "Deploy" (don't change any settings)
   - Wait ~2 minutes for it to build

4. **Get Your URL**
   - Once deployed, you'll get a URL like: `https://relocation-assessment.vercel.app`
   - That's it! Your app is live!

5. **Embed in Substack**
   - In your Substack post, click the "+" button
   - Choose "Embed"
   - Paste this code:
   ```html
   <iframe src="https://YOUR-URL-HERE.vercel.app" width="100%" height="800px" frameborder="0"></iframe>
   ```
   - Replace `YOUR-URL-HERE` with your actual Vercel URL

### Making Changes Later
- Just upload new files to your GitHub repository
- Vercel will automatically redeploy in ~2 minutes

### Free Tier Limits
- Vercel free tier includes:
  - Unlimited deployments
  - 100GB bandwidth/month (way more than you'll need)
  - Automatic HTTPS
  - Custom domains (if you want)

## Local Development (Optional)

If you want to test changes locally before deploying:

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Files in This Package

- `package.json` - Project dependencies
- `vite.config.js` - Build configuration
- `tailwind.config.js` - Styling configuration  
- `index.html` - Main HTML file
- `src/main.jsx` - App entry point
- `src/App.jsx` - The assessment component
- `src/index.css` - Global styles

## Questions?

Contact Bob Adams at globalist426@gmail.com
