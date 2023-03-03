# REST

## Request Format

The format of the URL is as follows:

    http://<host>:<port>/

### Path

Collection: /<resource_name>
Item: /<resource_name>/<resource_id
SubCollection: /<resource_name>/<resource_id>/<subresource_name>

Example: User
User collection : `/users`
User resource : `/users/:id`
SubCollection Articles: `/users/:idUser/articles`
Filtre Articles: `/articles?userId=:idUser`

### Http Verbs/Codes

- Get all resources : GET => 200 (OK)
- Get item : GET => 200 (OK) / 404 (Not Found)
- Create resource : POST => 201 (CREATED) / 422 (ENTITY NOT PROCESSABLE) / 400 (BAD REQUEST)
- Edit all item : PUT => 200 (OK) / 422 (ENTITY NOT PROCESSABLE) / 400 (BAD REQUEST) / 404 (NOT FOUND)
- Edit partial item : PATCH => 200 (OK) / 422 (ENTITY NOT PROCESSABLE) / 400 (BAD REQUEST) / 404 (NOT FOUND)
- Delete item : DELETE => 204 (NO CONTENT) / 404 (NOT FOUND)

### Filters

Filters are in the querystring

`/<resource_name>?filterA=foo&filterB=bar`

FilterA and FilterB are resource fields.

#### Sort

`order[<field>]=<dir>`

#### Pagination

`page=<id_page>&items_per_page=<nb_items>`

LIMIT = item_per_page
OFFSET = (page - 1) * item_per_page