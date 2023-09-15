const express = require('express');
const app = express();
const path = require('path'); 
const session = require('express-session');
const { body,validationResult } = require('express-validator');
const port = 3000
let arr = []
let nextId = 100;

app.use(session({
     secret: 'thisiscode',
     resave: false,
     saveUninitialized: true,
   }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','pug');



app.get(`/search`,(req,res)=>{
     res.render('template');
})

app.post('/otherRoute', [
     body('first').notEmpty().trim(),
     body('age').isInt().notEmpty().isLength({ min: 1, max: 3 }),
     body('last').notEmpty().trim()
   ], (req, res) => {
     const errors = validationResult(req);
   
     if (errors.isEmpty()) {
       const firstName = req.body.first;
       const lastName = req.body.last;
       const age = req.body.age;
       const seniorSub = req.body.senior;
       const cityName = req.body.city;
       const id = nextId++;
       const element = { Id: id, First: firstName, Last: lastName, Age: age, Senior: seniorSub, City: cityName };
   
       arr.push(element);
       req.session.arr = arr;
   
       res.redirect('/database');
     } else {
       const stat = true; 
       return res.render('template', { stat });
     }
   });
app.get('/database',(req, res)=>{ 
     const arr = req.session.arr;
     res.render('tempt',{ arr })
})


app.post('/deleteItem/:id', (req, res) => {
     const itemId = req.params.id;
     arr = arr.filter(item => item.Id !== parseInt(itemId));
     req.session.arr = arr;
     console.log(arr);
     res.redirect('/database');
     });


     app.post('/updateItem/:id',[
          body('newFirst').notEmpty().trim(),
          body('newAge').isInt().notEmpty(),
          body('newLast').notEmpty().trim()
     ],(req, res) => {
          const itemId = parseInt(req.params.id);
          const newFirst = req.body.newFirst;
          const newLast = req.body.newLast;
          const newAge = req.body.newAge;
          const newSenior = req.body.newSenior;
          const newCity = req.body.newCity;
        

          const itemIndex = arr.findIndex(item => item.Id === itemId);

            arr[itemIndex].First = newFirst;
            arr[itemIndex].Last = newLast;
            arr[itemIndex].Age = newAge;
            arr[itemIndex].Senior = newSenior;
            arr[itemIndex].City = newCity;
        
            req.session.arr = arr
            res.redirect('/database');

        });

app.listen(port,()=>{
     console.log(`Server is Listening at http://localhost:${port}`);
})   