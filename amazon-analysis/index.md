---
layout: project
title: "Amazon Products Image Classification & Customer Reviews Sentiment Analysis"
category: "Deep Learning"
category_color: "#e74c3c"
date: "2022"
description: "Built and evaluated deep learning models for Amazon product image classification and performed NLP sentiment analysis on customer reviews."
technologies: "Python, TensorFlow, NLTK, scikit-learn"
gradient: "linear-gradient(135deg, #f64f59 0%, #c0392b 100%)"
image: "https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project3/main/images/P2/Q1/Word_Cloud_reviews_overall_rating_12.png"
images:
  - "https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project3/main/images/P2/Q1/Word_Cloud_reviews_overall_rating_12.png"
  - "https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project3/main/images/P2/Q1/Top_10_brands.png"
url_github: "https://github.com/mr-robot77/Quera_G11-Project3"
details:
  - "Classified Amazon product images using convolutional neural networks"
  - "Performed sentiment analysis on customer reviews using NLTK"
  - "Generated Word Cloud visualizations of reviews by star rating"
  - "Identified top brands and product categories from review data"
---

## Overview

This project combines **computer vision** and **natural language processing** to analyze Amazon product data. It includes classifying product images using CNNs and mining customer review text for sentiment and brand insights.

## Methodology

### Image Classification
- Built a **Convolutional Neural Network (CNN)** using TensorFlow/Keras to classify Amazon product images by category.
- Applied data augmentation techniques to improve generalization.
- Evaluated using accuracy and confusion matrix.

### Sentiment Analysis
- Preprocessed review text: tokenization, stop-word removal, and stemming using **NLTK**.
- Trained a Naive Bayes classifier to predict review sentiment (positive / negative / neutral).
- Generated **Word Clouds** segmented by star rating to highlight common themes per sentiment level.

## Key Findings

- The CNN model achieved strong classification accuracy across product categories.
- Word Cloud analysis revealed that 5-star reviews consistently feature words like *great*, *perfect*, and *love*, while 1-star reviews highlight *return*, *broken*, and *disappointed*.
- A small set of top brands (e.g. Apple, Samsung) account for the majority of high-volume reviews.
