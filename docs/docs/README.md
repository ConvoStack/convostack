---
title: "Introduction"
sidebar_label: "Introduction"
sidebar_position: 0.1
hide_table_of_contents: true
---

# Introduction

ConvoStack is a plug and play embeddable AI chatbot widget and backend deployment framework for your website. **It is completely free and open source and currently running on this docs website!**

The core technologies are React (frontend), Express.js (backend), Redis (Cache & Pub/Sub), and Langchain (AI agent framework).

## Learn the Basics

Learn about ConvoStack and what sets it apart from other AI chatbot software:

- [Why ConvoStack?](./the-basics)

## Getting Started

Get your AI chatbot up and running in minutes with our quickstart guide:

- [Quickstart Walkthrough](./getting-started)

## Installation

To add the ConvoStack framework to an existing project, run the following command:

```bash
npm install --save convostack
```

## Requirements

If adding ConvoStack to your project, below are the following requirements depending on your usage:

**Node**

- `node`: version >=18

**Frontend Requirements:**

- `react` (version ^17.0.2 or version ^18.0.0): Integration with ConvoStack frontend components

- `react-dom` (version ^17.0.2 or version ^18.0.0): Integration with ConvoStack frontend components

**Backend Requirements:**

- `express`: The ConvoStack backend is based on Express and imports a version for itself. Optionally, you can have the ConvoStack backend attach to your own Express app instance. In that case, any relatively recent version of express should suffice (e.g., above 4.17.1)

- `langchain` (version ^0.0.67) (Optional): Plug and play ConvoStack Agent integration for Langchain-based Agents
