LoadJS
======
###A tiny javascript loader
- - - - - - -

Getting tired to add javascript to your static html project? LoadJS is for you.

LoadJS is a lightweight javascript module loader. This provides an easiest way to load javascript to your HTML.

####What loadjs does for you?
- Removes the headache to load javascript to each your static HTML page.
- Appends necessary javascript files in specified order to DOM `<body>`.
- Takes multiple alternative CDN endpoints along with local fallback.
- No external dependency (Uses jQuery ajax which is included).
- Supports current major browsers versions.

####How to use?
- Create a javascript file. 
- Select a basepath for your javascript modules. And assign it to `base_dir` variable

Example:

```javascript
var base_dir = 'js';
```

- List all the modules required relative to basepath as an array and assign it to `loadModules` variable.
 
Example: 

```javascript
loadModules = [
    ['//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js', 'lib/jquery-2.1.1.min.js'],
    ['//maxcdn.bootstrapcdn.com/bootstrap/3.1.1/js/bootrap.min.js', 'lib/bootstrap.min.js'],
    'controllers/main-controller.js',
    'services/user.js'
];
```
(Note: Don’t change the variable name anywhere).

- Include this file to your HTML followed by LoadJS.
- Enjoy!!
