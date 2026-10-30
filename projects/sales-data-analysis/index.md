---
layout: project
title: "Sales Data Analysis"
category: "Data Science"
date: "2021"
tools: "Python, Pandas, Matplotlib, Geopandas, Seaborn, NumPy"
github_url: "https://github.com/mr-robot77/Sales-Data-Analysis"
summary: "Sales by region and by time, plus the products that brought in the most revenue."
---

Transaction rows from several regions were joined with product and price fields and with geographic data. Missing values and duplicates were removed, and dates and categories were put on one format.

## What turned up

Sales peak in Q4. Volume also depends on the day of the week. Year-over-year growth in the series averages 15%.

The West Coast and the Northeast have the highest volume. Urban areas account for 70% of revenue. Some regions are thin on sales and still look open to growth. Product mix differs by region.

The top 20% of products account for 80% of revenue. Technology and electronics have the highest margins. Seasonal products follow a repeating demand pattern. Bundles raised the average transaction value by 25%.

![Map of sales by region](https://raw.githubusercontent.com/mr-robot77/Sales-Data-Analysis/main/images/Geo.PNG){: loading="lazy" }

![Sales over time](https://raw.githubusercontent.com/mr-robot77/Sales-Data-Analysis/main/images/Sales.PNG){: loading="lazy" }

## Method

Time series: moving averages, seasonal decomposition, year-over-year and month-over-month growth, and a forecast from the past pattern.

Maps: choropleth of sales by region, spatial clusters, distance against sales, and market share by region. Charts were bars, lines, and heatmaps of correlation.

Other checks: distributions, outlier transactions, and hypothesis tests on the sales assumptions.

## Recommendations from the analysis

The write-up argued for stocking to the seasonal pattern and to the top products, timing promotions to the peak periods, and spending more attention on the regions that already sell and on the thin ones that still look open. It also argued for more of the high-margin categories, dropping products that do not sell, and regional variants. The revenue figure attached to those changes was 15 to 20%, with lower stock held on the slow items.
