/**
 * NH-45 Surface Roughness Analysis: Post-Flood Degradation
 * Study Area: Guindy / Saidapet / Adyar (Chennai)
 * Comparison: 2019 (Baseline) vs 2022 (Post-2021 Floods)
 */

// 1. Define Area of Interest (Saidapet/Guindy Hotspot)
var roi = ee.Geometry.Point([80.2128, 13.0168]).buffer(2000); 
Map.centerObject(roi, 14);
Map.addLayer(roi, {color: 'black'}, 'Study area', true, 0.7);


// 2. Load Sentinel-1 SAR GRD Data
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(roi)
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .select('VV');

// 3. Create Temporal Composites
// Pre-Flood Baseline (2019)
var preFloodRaw = s1.filterDate('2019-01-01', '2019-12-31').median().clip(roi);

// Post-Flood Recovery (2022 - after the severe Nov 2021 events)
var postFloodRaw = s1.filterDate('2022-01-01', '2022-06-30').median().clip(roi);

// 4. Calculate Roughness Proxy (Backscatter Difference)
// An increase in VV backscatter on asphalt often indicates higher roughness (potholes/debris)
var roadMask = preFloodRaw.lt(-8); 

var preFlood = preFloodRaw.updateMask(roadMask);
var postFlood = postFloodRaw.updateMask(roadMask);
var roughnessDiff = postFlood.subtract(preFlood).rename('Roughness_Change');

// 5. Visualization
var sarVis = {min: -20, max: -8};
var diffVis = {min: -1, max: 3, palette: ['#0000FF', '#FFFFFF', '#FF0000']};

Map.addLayer(preFlood, sarVis, '2019 Pre-Flood (Smooth)');
Map.addLayer(postFlood, sarVis, '2022 Post-Flood (Rough)');
Map.addLayer(roughnessDiff, diffVis, 'Roughness Change (Red = Degraded)');

// 6. Quantitative Analysis: Exporting Mean Values for NH-45
// Note: In a full study, you would use a 'Road Buffer' geometry here.

// Calculate Mean for 2019
var stats2019 = preFlood.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: roi,
  scale: 10,
  maxPixels:1e9
});

// Calculate Mean for 2022
var stats2022 = postFlood.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: roi,
  scale: 10,
  maxPixels:1e9
});

print('2019 Mean Roughness (dB):', stats2019.get('VV'));
print('2022 Mean Roughness (dB):', stats2022.get('VV'));

var stats = roughnessDiff.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: roi,
  scale: 10,
  maxPixels: 1e9
});

print('Mean Roughness Change in Hotspot (dB):', stats.get('Roughness_Change'));

// 7. Legend creation (Optional/Visual helper)
print('Legend: RED indicates increased backscatter (Potential Road Degradation)');

