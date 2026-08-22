# Vendored geodata

`gnb-adm1.geojson` — Guinea-Bissau administrative regions (ADM1), simplified.

- Source: [geoBoundaries](https://www.geoboundaries.org/) gbOpen release, built
  from OpenStreetMap / Wambacher boundary data.
- Licence: **Open Data Commons Open Database License (ODbL) v1.0**.
- Attribution is required and is rendered on the site next to the map.

Committed rather than fetched at build time so builds stay reproducible and
offline-capable. Regenerate the derived SVG paths with:

```bash
npm run build:map
```
