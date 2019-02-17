## Request Format

The request body should contain a controller name, method name and input object.
Example:

```json
{
  "jsonrpc": "2.0",
  "method": "basicHello",
  "params": {
    "name": "Janet"
  }
}
```

The router will determine which controller and method will service your request
based on the given names in the payload.

## Tests

Run `npm test` from the root folder.
