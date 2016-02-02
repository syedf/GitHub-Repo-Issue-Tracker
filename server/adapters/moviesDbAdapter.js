/**
 * Created by syedf on 1/25/2016.
 */
exports.getMovies =  function (req, res, next) {
    var perPage = 12
        , page = req.query.page > 0 ? req.query.page : 0;
    
    req.mongodb.collection('movieDetails')
        .find({'poster':{'$exists': true, '$ne': null},'imdb.id':{'$exists':true, '$ne': null}})
        .project({_id:0,poster:1,title:1,imdb:1,seen:1,year:1})
        .limit(perPage)
        .skip(perPage * page)
        .sort({'imdb.rating': -1})
        .toArray(function (err, movies) {
            if(err){
                next(err)
            }
            else{
                res.status(200).json({movies:movies,pageNum:page});
            }
        });
    
};

exports.markAsSeen = function (req, res, next) {
    req.mongodb.collection('movieDetails')
        .update
        ({'imdb.id':req.query.id},
        {'$set':{'seen': true}},
        function (err, ack) {
            if(err){
                next(err);
            }
            else{
                res.status(200).json(ack);
            }
        })
};
exports.removeFromWatchedList = function (req, res, next) {
  req.mongodb.collection('movieDetails')
      .update(
      {'imdb.id': req.query.id},
      {'$set':{'seen':false}},
      function (err, ack) {
          if(err){
              next(err);
          }
          if(ack){
              res.status(200).json(ack);
          }
      }
  )
};

exports.watchedMovies = function (req, res, next) {
    req.mongodb.collection('movieDetails')
        .find({'seen': true})
        .project({_id:0,poster:1,title:1,imdb:1,seen:1,year:1})
        .sort({'imdb.rating': -1})
        .toArray(function (err, movies) {
            if(err)
                next(err);
            else{
                res.status(200).json(movies);
            }
        });
};
exports.searchMovies = function (req, res, next) {
    var perPage = 12
        , page = req.query.page > 0 ? req.query.page : 0;
    var query = {'title':{'$regex':req.query.title, '$options':'i'},'poster':{'$exists': true, '$ne': null},'imdb.id':{'$exists':true, '$ne': null}};
    req.mongodb.collection('movieDetails')
        .find(query)
        .project({_id:0,poster:1,title:1,imdb:1,seen:1,year:1})
        .limit(perPage)
        .skip(perPage * page)
        .sort({'imdb.rating': -1})
        .toArray(function (err,movies) {
            if(err)
                next(err);
            else if(!movies){
                res.status(400).json(movies);
            }
            else{
                res.status(200).json({
                    movies: movies,
                    title: req.query.title,
                    page: page
                });
            }
        })
};