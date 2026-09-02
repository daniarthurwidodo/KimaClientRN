# Fonts

Drop these `.ttf` files here from https://fonts.google.com/specimen/Rethink+Sans:

- `RethinkSans-Regular.ttf`
- `RethinkSans-Medium.ttf`
- `RethinkSans-Bold.ttf`

Then link:

```bash
npx react-native-asset
cd ios && pod install && cd ..
# rebuild both platforms
```

Font family names referenced in `src/shared/theme/palette.ts`.
