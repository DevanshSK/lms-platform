<p align="center">
  <a href="https://github.com/DevanshSK/add-learn" rel="noopener">
 <img style="object-fit: contain;" height=200px src="./Add-learn.png" alt="Project logo"></a>
</p>

<h3 align="center">ADD Learn</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">Add Learn is an online e-learning platform designed to deliver real-world skills without interruptions.
    <br> 
</p>

## 📝 Table of Contents
- [📝 Table of Contents](#-table-of-contents)
- [🧐 About ](#-about-)
- [🏁 Getting Started ](#-getting-started-)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [🎈 Usage ](#-usage-)
- [🚀 Deployment ](#-deployment-)
- [⛏️ Built Using ](#️-built-using-)
- [✍️ Authors ](#️-authors-)

## 🧐 About <a name = "about"></a>
Add Learn is an online e-learning platform aiming to provide real world skills to the youth without any distractions.

This repository hosts only the frontend of the Add Learn.
The backend of Add Learn is found on this repository.

[Backend Repository Here](https://github.com/abhayg951/ADDLearn)

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you the frontend of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project into the production.

### Prerequisites
Make sure that you have these installed on your local machine before the installation of this project.

```
NodeJS 20.11.1 or above
Git CLI
```

### Installing
Here you can follow these steps to setup the frontend of Add Learn on your local machine.
A step by step series of examples that tell you how to get a development env running.

First clone this repo on your local machine using this command and open this project in a code editor, say `VS Code`.

```
git clone https://github.com/DevanshSK/add-learn
```

Then create a `.env.local` file and set the following environment variables.

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` contains the cloud name of cloudinary api.
- `My_EMAIL` and `EMAIL` contains the email address of that email which is used to send emails to the users.
- `PASS` variable contains the App Password of the given email address.

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
MY_EMAIL=
EMAIL=
PASS=
```

Then install all the modules by using this command.

```
npm install
```

And run the frontend by using this command.

```
npm run dev
```

<!-- End with an example of getting some data out of the system or using it for a little demo. -->

<!-- ## 🔧 Running the tests <a name = "tests"></a>
Explain how to run the automated tests for this system.

### Break down into end to end tests
Explain what these tests test and why

```
Give an example
```

### And coding style tests
Explain what these tests test and why

```
Give an example
``` -->

## 🎈 Usage <a name="usage"></a>
After these steps, the frontend will start running locally on the url `https://localhost:3000`

The live deployment of this web app can be found at [https://add-learn.vercel.app](https://add-learn.vercel.app)

## 🚀 Deployment <a name = "deployment"></a>
You can deploy this appication on the vercel just as we deploy a NextJS project.

Make sure that the following enviroment variables has been added to the vercel configuration.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## ⛏️ Built Using <a name = "built_using"></a>
- [React/NextJS](https://nextjs.org/) - Frontend Framework
- [TailwindCSS](https://tailwindcss.com/) - For Styling
- [ShadCN UI](https://ui.shadcn.com/) - For UI Components
- [Typescript](https://www.typescriptlang.org/) - Programming Language
- [Redux-Toolkit](https://redux-toolkit.js.org/) - For State Management
- [RTK-Query](https://redux-toolkit.js.org/rtk-query/overview) - For Data Fetching.

## ✍️ Authors <a name = "authors"></a>
- [@devanshsk](https://github.com/DevanshSK) - Frontend Developer
  - Developed the responsive user-interface and dashboards using Tailwind and ShadCN-UI.
  - Implemented FastAPI Restful Api's with efficient data fetching and state management using Redux-Toolkit and RTK-Query.
  - Built a robust role based authentication with Redux and JWT Tokens.
  - Deployed the application on Vercel.
- [@abhayg951](https://github.com/abhayg951) - Backend Developer
  - Created Restful Api's with FastAPI framework utilizing Python and PostgresSQL database.
  - Built a robust role based jwt authentication for users and admin.
  - Added authorised form submissions using Authorization token and FormData.
  - Developed various Api's for users, courses and chapters. Including video and file handling using cloudinary.
  - Created a GUI for accessing the API's using Swagger UI.
- [@DevanshDixitDD](https://github.com/DevanshDixitDD) - UI/UX Designer and Frontend Developer
  - Designed the brand identity and user interface of the ADD Learn.
  - Designed and developed mordern and responsive landing pages with asthetically pleasing animations.
  - Implemented NextJS with Server components to make the landing pages performance faster.

See also the list of [contributors](https://github.com/DevanshSK/add-learn/contributors) who participated in this project.

<!-- ## 🎉 Acknowledgements <a name = "acknowledgement"></a>
- Hat tip to anyone whose code was used
- Inspiration
- References -->




<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->
