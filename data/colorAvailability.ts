export interface ColorAvailability {
  [motorcycleId: string]: {
    [colorIndex: number]: boolean;
    modelAvailable?: boolean;
  };
}

export const defaultColorAvailability: ColorAvailability = {
  '1': { 0: true, 1: true, 2: true, modelAvailable: true }, // PCX 160
  '2': { 0: true, 1: true, 2: true, modelAvailable: true }, // Click 160i
  '3': { 0: true, 1: true, 2: true, modelAvailable: true }, // CBR150R
  '4': { 0: true, 1: true, 2: true, modelAvailable: true }, // ADV 160
  '5': { 0: true, 1: true, 2: true, modelAvailable: true }, // Wave 110i
  '6': { 0: true, 1: true, 2: true, modelAvailable: true }, // TMX Supremo 150
  '7': { 0: true, 1: true, 2: true, modelAvailable: true }, // Click 125 SE
  '8': { 0: true, 1: true, 2: true, modelAvailable: true }, // Click 125 Standard
  '9': { 0: true, 1: true, 2: true, modelAvailable: true }, // Beat Premium
  '10': { 0: true, 1: true, 2: true, modelAvailable: true }, // Beat Playful
  '11': { 0: true, 1: true, 2: true, modelAvailable: true }, // Winner X Premium
  '12': { 0: true, 1: true, 2: true, modelAvailable: true }, // Winner X Standard
  '13': { 0: true, 1: true, 2: true, modelAvailable: true }, // Winner X Racing
  '14': { 0: true, 1: true, 2: true, modelAvailable: true }, // TMX 125 Alpha
  '15': { 0: true, 1: true, 2: true, modelAvailable: true }, // Giorno+
};