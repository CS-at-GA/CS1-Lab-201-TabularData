# Lab Overview
This lab deals with bringing actual data into our programs, then processing and displaying that data. In terms of actual new content, there isn't much that is new, other than the distinctive way in which we will bring data in. What is new is how we will be encapsulating much of what we have learned so far and dealing with the uncertain nature of of data. 

The data set I am working with is a processed version of the data available from the [Mapping Inequality](https://dsl.richmond.edu/panorama/redlining/#loc=5/39.1/-94.58) project from the University of Richmond. The project merges 2020 census data with the "redlining" maps produced by the Home Owners' Loan Corporation (HOLC) prior to World War 2 which "bucketed" (assigned grades to) neighborhoods in 138 metropolitan areas.
|Grade|Description|
|-----|-----------|
|A|Best|
|B|Desirable|
|C|Declining|
|D|Hazardous|

These maps became the foundation for housing descrimination in post-war America in many ways, the two most prominent being that a) certain groups of people (largely people of color) could not get loans for housing in categories A or B regardless of their actual ability to pay, and b) home values in categories C and D, where a disproportionate number of people of color lived, were interpreted to be much lower. These two factors combined to largely explain the current gap of generational wealth in the populations. 

The website [538](https://fivethirtyeight.com/) used this data for an article called [_The Lasting Legacy of Redlining_](https://projects.fivethirtyeight.com/redlining/) in which they explore how, despite the fact that the practice of redlining has been illegal for over fifty years, many metropolitan areas are still divided racially along the same lines drawn by the HOLC prior to World War 2. 

The data produced[^1] by 538 is what we call _tabular_ data, which is to say that it can be thought of as being in a table (or a spreadsheet like Excel or Google Sheets). A row is an entry in the table and each column represents a different characteristic of that entry. The data looks like this.

|Metro Area|HOLC Grade|...5 columns of population data...|... 5 columns of corrosponding percentage data...|...other data...|
|----|----|----|----|----|

So, each metro area has four entries, one for each of the grades, and each entry contains the population distribution for that metro area and grade. 

This data is stored in what is called a `csv` (Comma Separated Values) file. This is a common format for tabular data because it can be easily read and created by a computer. Each line in the file is a row in the table, including an optional header row. On each of the rows, data is seperated by commas, effectively dividing them into columns:

```csv
"Philadelphia...",C,"104259","179683","79519","16407","15719","395587",...
```

What we will eventually build in this lab are aggregate pie charts for each of the grades across all population categories, along with a reference pie chart representing the population distribution. 

![Pie charts for each HOLC Grade with population representation!](./tutorial/assets/lab201-redlining-final.png "HOLC Grade Pie Charts")

<!--Footnotes-->
[^1]: Produced really isn't the right word, but they've consolidated a large amount of data and put it into a useful format. 
