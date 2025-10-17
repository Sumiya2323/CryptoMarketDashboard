This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Setup заавар
   1. Кодыг git clone [https://github.com/Sumiya2323/CryptoMarketDashboard.git] хийж авах
   2. Төсөлтэй хамаатай бүх package-уудыг суулгана. (npm install, npm install axios, npx shadcn@latest add all, npm install, npm install @tanstack/react-query)
   3. Төслийг ажилуулах (npm run dev)
2. Architecture
   1. Үндсэн технологууд
    1.  Next.js
    2.  TypeScript
    3.  Tanstack Query
    4.  Tailwind CSS
    5.  Binance WebSockets
    6.  ShadCN
   2. Folder architecture
    1.  page (үндсэн хуудсанд зөвхөн голлох нэг л components-с MarketTable хэсгийг дуудаж хариуулж байгаа)
    2.  components (UI component, гол хүснэгтийг харуулсан component, ажиллагаанд туслах component агуулж байгаа)
    3.  lib (rest болон webSocket api-г дуудаж байгаа функцүүдийг агуулсан)
    4.  utils (formatter хэсэг нь тоонууд дээр ажиллах функцүүдийг агуулсан)
3. Сайжруулалт
   1. Бодит цагийн дата авахад дата нь анивчиж харуулах мөн өссөн үед ногоон, буурсан үед улаанаар харуулна.
