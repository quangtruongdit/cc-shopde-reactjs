React is a popular frontend library that developers use to create applications. And you will need to integrate APIs into your React application at some point if you want to build production-ready apps. Every developer who wants to build modern, robust web applications with React must understand how to consume APIs to fetch data into their React applicationshttps://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/.

There are different ways to consume REST APIs in React, but in this guide, I will show you how to use React Toolkit, a collection of packages that help you write better Redux code. React Toolkit simplifies common tasks such as creating reducers and actions, making API calls, and managing loading and error stateshttps://reactresources.com/topics/rest-apis.

To use React Toolkit to consume REST APIs, you will need to install it and its dependencies:

npm install @reduxjs/toolkit react-redux

Then, you will need to create a Redux store and a slice for your API data. A slice is a way of organizing your Redux state and logic into a single file. You can use the createSlice function from React Toolkit to create a slice with an initial state, some reducers, and some extra reducers that can handle API actionshttps://dev.to/onlyoneerin/a-beginners-guide-to-using-fetch-and-axios-to-consume-rest-apis-in-react-3dib.

For example, suppose you want to consume an API that provides posts data. You can create a slice like this:

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async action that fetches posts data from the API
export const fetchPosts = createAsyncThunk(
'posts/fetchPosts',
async () => {
const response = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await response.json();
return data;
}
);

// Define a slice for posts data
export const postsSlice = createSlice({
name: 'posts',
initialState: {
items: [],
status: 'idle', // loading state
error: null // error state
},
reducers: {
// You can add some reducers for manipulating posts data here
},
extraReducers: {
// Handle the pending state of the fetchPosts action
[fetchPosts.pending]: (state, action) => {
state.status = 'loading';
},
// Handle the fulfilled state of the fetchPosts action
[fetchPosts.fulfilled]: (state, action) => {
state.status = 'succeeded';
state.items = action.payload;
},
// Handle the rejected state of the fetchPosts action
[fetchPosts.rejected]: (state, action) => {
state.status = 'failed';
state.error = action.error.message;
}
}
});

// Export the slice reducer and selectors
export const postsReducer = postsSlice.reducer;
export const selectAllPosts = state => state.posts.items;
export const selectPostsStatus = state => state.posts.status;
export const selectPostsError = state => state.posts.error;
```

Next, you will need to configure your Redux store and use the configureStore function from React Toolkit. This function will automatically set up some middleware and enhancers for you, such as Redux Thunk for handling async actions and Redux DevTools for debugginghttps://medium.com/@nutanbhogendrasharma/step-by-step-consume-rest-api-in-react-application-48388f6c4d9c.

You can configure your store like this:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './postsSlice';

// Create a Redux store with the posts reducer
export const store = configureStore({
reducer: {
posts: postsReducer
}
});
```

Finally, you will need to use the Provider component from React Redux to wrap your app and pass the store as a prop. This will allow your app to access the Redux store and dispatch actionshttps://jsonplaceholder.typicode.com/posts?_limit=10.

You can use the Provider component like this:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

// Wrap your app with the Provider component and pass the store as a prop
ReactDOM.render(
<Provider store={store}>
<App />
</Provider>,
document.getElementById('root')
);
```

Now, you can use the useDispatch and useSelector hooks from React Redux to dispatch actions and select data from the store in your components. You can also use the useAppDispatch and useAppSelector hooks that are generated by React Toolkit's TypeScript templatehttps://jsonplaceholder.typicode.com/posts/.

For example, you can create a component that displays posts data like this:

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectAllPosts, selectPostsStatus, selectPostsError } from './postsSlice';

const PostsList = () => {
// Get the dispatch function from Redux
const dispatch = useDispatch();

// Get the posts data, status, and error from the store
const posts = useSelector(selectAllPosts);
const status = useSelector(selectPostsStatus);
const error = useSelector(selectPostsError);

// Fetch posts data when the component mounts
useEffect(() => {
dispatch(fetchPosts());
}, [dispatch]);

// Render the component based on the status and error
if (status === 'loading') {
return <div>Loading...</div>;
} else if (status === 'succeeded') {
return (
<div>
<h1>Posts</h1>
<ul>
{posts.map(post => (
<li key={post.id}>
<h2>{post.title}</h2>
<p>{post.body}</p>
</li>
))}
</ul>
</div>
);
} else if (status === 'failed') {
return <div>Error: {error}</div>;
} else {
return null;
}
};

export default PostsList;
```

This is how you can use React Toolkit to consume REST APIs in React. You can learn more about React Toolkit and its features from its official documentationhttps://jsonplaceholder.typicode.com/posts. You can also check out some web resources that explain how to use React Toolkit with different APIshttps://jsonplaceholder.typicode.com/users  . I hope this guide was helpful and informative for you. blush