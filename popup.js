document.addEventListener("DOMContentLoaded", async () => {
  const apiKeyInput = document.getElementById("apiKey");
  const minTextLengthInput = document.getElementById("minTextLength");
  const saveButton = document.getElementById("save");

  // Load settings
  try {
    const items = await browser.storage.sync.get(["apiKey", "minTextLength"]);
    console.log({ items });
    apiKeyInput.value = items.apiKey || "";
    minTextLengthInput.value = items.minTextLength || 100;
  } catch (error) {
    console.error("Error loading settings:", error);
  }

  // Save settings
  saveButton.addEventListener("click", async () => {
    const apiKey = apiKeyInput.value;
    const minTextLength = parseInt(minTextLengthInput.value);

    try {
      await browser.storage.sync.set({ apiKey, minTextLength });
      console.log("Settings saved");
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  });
});
