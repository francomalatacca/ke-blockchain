blockchain
=====

node.js blockchain module used by ke-coin


installation
-----

`npm install ke-blockchain`


methods
-----

- **constructor**(): creates a new block **open**
- **addNewBlock**(data)
- **replaceBlockchain**(newBlockchain)

notes
-----
data contains the transactions in form of javascript array.
Valid transactions are objects in the following format:
```javascript
[{
  'from': 'abc0123...',
  'to': 'abc0123...',
  'amount': 10,
  'timestamp': 1641199862485197
}]
```

license
---

ISC