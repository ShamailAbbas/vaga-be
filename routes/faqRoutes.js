import Faq from "../models/FaqModel.js";
import generateFaq from "../utils/generateFaq.js";
import parseFAQs from "../utils/parseFaq.js";
import express from "express";
import fs from "fs";
const router = express.Router();
// Get all faq
router.get("/", async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/generate", async (req, res) => {
  const failed = [];

  try {
    const rawData = fs.readFileSync("data.json");
    const citiesData = JSON.parse(rawData);

    for (const cityData of citiesData) {
      try {
        if (cityData.index > 200) {
          break; // Use break to exit the loop
        }

        const faqExists = await Faq.find({
          state: cityData.state_name,
          city: cityData.city,
        });

        if (!faqExists.length) {
          const response = await generateFaq(
            cityData.city,
            cityData.state_name
          );
          let faqs;

          if (response?.choices) {
            faqs = parseFAQs(response.choices[0].message.content);
          }

          if (faqs && faqs.length > 0) {
            for (const faqdata of faqs) {
              try {
                const faq = new Faq({ ...faqdata, city: cityData.city });
                await faq.save();
              } catch (error) {
                failed.push({
                  city: cityData.city,
                  state_name: cityData.state_name,
                });
                console.error(`Error saving faqs for city `, cityData.city);
              }
            }
          }
        }
      } catch (error) {
        failed.push({ city: cityData.city, state_name: cityData.state_name });
        console.error(`Error saving city ${cityData.city}: ${error.message}`);
      }
    }

    res.status(201).json({ failed });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a  faq by city
router.get("/:city", async (req, res) => {
  try {
    const faq = await Faq.find({
      state: req.params.state,
      city: req.params.city,
    });
    if (!faq) {
      return res.status(404).json({ message: "Faq not found" });
    }
    res.json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:state/:city", async (req, res) => {
  try {
    const response = await generateFaq(req.params.city, req.params.state);
    let faqs;
    if (response?.choices) {
      faqs = parseFAQs(response.choices[0].message.content);
    }

    if (faqs && faqs?.length > 0) {
      faqs.forEach(async (faqdata) => {
        try {
          const faq = new Faq({ ...faqdata, city: req.params.city });
          await faq.save();
        } catch (error) {
          console.error(`Error generating faqs `);
        }
      });

      return res.status(201).json(faqs);
    }
    res.status(400).json({ message: error.message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
