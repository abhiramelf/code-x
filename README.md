# CodeX
CodeX helps explain in plain English whatever code snippet that you throw at it. It's powered by two of the latest OpenAI models that helps in conversion and generation of code in multiple languages

## Implementation
- Clone the repository
- Run `npm install`
- You need to get OpenAI key from [here](https://platform.openai.com/account/api-keys)
- Create a `.env` file in root and add the key to `OPEN_AI_KEY` variable
- Execute `npm run dev`

## Example Requests
The endpoint to follow will be `localhost:{port}/api/v1/code/explain`
### Using OpenAI model `code-davinci-002`
This model is more accurate, but is slower and busy. You might need to hit the API a couple of times before you can get the output. It's popular of the 2 and hence receives more requests
#### Request
```
{
    "model": "code-davinci-002",
    "prompt": "function _mint(address to, uint256 tokenId) internal virtual { require(to != address(0), \"ERC721: mint to the zero address\"); require(!_exists(tokenId), \"ERC721: token already minted\"); _beforeTokenTransfer(address(0), to, tokenId); _balances[to] += 1; _owners[tokenId] = to; emit Transfer(address(0), to, tokenId); }",
    "max_tokens": 200,
    "stop": "\n\n"
}
```
- Changing the value of `max_tokens` will change the amount of characters the model returns in the response
- `stop` defines the characters the model will look out for terminating the response generation. For this model `"\n\n"` is ideal
#### Response
```
{
    "success": true,
    "data": " It checks that the address to which the token is being minted is not the zero address.\n2. It checks that the tokenId being minted does not already exist.\n3. It calls the _beforeTokenTransfer function.\n4. It increments the balance of the address to which the token is being minted.\n5. It sets the owner of the tokenId to the address to which the token is being minted.\n6. It emits the Transfer event."
}
```
### Using OpenAI model `code-cushman-001`
Almost as capable as davinci and is much faster. Used majorly in realtime applications where low latency is prefered
#### Request
```
{
    "model": "code-cushman-001",
    "prompt": "function _mint(address to, uint256 tokenId) internal virtual { require(to != address(0), \"ERC721: mint to the zero address\"); require(!_exists(tokenId), \"ERC721: token already minted\"); _beforeTokenTransfer(address(0), to, tokenId); _balances[to] += 1; _owners[tokenId] = to; emit Transfer(address(0), to, tokenId);}",
    "max_tokens": 200,
    "stop": "\n "
}
```
- Here you can see that `"\n "` is the prefered `stop` character
#### Response
```
{
    "success": true,
    "data": " Check if the token is already minted.\n2. Check if the sender is the zero address.\n3. Check if the receiver is the zero address.\n4. Check if the token is already owned.\n5. Check if the sender has enough balance.\n6. Check if the receiver has enough balance.\n7. Check if the sender has enough allowance.\n8. Check if the receiver has enough allowance.\n9. Emit the Transfer event.\n10. Update the balances of the sender and receiver.\n11. Update the owners of the token."
}
```

### For more information regarding OpenAI functionalities, read their doc [here](https://platform.openai.com/docs/introduction)
