'use strict';

angular.module('investorSearchApp')
  .factory('Search', function ($http) {

    var Search = {
      // hit route that queries MySQL here:
      getInvestors: function(constraints){
        var getInvestorsPromise = $http.post('/api/search', constraints).success(function(investors, status) {
          return investors;
        });
        return getInvestorsPromise;
      },
      fakeInvestors: function(){
        return [{
            "name": "Luben Pampoulov",
            "id": 92683,
            "bio": "Co-founder, Partner at GSV Asset Management",
            "angellist_url": "https://angel.co/luben-pampoulov",
            "image": "https://s3.amazonaws.com/photos.angel.co/users/92683-medium_jpg?1328170738",
            "linkedin_url": "http://www.linkedin.com/in/lubenpampoulov",
            "locations": [
                {
                    "id": 13256,
                    "tag_type": "LocationTag",
                    "name": "woodside, ca",
                    "display_name": "Woodside",
                    "angellist_url": "https://angel.co/woodside-ca-2"
                }
            ],
            "roles": [
                {
                    "id": 14721,
                    "tag_type": "RoleTag",
                    "name": "institutional investor",
                    "display_name": "Institutional Investor",
                    "angellist_url": "https://angel.co/institutional-investor-1"
                }
            ],
            "skills": [],
            "investor": true
        },
        {
            "name": "Kevin Hale",
            "id": 168478,
            "bio": "Partner at @y-combinator. Founded @wufoo (Acquired by @surveymonkey). Investor in @crowdtilt, @zapier, @strikingly and @lob ",
            "angellist_url": "https://angel.co/kevinhale",
            "image": "https://s3.amazonaws.com/photos.angel.co/users/168478-medium_jpg?1346439329",
            "linkedin_url": "http://www.linkedin.com/in/unfoldedorigami",
            "locations": [
                {
                    "id": 1692,
                    "tag_type": "LocationTag",
                    "name": "san francisco",
                    "display_name": "San Francisco",
                    "angellist_url": "https://angel.co/san-francisco"
                },
                {
                    "id": 1681,
                    "tag_type": "LocationTag",
                    "name": "silicon valley",
                    "display_name": "Silicon Valley",
                    "angellist_url": "https://angel.co/silicon-valley"
                }
            ],
            "roles": [
                {
                    "id": 9300,
                    "tag_type": "RoleTag",
                    "name": "angels",
                    "display_name": "Angel",
                    "angellist_url": "https://angel.co/angels"
                }
            ]
          }
        ]
      }
    }
    return Search;

  });
