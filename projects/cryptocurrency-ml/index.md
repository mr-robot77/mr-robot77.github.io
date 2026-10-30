---
layout: project
title: "Cryptocurrency Data Analysis with Machine Learning"
category: "Machine Learning"
date: "2022"
tools: "Python, scikit-learn, Pandas, NumPy, Matplotlib"
github_url: "https://github.com/mr-robot77/Quera_G11-Project2"
summary: "EMA trading signals, K-means groups of coins, and short-term price models."
---

Historical coin prices were scaled, and technical indicators were added as features.

## Trading signals

Exponential moving averages, at more than one window, produced buy and sell points from crossovers. Those rules were checked against the past prices. On that sample, the signals lined up with stretches the project treated as profitable.

![Trading signals from an exponential moving average](https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project2/main/images/prediction/Generating%20trading%20signals%20with%20ema.png){: loading="lazy" }

## Clustering

K-means grouped coins by price volatility, trading volume, market cap, and price trend. The fit used 3 to 5 groups. Coins in a group share a similar pattern of swings and growth.

![K-means clusters of cryptocurrencies](https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project2/main/images/clustering_k-means/k-means9.png){: loading="lazy" }

## Price models

Linear regression, random forest, and an LSTM were trained on the short horizon, 1 to 7 days. Features were cut down, and the split was cross-validated. Scores were RMSE, MAE, and R². Volume, price, and the sentiment series in the data move together in places.
