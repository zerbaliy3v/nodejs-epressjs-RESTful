const express = require('express');
const path = require('path');
const app = express();
// npm install method-override
const methodOverride = require('method-override')

//uuid npm i uuid
const { v4: uuidv4 } = require('uuid');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, '/views'));
app.set('view engine','ejs');

// start app
let comments = [
    {
        id:uuidv4(),
        username:'Todd',
        comment :'lol that is so funny!'
    },
    {
        id:uuidv4(),
        username:'Skyler',
        comment :'I like to go birdwatching with my dog'
    },
    {
        id:uuidv4(),
        username:'Sk3ro00n',
        comment :'Plz delete your accaunt, Todd'
    },
    {
        id:uuidv4(),
        username:'w00f404',
        comment :'I am a hacker!'
    }
]

app.get('/comments', (req,res) => {
    // res.send(JSON.stringify(comments))
    res.render('comments/index',{com:comments})
})

app.get('/comments/new', (req,res) => {
    res.render('comments/new')
})

app.post('/comments', (req,res) => {
    const {username, comment} = req.body
    if(username && comment){
        comments.push({username,comment,id: uuidv4()})
        res.redirect('comments')
    }
    else{
        res.send("USERNAME OR COMMENT EMPTY!")
    }
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit',(req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit',{ comment })
})

app.patch('/comments/:id',(req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    const newComment = req.body.comment;
    comment.comment = newComment;
    res.redirect('/comments')
})

app.delete('/comments/:id',(req, res) => {
    const { id } = req.params;
    // const comment = comments.find(c => c.id === id);
    // const index = comments.indexOf(comment)
    // comments.splice(index, 1)
    comments =comments.filter(c => c.id !== id);  
    res.redirect(302,'/comments')
})



// end app

app.listen(80,() => {
    console.log("Listeng port: 80");
})
