const express = require('express');
const app = express();
app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 499 },
];

// GET all
app.get('/products', (req, res) => res.json(products));

// GET by id
app.get('/products/:id', (req, res) => {
  const p = products.find(p => p.id === +req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

// POST create
app.post('/products', (req, res) => {
  const p = { id: Date.now(), ...req.body };
  products.push(p);
  res.status(201).json(p);
});

// PUT update
app.put('/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});

// DELETE
app.delete('/products/:id', (req, res) => {
  products = products.filter(p => p.id !== +req.params.id);
  res.status(200).json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('REST API running on port 3000'));
