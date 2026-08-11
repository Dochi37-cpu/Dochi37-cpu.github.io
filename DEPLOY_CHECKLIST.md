# GitHub Pages Deployment Checklist — First-Time User

## A. Create your GitHub repository

1. Sign in to GitHub.
2. Click the `+` button in the upper-right corner.
3. Click **New repository**.
4. Set **Owner** to `Dochi37-cpu`.
5. Set **Repository name** to exactly:

   `Dochi37-cpu.github.io`

6. Choose **Public**.
7. IMPORTANT: leave these options unchecked because the files are already prepared:
   - Add a README file
   - Add .gitignore
   - Choose a license
8. Click **Create repository**.

## B. Upload the website files

After the empty repository opens:

1. Click **uploading an existing file**
   - If you do not see it: click **Add file** → **Upload files**.
2. Unzip the supplied deployment ZIP on your computer first.
3. Drag these files into GitHub:
   - `index.html`
   - `.nojekyll`
   - `README.md`
   - `CNAME.example`
   - `DEPLOY_CHECKLIST.md`
4. At the bottom, under **Commit changes**:
   - Commit message: `Initial research group website`
   - Select **Commit directly to the main branch**
5. Click **Commit changes**.

### Hidden file warning
`.nojekyll` starts with a dot. On some computers it may appear hidden.
If it is difficult to upload, the site can still work without it because this is simple HTML, but keeping it is recommended.

## C. Turn on GitHub Pages

1. In your repository, click **Settings**.
2. In the left sidebar, under **Code and automation**, click **Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
4. Click **Save**.
5. Wait a few minutes.
6. Refresh the Pages settings page.

Your expected website URL is:

`https://dochi37-cpu.github.io/`

## D. Confirm the site

Open:

`https://dochi37-cpu.github.io/`

Check:
- KOR / ENG buttons switch correctly
- People → PI tab opens
- publication DOI links work
- LinkedIn / KRICT / Global TOP links work
- mobile layout looks acceptable

## E. How to update the site later

Simplest method:
1. Ask ChatGPT to update `index.html`.
2. Download the new `index.html`.
3. Open the GitHub repository.
4. Click `index.html`.
5. Use the edit/upload replacement workflow.
6. Commit to `main`.
7. GitHub Pages republishes the site automatically.

For a beginner, you do NOT need Git, GitHub Desktop, Terminal, branches, pull requests, or GitHub Actions yet.

## F. Custom domain — later, not now

The default `github.io` address needs no CNAME.

When you buy or choose a domain:
1. In repository **Settings → Pages → Custom domain**, enter the domain.
2. GitHub will manage/add the repository CNAME when using branch publishing.
3. Configure DNS at your domain registrar.
4. Turn on **Enforce HTTPS** after DNS is valid.

`CNAME.example` in this repository is only a reminder/template.
Do not rename it to `CNAME` until a real domain is selected.
