# What is NodeJS?

Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser. It allows developers to

# How nodeJS differs from vanilaJS

1. Node runs on a server - not in a browser.
2. The console is a terminal window.
3. Global object instead of window object.
4. Has common core modules that we will explore.
5. CommanJS modules intead of ES6 modules.
6. Missing some of JS APIs such as fetch.

# NodeJS naturally uses commonJS module system

CommonJS is a standard for structuring JavaScript code in such a way that it can be used across different JavaScript environments, including Node.js. It provides a way to define modules, which are sets of code that can be reused across different files, as well as a way to import and export those modules.

In Node.js, CommonJS modules are defined using the exports object, which is a property of the global module object. The exports object is used to define the functions, variables, and objects that should be made available to other modules that import the current module.

CommonJS modules have a couple of benefits:

1)they make it easy to share code between different files and modules
2)they make it easier to organize and structure your code
3)they are supported natively by Node.js, so you don't need to include any additional libraries or frameworks to use them.

It's important to note that CommonJS modules are synchronous, which means that the code execution will block until the module is loaded.

# How does commonJS module system works behind the scene?

CommonJS modules work behind the scene by wrapping the contents of a module in a function. When a module is imported, this function is executed and the exports of the module are returned.

When a file is executed in Node.js, the module object is automatically created. The module object has an exports property, which is used to define the functions, variables, and objects that should be made available to other modules that import the current module.

When a module is imported using the require() function, Node.js looks for the specified file in the file system and wraps its contents in a function. This function is then executed, and the exports of the module are returned.

It's important to note that when a module is imported, the function that wraps its contents is executed only once, and the exports of the module are cached. Subsequent imports of the same module will return the cached exports, rather than executing the function again. This is known as caching, and is a performance optimization that helps to improve the performance of Node.js applications.
