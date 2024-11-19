// Render MarkMap API

var express = require('express');
var {renderMarkmap} = require("../mindmap/render");
var router = express.Router();

/**
 * POST /render
 *
 * Request body:
 * {
 *   "mk": "string", // Markdown content
 *   "ts": "integer" // Timestamp
 * }
 *
 * Response:
 * {
 *   "status": 0, // Status code
 *   "image": 4,  // Image ID
 *   "data": {    // Original request body
 *     "mk": "string",
 *     "ts": "integer"
 *   }
 * }
 */
router.post('/', async function (req, res, next) {
    try {

        let { height = 1600, width = 2560, quality = 90, markdown } = req.body;
        let mk ="markmap:\n" +
            "cotor: “#2980b9”\n" +
            "maxwidth: 300\n" +
            "initialExpandLevel: 1\n" +
            "\n" +
            "# elon musk\n" +
            "# testa\n" +
            "# spacex\n" +
            "# neuralink"
        // if markdown isNone, use mk
        if (!markdown) {
            markdown = mk
        }
        const base64Image = await renderMarkmap(markdown, height, width, quality);

        res.send({status: 0, message: "OK", data: {image: base64Image}});
    } catch (error) {
        next(error);
    }
});

module.exports = router;

