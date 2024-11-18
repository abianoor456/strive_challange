This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Local setup

First, set up the following environment variables to configure your application:

- `OPENAI_API_KEY`: Your OpenAI API key for accessing language model services.
- `MONGODB_URI`: Connection string to your MongoDB instance.

Create a `.env.local` file in the project root and add these keys:

```bash
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_uri
```

Second, install the dependencies:
```bash
npm run dev
# or
yarn dev
```

Lastly, run the development server:

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

Note: It is recommended to use node version>19