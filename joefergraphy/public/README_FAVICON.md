# Favicon Generation Instructions

This folder contains files to help create all the necessary favicon and icon files for the Joefergraphy website.

## SVG Favicon

The `favicon.svg` file is already created and ready to use. This is a vector icon that will look crisp at any size and is supported by modern browsers.

## PNG Icons

To generate the PNG versions of the icons:

1. Open the `favicon-gen.html` file in a web browser
2. Right-click on each canvas and select "Save image as..."
3. Save the images with these names:
   - 32x32 canvas → `favicon.ico` and `favicon-32x32.png`
   - 180x180 canvas → `apple-touch-icon.png`
   - 192x192 canvas → `android-chrome-192x192.png`
   - 512x512 canvas → `android-chrome-512x512.png`

## OG Image

To generate the Open Graph image for social sharing:

1. Open the `og-image-gen.html` file in a web browser
2. Right-click on the canvas and select "Save image as..."
3. Save the image as `og-image.jpg`

## Verification

Once all icons are generated, make sure these files exist in the public folder:

- favicon.ico
- favicon.svg
- favicon-32x32.png
- apple-touch-icon.png
- android-chrome-192x192.png
- android-chrome-512x512.png
- og-image.jpg
- site.webmanifest

The Next.js configuration in `layout.tsx` is already set up to use these files. 