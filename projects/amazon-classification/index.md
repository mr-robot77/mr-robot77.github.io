---
layout: project
title: "Amazon Products Image Classification & Customer Reviews Sentiment Analysis"
category: "Deep Learning"
date: "2022"
tools: "Python, TensorFlow, Keras, NLTK, scikit-learn, OpenCV"
github_url: "https://github.com/mr-robot77/Quera_G11-Project3"
summary: "Convolutional networks on Amazon product photos, and sentiment on the customer reviews."
---

Two pieces: classify product photos, and score the text of reviews.

## Photos

Images from several categories were resized and normalized, with extra augmented copies (rotation, flip, zoom). The network has 3 convolutional blocks with max pooling, dropout, and batch normalization. Input is 224×224×3. Training used categorical cross-entropy, a train/validation/test split, and early stopping. Transfer learning used VGG16 and ResNet. Reported test accuracy is 85% or better. Precision, recall, and F1 were the other scores.

## Reviews

Review text was tokenized, stripped of stopwords, and lemmatized. Features were TF-IDF and n-grams (one, two, and three words). Classifiers were naive Bayes, an SVM with an RBF kernel, and a random forest. Reported accuracy across those models is 80 to 85%. Sentiment was compared with the star rating. Word clouds were built per rating, and brand names were pulled out of the text.

![Word cloud of Amazon reviews rated 1 and 2 stars](https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project3/main/images/P2/Q1/Word_Cloud_reviews_overall_rating_12.png){: loading="lazy" }

![Top 10 brands from the Amazon review data](https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project3/main/images/P2/Q1/Top_10_brands.png){: loading="lazy" }
