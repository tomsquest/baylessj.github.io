---
layout: post
title: Trial-and-error MVP Deployment
---

Recently I started creating a web app for my side-project, [auToDo](https://autodo.app). My first step for this endeavor was migrating away from [Firebase](). Firebase was a fine service to start with, but the removal of their cloud functions on the free tier and the NoSQL database were a good signal for me to move on. I opted to go with [Django]() and [Postgres]() on the backend based on my familiarity with Python and the ubiquity of the two tools. After that move came the addition of a [React]() frontend, then an [ElasticSearch]() node, then [Gatsby]() to replace the landing page and blog, and so on. I'll still maintain that I wasn't intending to create much more than a simple MVP for the web app, but nonetheless I ended up with a mess of services to deploy. Here's an overview of my adventures in teaching myself how to deploy that mess.

## Docker 

## Nginx and LetsEncrypt

## Continuous Deployment
