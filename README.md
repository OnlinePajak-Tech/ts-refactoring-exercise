#Refactoring kata
##Overview:
This exercise is aimed to practice refactoring using development best practices, e.g. Unit testing, OOP/SOLID principles, and/or Functional Programming Principles.
The code base consists of `Integration` class (`./src/Integration.ts`) and a set of service classes (`./src/services`)
The idea is around handling different types of data integration, specifically file integrations, using SFTP and AWS S3 protocols.
##Goal:
* Refactor `Integration` class to follow best practices.
    * Feel free to add/modify/remove classes, functions, methods etc
    * Consider `services`'s methods and interfaces signatures as fixed (unless you find some terrible design flaw) 
    * `services`'s methods have no real implementation for simplicity, let's pretend they do their job :)
* Implement unit tests for the functionality implemented in Integration class (or corresponding after refactoring code)
    * It's up to developer to define enough level of testing, though he/she needs to be able to defend their position during review.
    * Do not test `services`
