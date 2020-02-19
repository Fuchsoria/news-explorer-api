# Graduate work news-explorer
Test Link: [https://news-api.fuchsoria.dev](https://news-api.fuchsoria.dev)

### Functional:
| Request | Response |
|--|--|
| GET /users/me | Returns user information (email and name) |
| GET /articles | Returns all saved news by user |
| POST /articles | Saves the news and returns it if successful |
| DELETE /articles/articleId | Deletes the news and returns it if successful |
| POST /signup | Creates a user with data transferred in the body|
| POST /signin | With the correct email and password returns cookies with jwt token|
| Nonexistent address | `{ "message": "The requested resource is not found" }` |

