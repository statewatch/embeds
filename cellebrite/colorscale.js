import { colorRange } from "./colors.js";

async function createColorScale() {
  const geojson = await d3.json("countries_totals.geojson");

  if (!geojson || !Array.isArray(geojson.features)) {
    throw new Error(
      "createColorScale: countries_totals.geojson has no .features",
    );
  }

  // Step 1: Calculate total "eur" value per country (from geojson properties)
  const countryTotals = {};

  geojson.features.forEach((f) => {
    const countryName = f.properties?.name;
    const eurValue = +f.properties?.eur;

    if (!countryName || Number.isNaN(eurValue)) return;

    if (!countryTotals[countryName]) countryTotals[countryName] = 0;
    countryTotals[countryName] += eurValue;
  });

  // Step 2: Sort country names based on total "eur" value
  const sortedCountryNames = Object.keys(countryTotals).sort((a, b) => {
    return countryTotals[b] - countryTotals[a];
  });

  // Step 3: Return sorted country names for use in the HTML file
  return { colorRange, sortedCountryNames };
}

export { createColorScale };
