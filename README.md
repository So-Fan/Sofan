# Sofan

NFT social media &amp; marketplace to connect athletes and fans

# Pour passer de mainnet à testnet:

## .env à changer:

- REACT_APP_BLOCKCHAIN changer la string de "mainnet" à "goerli"
- changer infura de "mainnet" à "goerli" (ex: mainnet.infura.io/v3/cléAPI)

## Pour build:

- vers staging `npm run build:staging`
- vers master `npm run build:master`

## Pour deploy:

### sur staging

- mettre la commande `firebase deploy --only hosting:staging-sofan-app --project sofan-app`
- dans `firebase.json` changer `"site":"sofan-app"` par `"site":"staging-sofan-app"`

### sur master

- mettre la commande `firebase deploy --only hosting:sofan-app --project sofan-app`
- dans `firebase.json` changer `"site":"staging-sofan-app"` par `"site":"sofan-app"`

# Mineur à changer:

## FullPagePost.js à changer:

- `` navigator.clipboard.writeText(
        `https://staging.sofan.app/athleteprofile/${userId}`) `` et `` navigator.clipboard.writeText(
        `https://staging.sofan.app/userprofile/${userId} ``
  ) par `` navigator.clipboard.writeText(
        `https://sofan.app/athleteprofile/${userId}`) `` et `` navigator.clipboard.writeText(
        `https://sofan.app/userprofile/${userId} ``
