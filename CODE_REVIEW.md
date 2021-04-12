#===== Code review  ======#

- There was no proper folder structure.
- Need to have proper error handling try, catch for all the api calls
- we can make use of async pipes in HTML for accessing the subscribed data in some places for the code which dont need data manipulation after retrieving data from BE 
  and display the data from store selectors instead to use subcribe for every selectors.
- where ever subsribers are used we need to check for subscribed observables which should be unsubscribed in ngDestroy hook in order to prevent the memory leak issue.
- In /libs/api/books/src/lib/books.service.ts file, while making search call in the response handling need to maintain null, undefined, empty 
  check before mapping the response object.
- Need to fix test cases in existing code.
- reducer is not present for failedAddToReadingList and failedRemoveFromReadingList actions, we Need to add it.

#===== Issues from automated scan ======#
- button styles can be changed and maintained common button for all the CTA's
- Background and foreground colours do not have a sufficient contrast ratio.
- constants can be used in a seperate file to easily add/remove the static content on the webpage(can be helpfull for i18n).

#===== Manually found issue ======#
- Images need to have 'alt' attribute.
- Buttons and html elements should have aria-label where ever required.
- tabs navigation is not happening on "Javascript" searchterm in the book search component.

#====== more features can be added =====#
- user actions can be captured using app dynamics (user transactions can be captured and if any problem occured in request)
