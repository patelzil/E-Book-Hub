# Docker Guide

## Link to the repo
[patelzp/ebookhub](https://hub.docker.com/r/patelzp/ebookhub/tags) This is not necessary for the steps below.

## Docker Login
if you already have docker setup, type ```docker login``` in the terminal **or** otherwise visit [Docker Login Guide](https://docs.docker.com/engine/reference/commandline/login/)

## docker pull:client
type ```docker pull patelzp/ebookhub:client``` in the terminal and wait for it to complete the download

## docker pull:server
type ```docker pull patelzp/ebookhub:server``` in the terminal and wait for it to complete the download

In the same instance of terminal type:
==================================
## docker run: server 
type ```docker run -p 3005:3005 -p 5000:5000 patelzp/ebookhub:server``` in the terminal and wait for the server to completely run

In *another* instance of terminal type:
==================================
## docker run: client
type ```docker run -p 3000:3000 patelzp/ebookhub:client``` in the terminal and wait for the server to completely run

- click on this **[URL](http://localhost:3000/)** to start the web application **or** type http://localhost:3000/ in your browser
