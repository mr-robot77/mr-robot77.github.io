---
layout: project
title: "Cryptocurrency Data Analysis with Machine Learning"
project_slug: cryptocurrency-machine-learning
description: "Applied machine learning techniques to analyze cryptocurrency data, including generating trading signals with EMA and clustering coins by behavior."
---

### What I built
- Engineered trading signals with exponential moving averages to flag bullish and bearish momentum
- Clustered cryptocurrencies based on historical behavior to surface families of similar assets
- Evaluated predictive models that forecast short-term movements using engineered features

### Approach
1. **Signal engineering:** produced EMA crossovers and rate-of-change measures as leading indicators.  
2. **Unsupervised learning:** applied K-Means to group coins, tuning cluster counts with silhouette scores.  
3. **Modeling:** trained baseline regressors/classifiers on engineered signals to score directional accuracy.

### Results
- Transparent rule-based signals that traders can audit
- Cluster groupings that simplify coverage of hundreds of coins into representative sets
- Modeling benchmarks that show which engineered signals offer the strongest predictive lift
