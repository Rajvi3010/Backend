const express = require('express');
const app = express();
app.use(express.json());

let items = [];

app.get('/items', (req, res) => {
    console.log("Fetching items...");
    res.status(200).json(items);
});

app.post('/item', (req, res) => {
    if (!req.body.item) {
        return res.status(400).send("Item is required!");
    }
    console.log("Adding:", req.body.item);
    items.push(req.body.item);
    res.status(201).send("Item added!");
});

app.put('/item/:id', (req, res) => {
    if (!items[req.params.id]) {
        return res.status(404).send("Item not found!");
    }
    if (!req.body.item) {
        return res.status(400).send("Updated item is required!");
    }
    console.log("Updating ID:", req.params.id);
    items[req.params.id] = req.body.item;
    res.status(200).send("Item updated!");
});

app.delete('/item/:id', (req, res) => {
    if (!items[req.params.id]) {
        return res.status(404).send("Item not found!");
    }
    console.log("Removing ID:", req.params.id);
    items.splice(req.params.id, 1);
    res.status(200).send("Item removed!");
});

app.listen(3000, () => {
    console.log(" Server running on port 3000");
});
