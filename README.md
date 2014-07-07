InvestorSearch
========
Collaboration with DreamIt Ventures -- This is a tool to find investors likely to be interested in your startup.

Overview
----
Search for investors who have invested in other companies and industries similar to yours.  Investors are sorted by number of matched search criteria, so that the best matches appear at the top. Create an account to save investors to your list. Do multiple searches and add and remove as many investors as you'd like to your list. Export them to a .csv file to keep track of outreach & share the list with your colleagues.

Main Technologies Used
----
* Bookshelf
* MySQL
* Node.js
* Angular
* Express
* Bluebird
* AngelList API

Screenshots
----
![InvestorSearch Screenshot](https://imagizer.imageshack.us/v2/955x684q50/829/e1a7.png)

Challenges
----
* Using the AngelList API. When an API call returned a set of results that was greater than 50, the results were paginated. We created a recursive function that wrapped the results for each individual page in a promise (using the Bluebird library). After the promise resolved, we would loop through the next page, until we reached the final page.


Future improvements
----
* Adding the ability for a single user to create multiple lists.
* Adding the ability for a user to e-mail out their list.


