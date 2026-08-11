## componenti
- **TypeScript** = linguaggio + compilatore
- **Node.js** = ambiente che esegue JavaScript
- **pnpm** = package manager
- **package.json** = descrizione/configurazione del progetto Node
- **tsconfig.json** = configurazione TypeScript
- **Vitest** = framework/test runner
- **`.ts`** = codice TypeScript
- **`.spec.ts`** = codice di test

## inizializzazione_progetto
pnpm init -> crea package.json
### package.json

contiene informazioni come
```
{ 
	"name": "my-project", 
	"version": "1.0.0", 
	"type": "module", 
	"scripts": {}, 
	"dependencies": {}, 
	"devDependencies": {} }
```

ci sono due tipi di dipendenze
`dependencies`: Sono librerie necessarie al programma **quando viene eseguito**.
Per esempio, se il tuo programma usasse una libreria per collegarsi a PostgreSQL:

```
"dependencies": {
  "some-database-library": "..."
}
```

`devDependencies`:Sono librerie necessarie per **sviluppare** il progetto.
Nel nostro caso:

```
"devDependencies": {
  "typescript": "...",
  "tsx": "...",
  "vitest": "...",
  "@types/node": "..."
}
```

Queste servono durante lo sviluppo/test.

Le dipende vengono installate attraverso `pnpm add -D dep1 dep2 dep3`.
`pnpm`:
1. cerca i pacchetti;
2. sceglie le versioni compatibili;
3. li scarica;
4. aggiorna `package.json`;
5. aggiorna/crea `pnpm-lock.yaml`;
6. prepara `node_modules`.

Quindi il tuo `package.json` diventa qualcosa tipo:
```
{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module",
  "devDependencies": {
    "@types/node": "^24.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0",
    "vitest": "^3.0.0"
  }
}
```

### node_modules
Dentro ci sono le librerie installate e, soprattutto, le loro dipendenze.
Non devi modificarlo manualmente.
In genere non si committa su Git.

### pnpm-lock.yaml

Il `package.json` dice essenzialmente:
> "Mi serve TypeScript in una versione compatibile con questa regola."

Il lockfile dice:
> "Questa è esattamente la versione che abbiamo installato, con queste esatte dipendenze."

Serve per rendere le installazioni riproducibili.
Ad esempio:
```
computer tuo
      │
      ├── pnpm install
      │
      ▼
stesse versioni
      │
      ▼
computer collega
```

## typescript

TypeScript è un **superset di JavaScript**.
Significa che JavaScript:

```
const name = "Mario";
```

è valido TypeScript.

Ma TypeScript aggiunge cose come:
```
const name: string = "Mario";
```

oppure:
```
function sum(a: number, b: number): number {
  return a + b;
}
```

Qui stiamo dicendo:
```
a     → number
b     → number
return → number
```
TypeScript può quindi controllare molti errori **prima che il programma venga eseguito**

Node.js però esegue JavaScript. Quindi normalmente hai:
```
index.ts
   │
   │ TypeScript compiler
   ▼
index.js
   │
   │ Node.js
   ▼
programma
```
Ed è qui che entra in gioco `tsx`. `tsx` ci permette di eseguire direttamente file TypeScript durante lo sviluppo. Quindi invece di fare:
```
tsc
node dist/index.js
```
possiamo fare:
```
tsx src/index.ts
```
È soprattutto una comodità da sviluppo. Non confondere:
```
TypeScript
```
con:
```
tsx
```
TypeScript è il linguaggio/compilatore. `tsx` è uno strumento che permette di eseguire TypeScript comodamente in ambiente Node.

## tsconfig.json
Ora dobbiamo dire a TypeScript come comportarsi. Creiamo:
```
tsconfig.json
```
con:
```
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

## per eseguire il programma
Aggiungiamo a `package.json`: 
```
"scripts": {
  "start": "tsx src/index.ts"
}
```
Ora:
```
pnpm start
```
fa internamente:
```
pnpm start
      ↓
legge package.json
      ↓
trova "start"
      ↓
tsx src/index.ts
      ↓
esegue index.ts
      ↓
Hello world
```
Questo spiega anche il tuo errore precedente:
```
ERR_PNPM_NO_SCRIPT_OR_SERVER
Missing script start
```
Perché `package.json` non aveva:
```
"start": "..."
```

# mappa mentale
 ```
                          PROGETTO
                            │
              ┌─────────────┴─────────────┐
              │                           │
          CONFIGURAZIONE                CODICE
              │                           │
       ┌──────┴──────┐              ┌─────┴─────┐
       │             │              │           │
 package.json   tsconfig.json      .ts       .spec.ts
       │             │              │           │
       │             │              │           │
     pnpm        TypeScript       app code     tests
       │             │              │           │
       │             └──────┐       │           │
       │                    ▼       │           │
       │              type checking │           │
       │                            │           │
       └──────────────┐             │           │
                      ▼             ▼           ▼
                   scripts        tsx        Vitest
                      │             │           │
                      └─────────────┴───────────┘
                                    │
                                    ▼
                               programma
 ```