# GPT-Speller

GPT-Speller is a browser extension that helps you spell-check and grammar-check your text using the ChatGPT API. This extension is designed to work seamlessly in Chrome and Firefox, allowing users to easily verify and correct their text input on any webpage.

## Features

- **Floating Button**: Adds a floating "Check Grammar" button next to text fields with over a minimum number of characters.
- **Settings Page**: Provides a popup interface to configure the ChatGPT API key and the minimum text length required for the button to appear.
- **Content Script**: Uses a content script to inject functionality directly into web pages.
- **Cross-Browser Compatibility**: Works in both Chrome and Firefox, utilizing their respective storage and messaging APIs. Although it was tested only in Firefox.

## Installation

1. Clone this repository or download the ZIP file.
2. Open your browser's extension management page:
   - **Chrome**: `chrome://extensions/`
   - **Firefox**: `about:addons`
3. Enable "Developer mode" if required.
4. Click on "Load unpacked" or "Load Temporary Add-on" and select the directory containing this extension's files.

## Configuration

1. Click on the extension icon in your browser's toolbar to open the settings popup.
2. Enter your ChatGPT API key and set the minimum text length.
3. Click "Save" to store your settings.

## How It Works

### Manifest

The `manifest.json` file defines the structure and permissions required by the extension. It includes settings for the background script, content scripts, and the browser action popup.

### Content Script

The `content-script.js` file is injected into all web pages and handles the following tasks:
- **Floating Button**: Adds a floating button next to text fields that exceed the minimum text length.
- **Visibility Check**: Ensures the button is only displayed when the text field is visible.
- **Button Actions**: Triggers the grammar check using the ChatGPT API and displays the results in a floating div.

### Background Script

The `background.js` file listens for messages from the content script and handles the API requests to the ChatGPT API. It retrieves the API key from storage and processes the text provided by the content script.

### Popup

The `popup.html` and `popup.js` files provide a user interface for configuring the extension settings. Users can enter their API key and set the minimum text length required for the floating button to appear.

### Storage

Settings are stored using the `chrome.storage.sync` API for cross-device synchronization. This ensures that your settings are consistent across all instances of the browser where the extension is installed.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## License (LICENSE)

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.**

Additionally, you must include the following acknowledgment in any distribution of the Software:

> "This software includes code developed by [Ivan Roganov] (inquire@roganov.me)."

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.


---

This extension was developed by [Ivan Roganov] (inquire@roganov.me). Feel free to contact me for any questions or support.
