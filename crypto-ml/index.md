---
layout: project
title: "Cryptocurrency Data Analysis with Machine Learning"
category: "Machine Learning"
category_color: "#743ca5"
date: "2022"
description: "Applied machine learning techniques to analyze cryptocurrency data, including generating trading signals with EMA and clustering coins by behavior."
technologies: "Python, scikit-learn, Pandas, NumPy"
gradient: "linear-gradient(135deg, #4e65fd 0%, #31012c 100%)"
image: "https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project2/main/images/prediction/Generating%20trading%20signals%20with%20ema.png"
images:
  - "https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project2/main/images/prediction/Generating%20trading%20signals%20with%20ema.png"
  - "https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project2/main/images/clustering_k-means/k-means9.png"
url_github: "https://github.com/mr-robot77/Quera_G11-Project2"
details:
  - "Generated trading signals using Exponential Moving Average (EMA)"
  - "Applied K-Means clustering to group cryptocurrencies by behavior"
  - "Built predictive models for price forecasting"
  - "Analyzed trading patterns and market behavior over time"
---

## Overview

This project applies **machine learning** techniques to cryptocurrency market data to generate actionable trading insights and group coins by behavioral patterns. It was developed as part of a data science bootcamp group project.

## Methodology

- **Trading Signals**: Used Exponential Moving Average (EMA) crossover strategy to generate buy/sell signals for several cryptocurrencies.
- **Clustering**: Applied K-Means clustering to identify groups of coins that exhibit similar price behavior, aiding portfolio diversification.
- **Predictive Modeling**: Trained regression models to forecast short-term price movements, evaluated using RMSE and MAE.

## Key Findings

- EMA crossover signals achieved a positive return on test data for major coins like BTC and ETH.
- K-Means clustering revealed 3 distinct behavioral groups: high-volatility speculative coins, mid-tier altcoins, and stablecoins.
- Feature engineering (lag features, rolling statistics) significantly improved model accuracy.
