"use client";

const questions = [
  {
    id: 1,
    question: `What is OutfitOwl, and how can it help me?`,
    answer: [
      `OutfitOwl is your new personal stylist, ready to take the stress out
      of picking the perfect outfit for any occasion or weather condition. It's like
      having a fashion guru in your pocket, combining style and practicality in one
      seamless package. Say goodbye to staring blankly into your closet, wondering
      what to wear!`,
    ],
  },
  {
    id: 2,
    question: `Why do I need OutfitOwl in my life?`,
    answer: [
      `Let's face it, dressing for the weather can be a real challenge. One
      day it's sunny and warm, the next it's raining cats and dogs.
      OutfitOwl understands your struggle and is here to make your life
      easier. No more wasting time agonizing over what to wear or checking
      the weather app every minute.`,
    ],
  },
  {
    id: 3,
    question: `How does OutfitOwl work its magic?`,
    answer: [
      `OutfitOwl uses a combination of your style preferences, location, and
      the occasion to recommend the perfect outfit.`,
      `Here's how it works:`,
    ],
    timeline: [
      {
        id: 1,
        title: `Share Your Style`,
        description: `First, you'll let OutfitOwl know your style preferences for
          different clothing categories. It's like taking a fun fashion quiz!`,
      },
      {
        id: 2,
        title: `Location And Occasion`,
        description: `Next, you'll provide your location (or the destination you're
          visiting) and the occasion you're dressing for, like a beach party or a job
          interview.`,
      },
      {
        id: 3,
        title: `Weather Check`,
        description: `OutfitOwl then checks the weather forecast for your area to
          ensure the outfit to be generated is suitable for the conditions.`,
      },
      {
        id: 4,
        title: `AI Fashion Advice`,
        description: `OutfitOwl even consults an AI assistant, ChatGPT, to get expert
          advice on the perfect ensemble for the occasion and weather.`,
      },
      {
        id: 5,
        title: `Outfit Recommendation`,
        description: `Using your style preferences and the weather data, OutfitOwl
          creates a personalized outfit recommendation that looks great and keeps you
          comfortable.`,
      },
    ],
  },
  {
    id: 4,
    question: `What's the secret behind OutfitOwl's recommendations?`,
    answer: [
      `OutfitOwl uses an advanced algorithm called Visual Bayesian Personalized
      Ranking (VBPR) to combine visual understanding with personalized recommendations.`,
      `This means it can analyze images of clothing and match them to your style preferences,
      creating outfits tailored just for you! VBPR is an extension of the Bayesian
      Personalized Ranking (BPR) algorithm, which is a popular approach for personalized
      recommendation systems.`,
    ],
    details: [
      {
        id: 1,
        title: `BPR`,
        description: [
          `BPR is a pairwise ranking model that aims to rank the items that a 
          user prefers higher than the ones they don't prefer. It works by analyzing the
          user's past interactions (e.g., purchases, ratings, clicks) and learns to rank 
          the items accordingly.`,
          `In the context of outfit recommendations, BPR would analyze 
          the clothing items you've previously liked or disliked and try to rank the outfits 
          you're more likely to prefer higher than the ones you might not like.`,
          `However, BPR doesn't take into account the visual aspects of the items being 
          recommended. This is where VBPR comes into play.`,
        ],
      },
      {
        id: 2,
        title: "VBPR",
        description: [
          `VBPR incorporates visual features extracted from images of the clothing
          items into the ranking model. It uses deep learning techniques to analyze the visual
          characteristics of the clothing items, such as color, pattern, style, and texture.
          By combining the visual features with your style preferences, VBPR can more accurately 
          rank and recommend outfits that not only match your tastes but also have the desired 
          visual aesthetics.`,
          `For example, if you tend to prefer floral patterns and bright colors, VBPR can 
          identify those visual characteristics in clothing images and rank outfits with similar 
          patterns and colors higher in your personalized recommendations.`,
          `In essence, VBPR combines the power of personalized ranking algorithms with computer 
          vision techniques, resulting in a more sophisticated and visually-aware recommendation 
          system tailored to your unique fashion preferences.`,
        ],
      },
    ],
  },
];

export default function Report() {
  return (
    <div className="flex flex-col justify-center min-h-screen break-normal">
      {/* Header */}
      <div className="w-1/2 py-12 mx-auto space-y-4">
        <h1 className="text-4xl font-semibold text-center">
          OutfitOwl: Your Personal Stylist
        </h1>
        <p className="text-center">
          Say goodbye to those wardrobe woes! OutfitOwl is here to save the day
          (and your outfits).
        </p>
      </div>

      {/* Q&A */}
      {questions.map((ques) => {
        return (
          <div key={ques.id} className="w-1/2 py-12 mx-auto space-y-0">
            <h2 className="text-xl font-semibold">{ques?.question}</h2>
            {ques.answer &&
              ques.answer.map((line, index) => {
                return (
                  <p key={index} className="pb-2">
                    {line}
                  </p>
                );
              })}
            {ques.timeline && (
              <ol className="relative border-s border-gray-600 dark:border-gray-700">
                {ques.timeline.map((step) => {
                  return (
                    <li key={step.id} className="ms-4 pt-5 pb-5">
                      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-black dark:border-gray-900 dark:bg-gray-700"></div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        {step.description}
                      </p>
                    </li>
                  );
                })}
              </ol>
            )}
            {ques.details && (
              <ul className="list-disc pl-10">
                {ques.details.map((item) => {
                  return (
                    <li key={item.id} className="pt-5">
                      <h1 className="text-md font-semibold">{item.title}</h1>
                      {item.description &&
                        item.description.map((line, index) => {
                          return (
                            <p key={index} className="pb-2">
                              {line}
                            </p>
                          );
                        })}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
