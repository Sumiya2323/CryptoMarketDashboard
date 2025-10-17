This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Setup заавар
   #  Кодыг git clone [https://github.com/Sumiya2323/CryptoMarketDashboard.git] хийж авах
   # Төсөлтэй хамаатай бүх package-уудыг суулгана. (npm install, npm install axios, npx shadcn@latest add all, npm install, npm install @tanstack/react-query)
   # Төслийг ажилуулах (npm run dev)
2. Architecture
   1. Үндсэн технологууд
    #  Next.js
    #  TypeScript
    #  Tanstack Query
    #  Tailwind CSS
    #  Binance WebSockets
    #  ShadCN
   2. Folder architecture
    #  page (үндсэн хуудсанд зөвхөн голлох нэг л components-с MarketTable хэсгийг дуудаж хариуулж байгаа)
    #  components (UI component, гол хүснэгтийг харуулсан component, ажиллагаанд туслах component агуулж байгаа)
    #  lib (rest болон webSocket api-г дуудаж байгаа функцүүдийг агуулсан)
    #  utils (formatter хэсэг нь тоонууд дээр ажиллах функцүүдийг агуулсан)

