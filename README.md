![Zoba](https://raw.githubusercontent.com/emigrek/zoba/main/public/repo-header.png)

# 👀 Zoba
Open-source url shortener

## 📦 Used packages
| 📦 Package  | 📋 Reasons |
| ------------- | ------------- |
| T3 Stack | web development stack |
| Zustand | state management |
| HCaptcha | bot protection |
| NextAuth.js | authentication |
| Prisma | ORM |
| Tailwind CSS  | css framework  |
| React Icons | icons |
| React Hook Form | forms |
| Zod | validation |
| react-hot-toast | toasts |
| class-variance-authority | reusable components |
| clsx | reusable components |
| framer-motion | animations |


## 🚀 Running
```
git clone https://github.com/emigrek/zoba
cd zoba
npm install
```

Set up .env file
```env
# .env

# Core
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# PlanetScale DB
DATABASE_URL=

# Google Auth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# HCaptcha
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=
HCAPTCHA_SECRET_KEY=
```

Edit site config
```ts
// src/config/site.ts

export const siteConfig: SiteConfig = {
    name: "Zoba",
    description: "Shorten links and manage them in fashionable way"
}
```

Run development server
```
npm run dev
```
or
run production build
```
npm run build
```