# Mockwebshop – klädbutik (E-handel)

Detta är en modern e-handelsapplikation byggd i **React**, **TypeScript** och **Vite**. Applikationen kommunicerar med ett externt REST-API för att hämta godisprodukter, hantera en lokal varukorg via React Context, samt skicka typsäkra beställningar med validering via React Query (Mutations).

## 🚀 Funktioner

- **Dynamisk Produkthämtning:** Hämtar aktuellt sortiment och lagerstatus live från API:et.
- **Global Varukorg (Context API):** Hanterar tillägg, borttagning och kvantitet av produkter globalt i applikationen.
- **Smart Kassa (Checkout):** Sidan tar emot varukorgens innehåll och totalsumma via React Routers interna `state`, vilket minimerar onödiga API-anrop och omberäkningar.
- **Typsäker Arkitektur:** 100% strikt TypeScript (inga `any`) med väldefinierade interfaces för både API-responser, produktstrukturer och orderdata.
- **Asynkron Orderhantering:** Använder TanStack Query (React Query) `useMutation` för att posta ordrar, hantera laddningsstatus och felhantering på ett industristandardiserat sätt.
- **Responsiv Layout:** Semantisk HTML kombinerat med React-Bootstrap för en mobilvänlig och följsam användarupplevelse.

## 🛠️ Teknikstack

- **Frontend:** React (TSX), TypeScript, Vite
- **Styling:** React-Bootstrap / Bootstrap 5
- **Datahantering & API:** Axios, TanStack Query (React Query v5)
- **Routing:** React Router DOM
