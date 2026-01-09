---
description: How to create a shareable link for the application
---

# How to Share the Application

To allow others to view your local application, we use a tunneling service (`localtunnel`). This allows you to "activate" a public link whenever you want and "deactivate" it by stopping the script.

## Steps

1. **Ensure the App is Running**
   Make sure your local development server is running in one terminal:
   ```bash
   npm run dev
   ```

2. **Activate the Shareable Link**
   Open a **new terminal** and run the custom share script we've added:
   ```bash
   npm run share
   ```

3. **Get the Link**
   Let it run. It will output your shareable URL.
   - We've configured it to try to use: `https://snehi-ai-platform.loca.lt`
   - If that name is taken, you might get a random one.

4. **Deactivate the Link**
   To turn off the link (making the site inaccessible to others), simply press `CTRL + C` in the terminal where `npm run share` is running.

## Notes
- By keeping the terminal open, the link stays **Active**.
- By closing the terminal, the link becomes **Inactive**.
- Both `npm run dev` AND `npm run share` must be running.
