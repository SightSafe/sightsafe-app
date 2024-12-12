const predictEyeDisease = async (imagePath) => {
    // Simulated Model Logic (Replace with actual model integration)
    return {
      id: '942yU_BabbkfIXdJ',
      result: 'Vascular lesion',
      confidenceScore: 99.67641830444336,
      isAboveThreshold: true,
      recommendation: 'Message from doctor recommendation',
      createdAt: new Date().toISOString(),
    };
  };
  
  module.exports = { predictEyeDisease };
  