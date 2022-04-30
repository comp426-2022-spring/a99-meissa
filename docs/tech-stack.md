# Tech Stack

UNCFoodWatch is a NEXT.JS APP that uses:

1. firebase: 8.10.1
2. next: 12.1.5
3. react: 18.0.0
4. react-dom: 18.0.0
5. react-firebase-hooks: 5.0.3
6. react-quill: 1.3.5
7. reactstrap: 9.0.2
8. sass: 1.50.1

## BackEnd
Our app uses the Next.js backend framework. The backend uses firebase to hold users and case information. Server routes are handled in ```ProtectedRoute.js``` and ``` AuthUserContext.jss ```. As in all Next.js apps, our app holds pages under the ``` pages ``` directory. Routes are protected in ``` header_private.js ``` and ``` header+public.js ```. 

## API Endpoints 
Code for API Endpoints are in ``` ProtectedRoute.js ``` and ``` clientApp.js ```

## FrontEnd
Our app uses the Next.js frontend framework. The front end can be found in the ``` pages ``` directory. HTML is returned in each ``` page ``` and CSS can be found under the ``` styles ``` directory. 





