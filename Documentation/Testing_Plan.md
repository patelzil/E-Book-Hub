# TEST PLAN FOR EBOOKHUB

***Note that we are going to refine our testing plan as the project development goes. The change log is as follow:*** 

*ChangeLog* 

|**Version**  |**Change Date** |**By** |**Description** |
| - | - | - | - |
|`V1` |Feb 22, 2022 |Rutukumar Barvaliya |<p>Reviewers:  </p><p>Zeelkumar Khokhariya Parth Patel </p><p>Tested user Controller(User profile backend) </p>|
|`V2.1 V2.2` |Feb 25, 2022 March 2, 2022 |Rutukumar Barvaliya |<p>Reviewers:  </p><p>Zilkumar Patel </p><p>Zeelkumar Khokhariya Parth Patel </p><p>Tested Front-end Components and Back-end Controllers using CI pipeline </p>|
|` `V3 |March 6, 2022 |Rutukumar Barvaliya |<p>Reviewers:  Zilkumar patel Viki Makadia </p><p>` `Tested Front-end Components </p>|

## 1 Introduction

### 1.1 Scope 

#### Tested Controllers in the backend(Server Side):  
- User Controller 

- Books Controller 

#### Tested Components in the Frontend(Client Side): 
- Login Components 

- Search Book Components 

- SignUp Components 

- Edit Profile(User profile) Components  

### 1.2 Roles and Responsibilities

|**Name** |**Net ID** |**GitHub username** |**Role** |
| - | - | - | - |
|QA Analyst |Patelp24 |Patelp24-git |Maintaining functionality of server and client side operations as per standards |
|Test Manager |Barvalrj |Rutu136 |Testing functionality of server and client side operations |
|Configuration Manager |Patelzp Khokharz |Patelzil Zeelkhokhariya |Systematically manage, organize, and control the changes in the documents, codes, and other entities |
|Developers |Khokharz Patelzp Patelp24 Makadivs |Zeelkhokhariya Patelzil Patelp24-git Viki4325 |Complete Develeopments of features based on user stories |
|Installation Team |Barvalrj Makadivs |Rutu136 Viki4325 |Managing dependencies and installation MERN stack software |

## 2 Test Methodology 

### 2.1 Test Levels

#### User Profile: 

1. Render standard component – Dashbaord 
1. Render standard component – Error page – UserProfile  
1. Render standard component – Edit user profile button – UserProfile  
1. Render standard component – Edit Form – UserProfile Form 
1. Render standard component – Edit Fields – first name 
1. Render standard component – Edit Fields – last name 
1. Render standard component – Edit Fields – email 
1. Render standard component – Edit Fields – username  
1. Render standard component – Password requirnment 
1. Enter new User 
1. Enter new User with out password 
1. Enter new user without username 
1. Enter new user without email 
1. Enter new user without firstname 

#### Total Unit Tests and Time Stamp: 



#### Load and Search Book: 
1. Render standard component 
2. Book Homepage Navbar tests 
3. User can not get the books by searching irrelevent publisher name 
4. Book Homepage Component tests 
5. Get default number of books 
6. User got filtered books with author name 
7. User got filtered books if that author is not exist 
8. User get the books by searching title name 
9. User can not get books by searching irrelevent title name 
10. User get the books by searching title name 
11. User can not get the books by searching irrelevent category 
12. User get the books by searching publisher name 
13. User can not get the books by searching irrelevent publisher name 
14. User get the free books by filtering free 

#### Total Unit Tests and Time Stamp: 



### 2.2 Test Completeness



Here you define the criterias that will deem your testing complete. For instance, a few criteria to check Test Completeness would be - 100% test coverage on server and client side modules of the application - Reset Password, Search book by rating are some of the features that will be fixed in the next release(SPRINT 3). 
## 3 Resource & Environment Needs
### 3.1 Testing Tools
- Requirements Tracking Tool : Jest, SuperTest, react, jest-dom, user-event libraries for testing both modules
- Bug Tracking Tool: Chrome Developer Tools
  
### 3.2 Test Environment


- Any browser that supports Github website  
- Github Actions: Nodejs  

## 4 Terms/Acronyms  

Make a mention of any terms or acronyms used in the project 

|**TERM/ACRONYM** |**DEFINITION** |
| - | - |
|API |Application Program Interface |