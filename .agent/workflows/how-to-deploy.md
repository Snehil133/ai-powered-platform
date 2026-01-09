---
description: How to deploy the application to the cloud (Vercel) so it stays online 24/7
---

# How to Deploy to Vercel

If you want the link to work **even when your computer is off or the terminal is closed**, you need to **deploy** the application to the cloud. We will use Vercel (the creators of Next.js) for this.

## Steps

1.  **Run the Deploy Command**
    Open a terminal and run:
    ```bash
    npm run deploy
    ```

2.  **Authenticate (First Time Only)**
    - If you are not logged in, it will ask you to log in.
    - Choose "Continue with Email" or "GitHub" and follow the instructions in your browser.

3.  **Configure Project (First Time Only)**
    The terminal will ask you a series of questions. You can usually accept the defaults by pressing **Enter** for each one:
    - *Set up and deploy "..."?* **y**
    - *Which scope do you want to deploy to?* **(Select your name)**
    - *Link to existing project?* **N** (unless you already made one)
    - *What’s your project’s name?* **(Press Enter)**
    - *In which directory is your code located?* **(Press Enter)**
    - *Want to modify these settings?* **N**

4.  **Wait for Deployment**
    - It will upload your code and build it in the cloud.
    - Once finished, it will give you a **Production** URL (e.g., `https://ai-platform.vercel.app`).
    - **This link causes your app to live on the internet permanently.**

## How to Update
If you make changes to your code, simply run `npm run deploy` again to update the live website.

## How to "Forcefully Stop" (Take Down)
If you want to remove the website so no one can see it anymore:
1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Find the project.
3.  Go to **Settings** -> **General** -> **Delete Project**.
