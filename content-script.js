// Config object to store all IDs, URLs, and API keys
const config = {
  minTextLength: 100,
  floatingButtonId: "floating-button",
  resultDivId: "result-div",
};

// Utility function to generate a hash code from a string (for IDs)
String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const createdButtons = new Set();

// Function to create a floating button next to a text field
function createFloatingButton(textField) {
  const buttonId = `button-${textField.id || textField.name || textField.toString().hashCode()}`;
  if (createdButtons.has(buttonId)) return; // Button already created

  const button = document.createElement("a");
  button.id = buttonId;
  button.textContent = "🖊️";
  button.style.position = "relative";
  button.style.left = `0px`;
  button.style.top = `0px`;
  button.style.textDecoration = "none";
  button.href = "#";
  button.addEventListener("click", (event) => {
    event.preventDefault();
    triggerApiQuery(textField);
  });

  // Insert button right after the textarea
  textField.parentNode.insertBefore(button, textField.nextSibling);

  createdButtons.add(buttonId);
}

// Function to trigger API query
async function triggerApiQuery(textField) {
  const text = textField.value;
  chrome.runtime.sendMessage(
    {
      action: "fetchGrammarCheck",
      text: text,
    },
    (response) => {
      if (response && response.result) {
        showResultDiv(textField, response.result);
      } else {
        console.error("Error fetching grammar check:", response.error);
      }
    },
  );
}

// Function to show result div with Apply and Cancel buttons
function showResultDiv(textField, resultText) {
  const resultDiv = document.createElement("div");
  resultDiv.id = config.resultDivId;
  resultDiv.style.position = "relative";
  resultDiv.style.left = `${textField.offsetLeft + textField.offsetWidth + 30}px`;
  resultDiv.style.padding = "1px";

  const resultTextarea = document.createElement("textarea");
  resultTextarea.value = resultText;
  resultDiv.appendChild(resultTextarea);

  const applyButton = document.createElement("a");
  applyButton.textContent = "✅";
  applyButton.href = "#";
  applyButton.style.position = "relative";
  applyButton.style.top = "-25px";
  applyButton.style.right = "-2px";
  applyButton.style.textDecoration = "none";

  applyButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Applying value:", resultTextarea.value); // Log the value
    textField.value = resultTextarea.value;
    console.log("Updated textField value:", textField.value); // Log updated value

    // Manually trigger input events to ensure the update is recognized
    textField.dispatchEvent(new Event("change", { bubbles: true }));
    textField.dispatchEvent(new Event("input", { bubbles: true }));
    resultDiv.parentNode.removeChild(resultDiv);
  });
  resultDiv.appendChild(applyButton);

  const cancelButton = document.createElement("a");
  cancelButton.textContent = "❎";
  cancelButton.href = "#";
  cancelButton.style.position = "relative";
  cancelButton.style.top = "-25px";
  cancelButton.style.right = "-4px";
  cancelButton.style.textDecoration = "none";
  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    resultDiv.parentNode.removeChild(resultDiv);
  });
  resultDiv.appendChild(cancelButton);

  textField.parentNode.insertBefore(resultDiv, textField.nextSibling);
  // document.body.appendChild(resultDiv);
}

// Function to check if the element is visible
function isVisible(elem) {
  const rect = elem.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to add floating buttons to all visible text fields with over 100 characters
function addFloatingButtons() {
  chrome.storage.sync.get(["minTextLength"], (items) => {
    const minTextLength = items.minTextLength || 100;
    const textFields = document.querySelectorAll(
      "textarea, input[type='text']",
    );
    textFields.forEach((textField) => {
      const buttonId = `button-${textField.id || textField.name || textField.hashCode()}`;
      if (textField.value.length > minTextLength && isVisible(textField)) {
        if (!createdButtons.has(buttonId)) {
          createFloatingButton(textField);
        }
      } else if (createdButtons.has(buttonId)) {
        // Remove button if it's no longer needed
        const button = document.getElementById(buttonId);
        if (button) button.remove();
        createdButtons.delete(buttonId);
      }
    });
  });
}

// Initialize the extension for dynamic content (Gmail, ProtonMail)
document.addEventListener("DOMContentLoaded", addFloatingButtons);
document.addEventListener("scroll", addFloatingButtons);
document.addEventListener("input", addFloatingButtons);
