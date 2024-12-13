const database = [
  {
    label: "Bitot_Spot_of_Vitamin_A_Deficiency",
    name: "Bitot Spot of Vitamin A Deficiency",
    threshold: 0.5,
    recommendation: [
      "Increase intake of Vitamin A-rich foods (e.g., carrots, sweet potatoes, spinach).",
      "Consult a healthcare provider for potential Vitamin A supplementation.",
      "Maintain proper hygiene to avoid secondary infections.",
    ],
  },
  {
    label: "Cataracts",
    name: "Cataracts",
    threshold: 0.5,
    recommendation: [
      "Schedule an eye exam with an ophthalmologist for evaluation.",
      "Protect eyes from UV exposure by wearing sunglasses.",
      "Consider surgery if vision impairment significantly affects daily life.",
    ],
  },
  {
    label: "Cellulitis_eye",
    name: "Cellulitis eye",
    threshold: 0.5,
    recommendation: [
      "Seek immediate medical attention to prevent complications.",
      "Follow prescribed antibiotic treatment as directed.",
      "Avoid touching or rubbing the affected area to prevent worsening.",
    ],
  },
  {
    label: "Conjunctivitis",
    name: "Conjunctivitis",
    threshold: 0.5,
    recommendation: [
      "Use lubricating eye drops to alleviate discomfort.",
      "Avoid sharing personal items like towels to prevent spread.",
      "Consult a doctor for proper diagnosis and treatment, especially if bacterial.",
    ],
  },
  {
    label: "Corneal_Ulcer",
    name: "Corneal Ulcer",
    threshold: 0.5,
    recommendation: [
      "Consult an ophthalmologist immediately for evaluation and treatment.",
      "Avoid wearing contact lenses until cleared by a doctor.",
      "Use prescribed antibiotic or antifungal eye drops as directed.",
    ],
  },
  {
    label: "Ectropion",
    name: "Ectropion",
    threshold: 0.5,
    recommendation: [
      "Apply lubricating eye drops or ointments to keep eyes moist.",
      "Consider surgery for severe cases as recommended by a specialist.",
      "Protect eyes from dust and wind using protective eyewear.",
    ],
  },
  {
    label: "Normal_Eye",
    name: "Normal Eye",
    threshold: 0.5,
    recommendation: [
      "Maintain a balanced diet rich in eye-healthy nutrients.",
      "Protect eyes from excessive screen time with regular breaks.",
      "Schedule routine eye exams to monitor eye health.",
    ],
  },
];

module.exports = {
  database,
};
