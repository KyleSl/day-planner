## Day planner
# Requirements
The user is able to see their events that are planned for the day. There is a section for each hour of the work day and the user is able to enter text into that box and save it so that they are able to view it when the page is opened again.
The user is also able to see the current date and time at the top of the screen.

# Functionality
The page uses local storage to save the entered user events. This allows the page to pull from it when the page is first loaded. When a save button is clicked, the text in that field and the hour number of the box are saved into local storage. It's worth noting that even if the box is empty, the text is saved. This doesn't break anything though as the user is able to override that by entering and saving text afterwards. There is also a clear button at the top of the page that clears the local storage and the text boxes when pressed.

# Conclusion
This page was very fun to create. The css was already done for me so all I had to do was get clever in the JS and use jQuery methods like siblings(), parent(), and children(). It was satisfying to create because this kind of website has an actual, possible use in my life, although I doubt I will ever use it.