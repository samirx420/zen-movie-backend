### JWT token

```
bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTI5MzYxNzksImRhdGEiOnsiaWQiOjEsInVzZXJuYW1lIjoicHV6YW5zYWt5YSIsImZpcnN0X25hbWUiOiJmcmFua2xpbnAiLCJsYXN0X25hbWUiOiJJc2FpYWgiLCJhdmF0YXIiOiIvYXZhdGFyXzE1OTI4NDkwMzkxMjNfdGVzdC5wbmciLCJjcmVhdGVkX2F0IjoiMjAyMC0wNi0yMiAxMjoxNzoxMiIsIm1vZGlmaWVkX2F0IjpudWxsLCJkZWxldGVkX2F0IjpudWxsLCJzdGF0dXMiOjF9LCJpYXQiOjE1OTI5MzI1Nzl9.qj2_erFaXRhFL7_ojognzmJUoCWRcxZ3njJV2LesH7U
```
### api token

```
$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG
```

## Getting started
 1. Migrate Database
```bash
npx knex migrate:latest
```

2. build project
```bash
npx tsc
```

3. start project
```bash
npm start
```


## Development process
 1. Migrate Database if not exist (pzt.pz)
```bash
npx knex migrate:latest
```

2. build project on watch mode
```bash
npx tsc -w
```

3. start project
```bash
nodemon dist/web/index.js
```


## Testing process
 1. Run testing command
```bash
$ npm run test-dev
$ yarn run test-dev
```

2. build project on watch mode
```
npx tsc -w
```

3. start project
```
nodemon dist/web/index.js
```