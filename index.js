const { response } = require('express');
const express = require('express');
const morgan = require('morgan')
const app = express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
morgan.token('tokencillo', function (req, res) { return req.headers['content-tokencillo'] })

morgan.token('tokencillo');

const personas = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5623523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }

]

// ROUTES

// ejercicio 1 
app.get('/api/persons', (req, res) => {
    res.json(personas);
});

// ejercicio 2
app.get('/info', (req, res) => {
    res.send("<strong>Phonebook has info for " + personas.length +  " people " +"<br><br>" +new Date() +"</strong>");
});

// ejercicio 3
app.get('/api/persons/:id', (req, res) => {
    const idPerson  = Number(req.params.id);
    const selectedPerson = personas.find(item => item.id === idPerson);

    if(selectedPerson){
        res.json(selectedPerson);
    }else {
        resp.status(404).end();
    }
    

});

// ejercicio 4
app.delete("/api/persons/delete/:id", (req, res) =>{ 
    const  { id } = req.params;
    const resultPersons = personas.filter(item => item.id !== Number(id))
    res.send(resultPersons);
   });


// ejercicio 5
/*app.post("/api/persons/newPerson/:name", (req, resp) => {
const newPerson = req.body.name;
personas.push({
 id: Math.floor(Math.random() * 100),
 name: newPerson
 }); 
    
    res.redirect("/api/persons");
});
*/

app.post("/api/persons/", (req, resp) =>{
    const  newPerson  = req.body
    const resultPersons = personas.concat(newPerson)
    personas.push({
    id:personas.length+1
    })

    const newEnter = personas.some(item => item.name === newPerson.name)
    if(newEnter){
       
        resp.status(404).json("Ese nombre ya está registrado, ingrese otro nombre")
    
    } else if(newPerson.number === undefined){
        
        resp.status(404).json("Ingresa un número")

    } else {
    
        const newPersons = personas.concat(newPerson)
        resp.json(newPersons)

    }
})



// server start
app.listen(process.env.PORT || 3001);




