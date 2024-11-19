const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Function to read the article content from a file
const readArticle = filePath => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				reject(`Error reading the file: ${err}`);
			} else {
				resolve(data);
			}
		});
	});
};

// Function to send the article content to OpenAI API
const generateHTML = async articleContent => {
	const prompt = `
The following is a plain text article. Convert it into structured HTML code. 
- Use appropriate HTML tags (headings, paragraphs, lists if applicable).
- Identify places for images and insert <img src="image_placeholder.jpg" alt="exact prompt for the image"> tags.
- Provide captions for the images using appropriate tags.
- Do not include CSS or JavaScript.
- Only include the content for the <body> section.

Article:
${articleContent}
    `;

	try {
		const response = await axios.post(
			"https://api.openai.com/v1/chat/completions",
			{
				model: "gpt-3.5-turbo", // Use cheaper GPT model
				messages: [
					{
						role: "system",
						content: "You are a helpful assistant that generates HTML code.",
					},
					{ role: "user", content: prompt },
				],
				max_tokens: 1500,
				temperature: 0.7,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${OPENAI_API_KEY}`,
				},
			}
		);

		return response.data.choices[0].message.content.trim();
	} catch (error) {
		console.error("Error connecting to OpenAI API:", error.message);
		throw error;
	}
};

// Function to save content to a file
const saveToFile = (filePath, content) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, content, "utf8", err => {
			if (err) {
				reject(`Error writing to file: ${err}`);
			} else {
				resolve(`File saved successfully to ${filePath}`);
			}
		});
	});
};

// Function to create template.html
const createTemplate = () => {
	const templateContent = `
<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article Preview Template</title>
    <style>
        body {
            font-family: 'Lato', sans-serif;
            background-color: #4b4b4b;
            color: #333;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            /* letter-spacing: normal; */
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            /* font-family: 'univia-pro', sans-serif; 😉 */
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
            color: #222;
        }

        p {
            margin: 10px 0;
        }

        img {
            display: block;
            max-width: 100%;
            height: auto;
            margin: 15px auto;
        }

        figcaption {
            font-size: 0.9em;
            color: #555;
            text-align: center;
            margin-top: 5px;
        }

        /* Section and Layout */
        .placeholder {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .placeholder p {
            font-size: 1.1em;
            line-height: 1.8;
        }

        .placeholder img {
            margin-top: 20px;
            margin-bottom: 5px;
        }

        /* Links */
        a {
            color: #007bff;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            body {
                font-size: 90%;
            }

            .content {
                padding: 15px;
            }
        }
    </style>
<body>
    <div class="container">
        <div class="placeholder">
            <h2>Paste your article content here</h2>
            <p>This is a preview template. Add your article code within the body tag.</p>
        </div>
    </div>
</body>
</html>
    `;

	return saveToFile("./template.html", templateContent);
};

// Function to create podglad.html
const createPodglad = () => {
	const templatePath = "./template.html";
	const articlePath = "./article.html";
	const outputPath = "./podglad.html";

	return new Promise((resolve, reject) => {
		// Read the template
		fs.readFile(templatePath, "utf8", (err, templateContent) => {
			if (err) {
				reject(`Error reading template.html: ${err}`);
				return;
			}

			// Read the article content
			fs.readFile(articlePath, "utf8", (err, articleContent) => {
				if (err) {
					reject(`Error reading article.html: ${err}`);
					return;
				}

				// Embed the article content into the template
				const finalContent = templateContent.replace(
					'<div class="placeholder">.*?</div>',
					`<div>${articleContent}</div>`
				);

				// Write to podglad.html
				fs.writeFile(outputPath, finalContent, "utf8", err => {
					if (err) {
						reject(`Error writing podglad.html: ${err}`);
					} else {
						resolve("podglad.html generated successfully");
					}
				});
			});
		});
	});
};

// Main function to execute the entire process
const main = async () => {
	const articleFilePath = "./article.txt";
	const articleOutputPath = "./article.html";

	try {
		console.log("Reading article.txt...");
		const articleContent = await readArticle(articleFilePath);

		console.log("Generating HTML with OpenAI...");
		const generatedHTML = await generateHTML(articleContent);
		await saveToFile(articleOutputPath, generatedHTML);
		console.log("article.html generated successfully.");

		console.log("Creating template.html...");
		await createTemplate();
		console.log("template.html generated successfully.");

		console.log("Creating podglad.html...");
		await createPodglad();
		console.log("podglad.html generated successfully.");
	} catch (error) {
		console.error("Error:", error);
	}
};

main();
