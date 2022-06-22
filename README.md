Setup:
```bash
npm install
echo "REACT_APP_PDFTRON_LICENSE=\"YOUR LICENSE KEY\"" > .env.local
npm start
```

Issues:
- Have to add `body { overflow: hidden }` to prevent overflow when document viewer mounts. Looks like an iframe injected on mount causes this
- Menu seems to cause selection offset
- Selection issue present in second pdf
- If you add a third pdf the rendering issues should start to appear
