import cheerio from "cheerio";

function parseFAQs(html) {
  const $ = cheerio.load(html);
  const faqsArray = [];
  let currentFAQ = {};

  // Select all <question> and <answer> elements within the <body>
  $("body")
    .find("question, answer")
    .each((index, element) => {
      // If it's a question, create a new FAQ object
      if (element.tagName === "question") {
        currentFAQ = { question: $(element).text().trim() };
      }
      // If it's an answer, add it to the current FAQ object and push to the array
      else if (element.tagName === "answer") {
        currentFAQ.answer = $(element).text().trim();
        faqsArray.push(currentFAQ);
      }
    });

  return faqsArray;
}

export default parseFAQs;
