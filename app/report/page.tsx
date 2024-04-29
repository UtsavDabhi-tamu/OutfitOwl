"use client";

import Image from "next/image";

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
    question: `OutfitOwl's Secret Sauce?`,
    answer: [
      `OutfitOwl employs a cutting-edge, multi-pronged approach to deliver personalized 
      and weather-appropriate outfit recommendations. At the core of our solution lies 
      a powerful combination of advanced algorithms, deep learning techniques, and seamless 
      integration with external data sources.`,
    ],
    details: [
      {
        id: 1,
        title: `Visual Bayesian Personalized Ranking (VBPR)`,
        description: [
          `We harness the power of VBPR, a state-of-the-art algorithm that amalgamates 
          visual understanding with personalized ranking. This sophisticated model analyzes 
          the visual features of clothing items, such as color, pattern, and style, and 
          integrates them with users' style preferences to generate highly tailored outfit 
          recommendations.`,
        ],
      },
      {
        id: 2,
        title: `Deep Learning for Visual Feature Extraction`,
        description: [
          `To enable VBPR's visual comprehension capabilities, we employ a deep learning model 
          based on the VGG19 convolutional neural network architecture. This model is trained 
          on the DeepFashion dataset, a comprehensive collection of fashion images, allowing 
          it to accurately extract and comprehend visual features from clothing items.`,
        ],
      },
      {
        id: 3,
        title: `Preference Dataset Development`,
        description: [
          `We create a dedicated preference dataset by leveraging user input on their style 
          preferences across various clothing categories. This dataset serves as a crucial 
          training resource for our VBPR model, enabling it to learn and adapt to individual 
          fashion tastes and preferences.`,
        ],
      },
      {
        id: 4,
        title: `Weather Data Integration`,
        description: [
          `OutfitOwl seamlessly integrates with reliable weather APIs to fetch real-time 
          weather data for users' locations. This information is then passed to our trusty 
          AI assistant, ChatGPT, which provides expert guidance on suitable apparel options 
          based on the weather conditions and occasion.`,
        ],
      },
      {
        id: 5,
        title: `Ensemble Recommendation`,
        description: [
          `The visual features extracted by our deep learning model, user preferences, and 
          ChatGPT's weather-based recommendations are seamlessly combined by the VBPR algorithm. 
          This ensemble approach ensures that the final outfit suggestions not only align with 
          users' styles but also account for the practical considerations of weather and occasion.`,
        ],
      },
    ],
    img: `/images/flowchart.png`,
  },
  {
    id: 5,
    question: `How OutfitOwl stands out!`,
    answer: [
      `Whereas existing fashion recommendation systems primarily focus on either visual similarity 
      or collaborative filtering techniques, OutfitOwl takes an innovative multi-modal approach by 
      seamlessly integrating visual analysis, personal style preferences, and contextual weather 
      data.`,
    ],
    details: [
      {
        id: 1,
        title: ``,
        description: [
          `Vasileva et el proposed a method of learning fashion by developing pairwise projections for each fashion choice within existing outfits. Compatibility scores were computed for pairs of fashion items to determine which types of clothing would go well together. This would determine which types fashion items would work well in a full outfit.`,
        ],
      },
      {
        id: 2,
        title: ``,
        description: [
          `Thao et al. developed a personalized fashion recommendation system that combines visual 
          features from product images with textual information (e.g., descriptions, reviews). They 
          used an attention mechanism to adaptively focus on relevant visual and textual features for 
          each user's preferences.`,
        ],
      },
      {
        id: 3,
        title: ``,
        description: [
          `Kang et al. proposed a fashion recommendation system that learns a joint visual-semantic 
          embedding space. This allows the system to capture both visual and semantic similarities between 
          clothing items, and recommend items based on their proximity in this embedding space.`,
        ],
      },
      {
        id: 4,
        title: ``,
        description: [
          `Zhang et al. introduced a visual-aware collaborative filtering (VACF) approach for fashion 
          recommendation. They used CNNs to extract visual features from clothing images and combined them 
          with user-item interaction data in a collaborative filtering framework.`,
        ],
      },
      {
        id: 5,
        title: ``,
        description: [
          `Tan et al. proposed a deep visual-semantics hashing approach that learns compact binary 
          codes from both visual and textual data for efficient fashion recommendation. This enables fast 
          retrieval of visually and semantically similar fashion items.`,
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

      <div className="w-3/4 bg-white mx-auto px-8 rounded-lg mb-8">
        {/* Q&A */}
        {questions.map((ques) => {
          return (
            <div key={ques.id} className="py-12 mx-auto space-y-0">
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
                <ol className="list-decimal pl-5">
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
                </ol>
              )}
              {ques.img && (
                <Image
                  src={ques.img}
                  alt={`System flowchart`}
                  width={800}
                  height={300}
                  className="p-5"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
