This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Job Finder web aplikacija

Pokretanje:

```bash
prvo: npm install
zatim:
npm run dev
# or
yarn dev
# or
pnpm dev
```

Otvoriti [http://localhost:3000](http://localhost:3000)

## API routes
U Nextu se rutiranje radi pomocu foldera, par primera:
```
Folderi: app/api/users/route.ts - API endpoint je: localhost:3000/api/users
Folderi: app/api/users/[id]/route.ts - API endpoint je: localhost:3000/api/users/{USERID}
Folderi: app/api/users/[...credentials]/route.ts - API endpoint je: localhost:3000/api/users/{USERID}/{USERPASSWORD}
```
Ovo takodje vazi i za frontend, s tim sto je frontend sve sto je van api foldera.
Ukoliko se neke komponente nalaze u folderu (imeFoldera), ta putanja se ignorise.
Recimo ukoliko postoji:
```
app/(components)/header.tsx - Ne postoji endpoint na frontu za tu putanju
```


## Funkcionalnost
U aplikaciji se mogu listati poslovi bez obzira da li je korisnik ulogovan ili ne.
Klikom na "Person" ikonicu na header-u, moze se otici na login stranu.
Tu se moze izabrati ili sign in ili sign up. 
```
Test account za usera: username: nsretkovicc, password: nikola
Test account za kompaniju: username: nsretkovicCompany, password: nikola
```
Ukoliko je korisnik "obican user" on moze pretrazivati poslove na pocetnoj strani i prijaviti se na posao, takodje ima svoj profil koji moze menjati.
Ukoliko je korisnik kompanija, moze kreirati menjati i brisati poslove koje je ta kompanija kreirala. Ima svoj profil koji takodje moze menjati.


