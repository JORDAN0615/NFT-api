const fruitService = require('../../src/services/fruit.service');


function get(req, res, next) {
    try {
        res.json(fruitService.getResult(req.query));
        // let queryResults = fruitService.getResult(req.query);
        // console.log(queryResults);
        // res.status(200).format({
        //     'application/json': function() {
        //         res.send({
        //             result: queryResults});
        //     }
    } catch (err) {
        console.error(`Error while getting fruits`);
        next(err);
    }
}

function create(req, res, next) {
    try {
        fruitService.create(req.body);
        res.send({ result: 'successfully created' });
    } catch (err) {
      console.error('Error while creating fruits');
      next(err);
    }
}

function remove(req, res, next) {
    try {
      fruitService.remove(req.params.deleteFruitId);
      console.dir(req.params.deleteFruitId);
      res.send({result: 'successfully deleted'})
    } catch (err) {
      console.error('Error while deleting fruits');
      next(err);
    }
}


module.exports = {
    get,
    create,
    remove
  };