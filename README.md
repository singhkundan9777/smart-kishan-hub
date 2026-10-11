# Smart Kisan Hub

A Next.js + TypeScript starter project for an agriculture information platform.

## Features included
- Responsive Hindi-first landing page for mobile phones, tablets, laptops and desktop screens
- Mobile hamburger navigation and responsive hero, cards, search controls and forms
- Searchable sample crop guide
- Farmer registration API with MongoDB Atlas
- AI Crop Doctor image upload API using Gemini
- Current weather API integration using OpenWeather
- API error states when keys are not configured
- Environment-variable template and deployment notes

## Requirements
- Node.js 18.17+ (Node 20 LTS recommended)
- npm
- MongoDB Atlas account (for saving registrations)
- Gemini API key (for Crop Doctor)
- OpenWeather API key (for weather)

## Run locally
1. Install Node.js.
2. Extract this folder and open it in VS Code.
3. Open the terminal in this folder.
4. Run `npm install`.
5. Copy `.env.example` to `.env.local`.
6. Add your own API keys and MongoDB connection string to `.env.local`.
7. Run `npm run dev`.
8. Open http://localhost:3000.

Never commit `.env.local` to GitHub. Never share secret API keys in screenshots or chat.

## MongoDB setup
1. Create a MongoDB Atlas cluster.
2. Create a database user with a strong password.
3. Allow network access only as appropriate for your deployment.
4. Copy the connection string into `MONGODB_URI` in `.env.local`.
5. Set `MONGODB_DB=smart_kisan_hub`.

Registration submissions are stored in `farmer_registrations`. Before collecting real users' information, add a clear privacy notice, consent, access controls, retention rules and abuse prevention.

## Gemini setup
Add `GEMINI_API_KEY` to `.env.local`. Crop Doctor sends the uploaded image to Gemini for preliminary guidance. The model response is not a definitive diagnosis. Do not rely on it alone for pesticide selection or dosage.

## Weather setup
Add `OPENWEATHER_API_KEY` to `.env.local`. The included endpoint provides current weather, not a five-day forecast.

## Deploy to Vercel
1. Create a private GitHub repository and push this project.
2. Import the repository into Vercel.
3. Add `MONGODB_URI`, `MONGODB_DB`, `GEMINI_API_KEY`, and `OPENWEATHER_API_KEY` in Vercel Project Settings > Environment Variables.
4. Deploy and test registration, crop-doctor upload, and weather endpoint.
5. Do not mark integrations as live until each has been tested.

## Important limitations
- Crop catalogue is a small starter list, not a complete crop database for all states/districts.
- Live mandi prices are not implemented yet; use a reliable authorized data source and show source + timestamp.
- Login/authentication, admin panel, OTP, user dashboard, image storage, official scheme catalogue, multilingual voice support, rate limiting and production monitoring are not implemented yet.
- Validate agricultural guidance with local experts and official product labels.
- This is a runnable starter, not a claim that the website has already been deployed or production-audited.
