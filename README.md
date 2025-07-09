# Tanstack Query - Open Space Frontend

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

## Setup instructions

### Prerequisites

- Node 22.14.0 (Recommend to use a tool version manager such as [mise](https://github.com/antfu/mise) or [asdf](https://asdf-vm.com/))

### Environment Variables

Create a `.env.local` file in the root directory of the project with the following content:

```env
# If you plan to follow the sessions live, the real value is located in our Slack channel.
# If the Open Space has finished, you can follow the Backend setup instructions below, run it locally, and use the port 3000.
VITE_API_URL = "http://127.0.0.1:3000"
```

### Run the Project

```bash
npm install
npm run dev
```

## Backend Setup (Only if Open Space has finished)

If the Open Space has already finished, you can run the backend locally to test the frontend features.
Otherwise, please go to the Slack channel `#tanstack-query` and look for the API URL in `Bookmarks`.
For more details, refer to the [Tanstack Query Open Space Backend repository](https://github.com/brandonrq506/tanstack-query-os-be-b)
