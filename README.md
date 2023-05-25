# Clerkie Challenge 

Stack: NextJS, TypeScript, TailwindCSS

## Getting Started
Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Emulating data fetching features 
To run the json server with sample data, 
```
json-server --watch db.json --port 5000
```
Default port when running frontend is port 3000. To avoid conflict, use port 5000 for json server. Note: Please run the json server even when running the app from the Vercel deployment in order to fetch the data! 




