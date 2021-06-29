import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?api-key=Li9ecVh4dA75ZEpL4seeC1LnVW89ncZ3'
});
