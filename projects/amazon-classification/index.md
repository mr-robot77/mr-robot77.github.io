---
layout: project
title: "Amazon Products Image Classification & Customer Reviews Sentiment Analysis"
---

<div class="project-header" style="background: linear-gradient(135deg, #f64f59 0%, #c0392b 100%);">
  <span class="category-badge">Deep Learning</span>
  <h1>Amazon Products Image Classification & Customer Reviews Sentiment Analysis</h1>
  <p>Built and evaluated deep learning models for Amazon product image classification and performed NLP sentiment analysis on customer reviews.</p>
  <div class="project-meta">
    <div class="project-meta-item">
      <i class="fa fa-calendar"></i>
      <span>2022</span>
    </div>
    <div class="project-meta-item">
      <i class="fa fa-code"></i>
      <span>Python, TensorFlow, NLTK, scikit-learn</span>
    </div>
  </div>
</div>

<div class="project-content">

## Overview

This comprehensive deep learning project combines computer vision and natural language processing to analyze Amazon product data. The project features two main components: image classification using Convolutional Neural Networks (CNNs) and sentiment analysis of customer reviews using NLP techniques.

By integrating both visual and textual data analysis, this project provides a holistic view of product performance and customer satisfaction on the Amazon platform.

## Technologies Used

<div class="tech-stack">
  <span class="tech-tag">Python</span>
  <span class="tech-tag">TensorFlow</span>
  <span class="tech-tag">Keras</span>
  <span class="tech-tag">NLTK</span>
  <span class="tech-tag">scikit-learn</span>
  <span class="tech-tag">OpenCV</span>
</div>

## Key Features

<div class="key-features">
  <h3>Main Functionalities</h3>
  <ul>
    <li><strong>Image Classification:</strong> Convolutional Neural Networks for classifying Amazon product images into categories</li>
    <li><strong>Sentiment Analysis:</strong> NLP-based analysis of customer reviews using NLTK and machine learning</li>
    <li><strong>Word Cloud Visualization:</strong> Generated visual representations of reviews by star rating</li>
    <li><strong>Brand Analysis:</strong> Identified top brands and product categories from review data</li>
  </ul>
</div>

## Project Gallery

<div class="project-gallery">
  <img src="https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project3/main/images/P2/Q1/Word_Cloud_reviews_overall_rating_12.png" alt="Word Cloud Analysis of Customer Reviews">
  <img src="https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project3/main/images/P2/Q1/Top_10_brands.png" alt="Top 10 Brands Analysis">
</div>

## Methodology

### 1. Image Classification Pipeline

#### Data Collection & Preprocessing
- Gathered Amazon product images across multiple categories
- Resized and normalized images for model input
- Applied data augmentation for better generalization

#### Model Architecture
- Designed CNN architecture with multiple convolutional layers
- Implemented dropout and batch normalization
- Fine-tuned hyperparameters for optimal performance

#### Training & Evaluation
- Split data into training, validation, and test sets
- Used categorical cross-entropy loss function
- Evaluated using accuracy, precision, recall, and F1-score

### 2. Sentiment Analysis Pipeline

#### Text Preprocessing
- Cleaned and tokenized customer review text
- Removed stopwords and performed lemmatization
- Extracted features using TF-IDF vectorization

#### Sentiment Classification
- Trained multiple classifiers (Naive Bayes, SVM, Random Forest)
- Performed sentiment polarity analysis
- Correlated sentiment with star ratings

#### Visualization & Insights
- Generated word clouds for each rating category
- Identified most frequent positive and negative terms
- Analyzed brand sentiment across product categories

## Results & Insights

<div class="results-section">
  <h3>Key Findings</h3>

  <h4>Image Classification</h4>
  <ul>
    <li>Achieved 85%+ accuracy in product category classification</li>
    <li>Successfully identified patterns in product images across categories</li>
    <li>Model performed well on diverse product types and backgrounds</li>
  </ul>

  <h4>Sentiment Analysis</h4>
  <ul>
    <li>Strong correlation between sentiment scores and star ratings</li>
    <li>Identified key factors influencing positive vs negative reviews</li>
    <li>Word cloud analysis revealed common themes by rating level</li>
    <li>Top brands showed consistent sentiment patterns across products</li>
  </ul>
</div>

## Deep Learning Models

### Convolutional Neural Network (CNN)
- **Architecture:** 3 convolutional blocks with max pooling
- **Input Size:** 224x224x3 RGB images
- **Output:** Product category classification
- **Performance:** 85%+ accuracy on test set

### Sentiment Analysis Models
- **Naive Bayes:** Baseline model for text classification
- **SVM:** Higher accuracy with RBF kernel
- **Random Forest:** Ensemble approach for robust predictions
- **Performance:** 80-85% accuracy across models

## Technical Highlights

### Computer Vision
- Transfer learning with pre-trained models (VGG16, ResNet)
- Data augmentation techniques (rotation, flip, zoom)
- Batch normalization for stable training
- Early stopping to prevent overfitting

### Natural Language Processing
- TF-IDF feature extraction
- N-gram analysis (unigrams, bigrams, trigrams)
- Sentiment polarity scoring
- Named entity recognition for brand extraction

## Impact & Applications

This dual-approach project demonstrates practical applications in:
- **E-commerce Platforms:** Automated product categorization and review analysis
- **Customer Insights:** Understanding customer satisfaction and pain points
- **Brand Monitoring:** Tracking brand reputation through sentiment analysis
- **Product Recommendations:** Using image and text features for better recommendations

<div class="project-links">
  <a href="https://github.com/mr-robot77/Quera_G11-Project3" class="project-link" target="_blank" rel="noopener noreferrer">
    <i class="fab fa-github"></i> View on GitHub
  </a>
  <a href="/" class="project-link secondary">
    <i class="fa fa-arrow-left"></i> Back to Portfolio
  </a>
</div>

</div>
