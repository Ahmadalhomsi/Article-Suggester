# Next.js Recommendation System

## Overview

This is a Next.js project integrated with Clerk for user authentication. The application allows users to search for articles and get personalized recommendations based on their interests. The backend utilizes SciBERT and FastText models for generating recommendations.

## Features

- User authentication with Clerk
- Search articles by keywords
- Get personalized recommendations
- Toggle to show top 5 recommendations
- Load datasets for recommendation

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.dev/)
- [React](https://reactjs.org/)
- [SciBERT](https://github.com/allenai/scibert)
- [FastText](https://fasttext.cc/)
- [React Hot Toast](https://react-hot-toast.com/)


## Getting Started

First, install the dependencies:
```bash
npm install
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
