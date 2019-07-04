---
layout: default
title: Release Guide
parent: Development Guides
nav_order: 3
---

# :tada: Release Guide

## **How to release**

The Phonebook is automatically released. The steps below are executed each time you use the following command.

```bash
npm run release
```

This runs the [Semantic Release](https://github.com/semantic-release/semantic-release) Plugin, which does:

1. Analyzes the Commits since last release
2. Generate the Version Number
3. Generates the Release Notes
4. Edits the source Code to include the version number and last commit
5. Builds the NGINX Docker Image with the latest source Code
6. Tags the version in Git
