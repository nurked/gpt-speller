// const config = {
//   apiUrl: "https://api.openai.com/v1/chat/completions",
//   apiKey: "sk-proj-boobies646vzDOCngTyoulbkreallyhfthinkDvSO3hehehe",
// };
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchGrammarCheck") {
    chrome.storage.sync.get(["apiKey"], (items) => {
      const apiKey = items.apiKey;
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a grammar and spelling assistant. You are to look at the user input and provide changes in spelling. Do not change style or any words, just make sure that the grammar is okay. You are not to answer with anything but user's corrected text (do not provide any commentary or extra thoughts).`,
            },
            {
              role: "user",
              content: request.text,
            },
          ],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          sendResponse({ result: data.choices[0].message.content });
        })
        .catch((error) => {
          sendResponse({ error: error.toString() });
        });
    });

    return true; // Will respond asynchronously
  }
});
