# Tanstack Query - Open Space Frontend

## Overview

### Description

This is the frontend code for the Tanstack Query Open Space.
During this Open Space, we will explore the Tanstack Query library and its features.
Such as:

- Simplified data fetching
- On error retries
- Caching
- DevTools
- Pre-fetching
- Lazy Queries
- Mutations
- Cache invalidation
- Optimistic updates
- Polling
- Pagination
- Infinite queries

### Tech Stack

- Vite
- React
- Tanstack Query + Axios
- Tailwind CSS
- Headless UI

## Setup instructions

## Prerequisites

- Node 22.14.0 (Recommend to use a tool version manager such as [mise](https://github.com/antfu/mise) or [asdf](https://asdf-vm.com/))

### Environment Variables

Create a `.env.local` file in the root directory of the project with the following content:

```env
# If you plan to follow the sessions live, the real value is located in our Slack channel.
# If you are not following the sessions live, you can download the Backend, run it locally, and use the port 3000.
VITE_API_URL = "http://127.0.0.1:3000"
```

### Run the Project

```bash
npm install
npm run dev
```
