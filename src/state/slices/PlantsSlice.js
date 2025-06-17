import { createSlice } from '@reduxjs/toolkit';

// List of Colorado native plants
const initialPlants = [
  {
    id: '1',
    name: 'Colorado Blue Columbine',
    description: 'The state flower of Colorado',
    detailedDescription: 'The Colorado Blue Columbine (Aquilegia coerulea) is the official state flower of Colorado. It\'s a beautiful perennial with distinctive blue and white flowers. The plant typically grows to about 20 inches tall and blooms from late spring to early summer. It prefers partial shade and well-drained soil.',
    water: 'Moderate',
    light: 'Partial shade',
    soil: 'Well-drained, rich in organic matter',
    bloomTime: 'Late spring to early summer',
    height: '15-20 inches',
    spacing: '12-18 inches',
    maintenance: 'Low to moderate'
  },
  {
    id: '2',
    name: 'Rocky Mountain Juniper',
    description: 'Evergreen tree native to Colorado',
    detailedDescription: 'The Rocky Mountain Juniper (Juniperus scopulorum) is a hardy evergreen tree native to the Rocky Mountain region. It can grow up to 30-40 feet tall and has a distinctive conical shape. The foliage is blue-green and the tree produces small, blue, berry-like cones.',
    water: 'Low',
    light: 'Full sun',
    soil: 'Well-drained, tolerates poor soils',
    bloomTime: 'N/A (Evergreen)',
    height: '30-40 feet',
    spacing: '15-20 feet',
    maintenance: 'Low'
  },
  {
    id: '3',
    name: 'Ponderosa Pine',
    description: 'Common in Colorado forests',
    detailedDescription: 'The Ponderosa Pine (Pinus ponderosa) is one of the most common trees in Colorado forests. It can grow to impressive heights of 60-100 feet. The bark is distinctive, with large plates that smell like vanilla or butterscotch when warm. The needles grow in bundles of three.',
    water: 'Low to moderate',
    light: 'Full sun',
    soil: 'Well-drained, adaptable',
    bloomTime: 'N/A (Evergreen)',
    height: '60-100 feet',
    spacing: '20-25 feet',
    maintenance: 'Low'
  },
  {
    id: '4',
    name: 'Pasque Flower',
    description: 'Early spring bloomer',
    detailedDescription: 'The Pasque Flower (Pulsatilla patens) is one of the earliest blooming wildflowers in Colorado. It produces lavender to purple cup-shaped flowers with yellow centers. The plant is covered with silky hairs that help protect it from cold spring temperatures.',
    water: 'Low to moderate',
    light: 'Full sun to partial shade',
    soil: 'Well-drained, sandy or rocky',
    bloomTime: 'Early spring',
    height: '6-8 inches',
    spacing: '8-12 inches',
    maintenance: 'Low'
  },
  {
    id: '5',
    name: 'Blanket Flower',
    description: 'Drought-tolerant perennial',
    detailedDescription: 'The Blanket Flower (Gaillardia aristata) is a colorful, drought-tolerant perennial native to Colorado. It produces daisy-like flowers with red centers and yellow tips. The plant blooms throughout the summer and attracts butterflies and other pollinators.',
    water: 'Low',
    light: 'Full sun',
    soil: 'Well-drained, tolerates poor soils',
    bloomTime: 'Summer to fall',
    height: '12-18 inches',
    spacing: '12-18 inches',
    maintenance: 'Low'
  },
  {
    id: '6',
    name: 'Prairie Zinnia',
    description: 'Low-growing wildflower',
    detailedDescription: 'The Prairie Zinnia (Zinnia grandiflora) is a low-growing wildflower native to Colorado. It produces small, yellow, daisy-like flowers throughout the summer. The plant forms a mat-like ground cover and is extremely drought-tolerant.',
    water: 'Very low',
    light: 'Full sun',
    soil: 'Well-drained, sandy or rocky',
    bloomTime: 'Summer',
    height: '4-8 inches',
    spacing: '12-18 inches',
    maintenance: 'Very low'
  },
  {
    id: '7',
    name: 'Sulphur Flower',
    description: 'Drought-tolerant groundcover',
    detailedDescription: 'The Sulphur Flower (Eriogonum umbellatum) is a drought-tolerant groundcover native to Colorado. It produces clusters of bright yellow flowers on short stems. The plant forms a low mat and is excellent for rock gardens and xeriscaping.',
    water: 'Very low',
    light: 'Full sun',
    soil: 'Well-drained, sandy or rocky',
    bloomTime: 'Late spring to summer',
    height: '4-10 inches',
    spacing: '12-18 inches',
    maintenance: 'Very low'
  },
  {
    id: '8',
    name: 'Rocky Mountain Penstemon',
    description: 'Vibrant blue-purple flowers',
    detailedDescription: 'The Rocky Mountain Penstemon (Penstemon strictus) is a stunning wildflower native to Colorado. It produces spikes of vibrant blue-purple tubular flowers that attract hummingbirds and bees. The plant is drought-tolerant once established.',
    water: 'Low',
    light: 'Full sun to partial shade',
    soil: 'Well-drained',
    bloomTime: 'Late spring to early summer',
    height: '18-36 inches',
    spacing: '12-18 inches',
    maintenance: 'Low'
  },
  {
    id: '9',
    name: 'Chocolate Flower',
    description: 'Smells like chocolate in the morning',
    detailedDescription: 'The Chocolate Flower (Berlandiera lyrata) is a unique wildflower native to Colorado. It produces yellow daisy-like flowers that emit a chocolate scent, especially in the morning. The plant is drought-tolerant and attracts butterflies.',
    water: 'Low',
    light: 'Full sun',
    soil: 'Well-drained',
    bloomTime: 'Summer to fall',
    height: '12-18 inches',
    spacing: '12-18 inches',
    maintenance: 'Low'
  },
  {
    id: '10',
    name: 'Scarlet Globemallow',
    description: 'Orange-red flowers on silver foliage',
    detailedDescription: 'The Scarlet Globemallow (Sphaeralcea coccinea) is a drought-tolerant wildflower native to Colorado. It produces bright orange-red flowers on silver-gray foliage. The plant is extremely hardy and can thrive in harsh conditions.',
    water: 'Very low',
    light: 'Full sun',
    soil: 'Well-drained, tolerates poor soils',
    bloomTime: 'Late spring to summer',
    height: '6-12 inches',
    spacing: '12-18 inches',
    maintenance: 'Very low'
  },
  {
    id: '11',
    name: 'Prairie Coneflower',
    description: 'Yellow daisy-like flowers',
    detailedDescription: 'The Prairie Coneflower (Ratibida columnifera) is a wildflower native to Colorado. It produces distinctive yellow daisy-like flowers with drooping petals and elongated central cones. The plant is drought-tolerant and attracts butterflies and birds.',
    water: 'Low',
    light: 'Full sun',
    soil: 'Well-drained',
    bloomTime: 'Summer to fall',
    height: '18-30 inches',
    spacing: '12-18 inches',
    maintenance: 'Low'
  },
  {
    id: '12',
    name: 'Blue Grama Grass',
    description: 'Native prairie grass',
    detailedDescription: 'Blue Grama Grass (Bouteloua gracilis) is a native prairie grass of Colorado. It forms dense clumps and produces distinctive seed heads that resemble eyelashes. The grass is extremely drought-tolerant and provides important habitat for wildlife.',
    water: 'Very low',
    light: 'Full sun',
    soil: 'Well-drained, tolerates poor soils',
    bloomTime: 'Summer',
    height: '12-18 inches',
    spacing: '12-18 inches',
    maintenance: 'Very low'
  },
];

export const plantsSlice = createSlice({
  name: 'plants',
  initialState: {
    plants: initialPlants,
  },
  reducers: {
    // Add reducers here if needed for future functionality
    // For now, we just need to provide the data
  },
});

// Export selectors
export const selectAllPlants = (state) => state.plants.plants;
export const selectPlantById = (state, plantId) =>
  state.plants.plants.find(plant => plant.id === plantId);
export const selectPlantByName = (state, plantName) =>
  state.plants.plants.find(plant => plant.name === plantName);

export default plantsSlice.reducer;
