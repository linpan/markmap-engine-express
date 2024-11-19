const puppeteer = require('puppeteer');
const { Transformer } = require('markmap-lib');
const { fillTemplate } = require('markmap-render');
const nodeHtmlToImage = require('node-html-to-image');
const { writeFile } = require('node:fs/promises');

async function renderMarkmap(markdown, height = 1600, width = 2560, quality = 90) {
    try {
        // Initialize the transformer and generate markmap assets
        const transformer = new Transformer();
        const { root, features } = transformer.transform(markdown);
        const assets = transformer.getUsedAssets(features);

        // Create the HTML template
        const html = fillTemplate(root, assets, {
            jsonOptions: { duration: 0, enableTooltip: false },
        }) + `
        <style>
        body { margin: 0; padding: 0; }
        #mindmap { display: flex; justify-content: center; align-items: center; }
        </style>`;

        // Start timing
        const start = Date.now();

        // Generate the image
        const image = await nodeHtmlToImage({
            html,
            quality: quality,
            puppeteerArgs: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                defaultViewport: {
                    width: width,
                    height: height,
                    deviceScaleFactor: 1
                }
            }
        });

        console.log(`## Rendering took ${Date.now() - start}ms`);

        // Convert image to Base64 and return as Data URI
        const base64Image = image.toString('base64');
        const dataURI = `data:image/png;base64,${base64Image}`;

        // await writeFile("elon.png", image);

        return dataURI;

    } catch (error) {
        console.error("Error rendering markmap:", error);
        return '';
    }
}

module.exports = { renderMarkmap };