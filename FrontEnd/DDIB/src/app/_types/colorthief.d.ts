declare module "colorthief" {
  class ColorThief {
    getPalette(image: HTMLImageElement, colorCount?: number): Array<[number, number, number]>;
    getColor(image: HTMLImageElement): [number, number, number];
  }

  export = ColorThief;
}
