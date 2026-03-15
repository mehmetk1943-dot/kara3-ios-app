# Kara3 Mobile App

Premium jewelry shopping app for Kara3, built with Expo SDK 54 and React Native.

---

## Local Setup (Windows + Expo Go on iPhone)

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18 LTS or 20 LTS |
| npm | comes with Node |
| Expo Go (iPhone) | latest from App Store |

> **Do not use Yarn.** Use `npm` to avoid lockfile conflicts.

---

### Step 1 — Clone and install

```powershell
git clone <repo-url>
cd kara3-ios-app
npm install
```

### Step 2 — Let Expo verify/pin compatible versions

```powershell
npx expo install --fix
```

This auto-corrects any package version that is incompatible with Expo SDK 54.
Run it after every `git pull` that touches `package.json`.

### Step 3 — Start the dev server

```powershell
npx expo start
```

A QR code will appear in your terminal.

### Step 4 — Open on iPhone

1. Open the **Expo Go** app on your iPhone.
2. Tap **Scan QR Code** and scan the code from your terminal.
3. Make sure your iPhone and Windows PC are on **the same Wi-Fi network**.

> If the app does not load, press `r` in the terminal to reload, or restart Expo Go.

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `Cannot find module 'babel-preset-expo'` | Run `npm install` — it is now listed in devDependencies |
| `Cannot find module 'react-native-worklets/plugin'` | Fixed — reanimated removed (not used in this project) |
| `Unable to resolve module react-native-svg` | Run `npm install` then `npx expo install --fix` |
| Peer dependency warnings during install | Safe to ignore; run `npx expo install --fix` to verify |
| QR code scans but app won't load | Confirm phone + PC are on the same network; try disabling Windows Firewall temporarily |
| Metro bundler port conflict | `npx expo start --port 8082` |

---

## Tech Stack

- **Expo SDK 54** / React Native 0.76
- **React Navigation v7** (native stack + bottom tabs)
- **react-native-svg** for the Kara3 crown/gem logo
- **expo-linear-gradient** for gold gradient accents
- **react-native-gesture-handler** + **react-native-screens** for navigation performance
- Custom `Kara3Logo` component with SVG crown motif matching the storefront header

---

## Project Structure

```
src/
  components/   # Shared UI (Kara3Logo, ProductCard, GoldButton, ...)
  screens/      # HomeScreen, ProductDetailScreen, CartScreen, ...
  navigation/   # Tab + stack navigators
  context/      # CartContext, WishlistContext
  theme/        # Colors, Typography, Spacing
  data/         # Mock product/collection data
  types/        # TypeScript types
```
