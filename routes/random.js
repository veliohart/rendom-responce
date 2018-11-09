const express = require('express');
const router = express.Router();
const chance = new require('chance')();

function randomizer(req, res, next) {
  const statuses = [101, 200, 201, 404, 403, 410, 411, 415,
    500, 501, 502, 503, 504, 505, 506];
  const count = chance.integer({
    min: 5,
    max: 80
  });
  const functions = [
    'paragraph',
    'sentence',
    'syllable',
    'word',
    'floating',
    'integer',
    'birthday',
    'gender',
    'name',
    'last',
    'android_id',
    'apple_token',
    'avatar',
    'color',
    'company',
    'domain',
    'email',
    'ip',
    'profession',
    'ipv6',
    'address',
    'city',
    'state',
    'street',
    'zip'
  ];
  const status = chance.pickone(statuses);
  const data = new Array(count)
    .fill(null)
    .map(item => {
      const rand = chance.pickone(functions);
      item = {};
      
      new Array(Math.floor(count/5)).fill(null)
        .forEach(nothing => {
          const key = chance.pickone(functions);
          item[key] = chance[key]();
        });

      return item;
    });

  res.status(status);

  res.send({
    count,
    data
  });
};

function checkParams(req, res, next) {
  console.log('params', req.params, req.headers.authorization);
  if (req.params.user !== req.headers.authorization) {
    res.status(400);
    res.send({
      error: 'Поломаний запит =)',
      message: 'Бракує параметрів або хедерів =)'
    });
    return;
  }

  next();
}

/* GET random listing. */
router.get('/:user', checkParams, randomizer);
router.post('/:user', checkParams, randomizer);
router.put('/:user', checkParams, randomizer);
router.delete('/:user', checkParams, randomizer);
router.patch('/:user', checkParams, randomizer);
router.copy('/:user', checkParams, randomizer);
router.head('/:user', checkParams, randomizer);
router.options('/:user', checkParams, randomizer);
router.link('/:user', checkParams, randomizer);
router.unlink('/:user', checkParams, randomizer);
router.lock('/:user', checkParams, randomizer);
router.unlock('/:user', checkParams, randomizer);
router.propfind('/:user', checkParams, randomizer);
router.proppatch('/:user', checkParams, randomizer);

module.exports = router;
