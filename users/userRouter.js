const express = require('express');

const router = express.Router();

const User = require('./userDb.js');

const Post = require('../posts/postDb.js');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  User.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error creating user' });
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  Post.insert({ ...req.body, user_id: req.params.id })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error creating Post" });
    });
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
    .then(userList => {
      res.status(200).json(userList);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error the user list could not be retrieved" });
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
      res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  User.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Error retrieving posts." });
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "User has been deleted" })
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Error deleting user" });
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const updated = req.body;
  User.update(req.params.id, updated)
    .then(() => {
      getById(req.params.id)
        .then(user => {
          res.status(200).json(user)
        })
        .catch(() => {
          res.status(500).json({ errorMessage: "Error retrieving updated user fille"})
        })
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Error updating user" })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  User.getById(req.params.id)
    .then(user => {
      if(user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id " })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "An error has occured" })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  const body = req.body;
  if(body.legth === 0){
    res.status(400).json( { message: "Missing user data" })
  } else if(!body.name) {
    res.status(400).json( { message: "missing required name field" } );
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  if(body.length === 0) {
    res.status(400).json( { message: "Missing post data" })
  } else if(body.text === undefined) {
    res.status(400).json( { message: "missing required text field" } );
  } else {
    next();
  }
}

module.exports = router;
